"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";

const MTRF64Driver = require('../')

const MTRF64Command = require('../MTRF64Command');

describe("MTRF64 Elementary test suite",() => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Driver.Controller(port);
    });
    it("controller have all properties", () => {
        controller.should.have.property("_adapter");
        controller.should.have.property("_lastReceivedCommand");
    })
});

describe("MTRF64Controller register for RemoteControlNooliteDevice",() => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Driver.Controller(port);
    });
    it("Register for RemoteControlNooliteDevice should be ok",() => {
        const device = new MTRF64Driver.AbstractRemoteControl(controller,5);
        const actual  = controller.register(device);
        actual.should.true;
    });
    it("Register for RelayNooliteDevice not allow",() => {
        const device = new MTRF64Driver.Relay(controller,5);
        expect(() => { controller.register(device)}).to.throw(Error);
    });
    it("Register method should be have allow type",() => {
        expect(()=> {controller.register("bug");}).to.throw(Error);
    })
    it("Register should be have parameter",() => {
        expect(() => {controller.register();}).to.throw(Error);
    })
});

describe("MTRF64Controller receive answer for RelayNooliteDevice test suite",() => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Driver.Controller(port);
    });
    it("Send command shold be receive answer", async () => {
        var device  = new MTRF64Driver.NooliteDevice(controller,5,
            MTRF64Driver.NooliteDevice.Mode.NooliteF);
        var cmd = new MTRF64Driver.Command();
        cmd.ch = 5;
        cmd.mode = 1;
        cmd.ctr  = 3;
        var actualCommand = 
        await(() => { 
            return new Promise((resolve) => {
                device.onCommand = (command) => {
                    resolve(command);
                };
                controller.send(device,cmd);
                port.on('open',()=> {
                       port.binding.emitData(Buffer.from([173,1,0,2,5,15,0,0,0,0,0,0,0,0,0,196,174]));
                });
            });
        })();
     
        const expectedCommand = {
                        _startBit: 173,
                        _mode: 1,
                        _ctr: 0,
                        _togl: 2,
                        _ch: 5,
                        _cmd: 15,
                        _fmt: 0,
                        _d: [0,0,0,0],
                        _id: [0,0,0,0],
                        _crc: 196,
                        _stopBit: 174
                        };
        expect(actualCommand).deep.equal(expectedCommand);    
    });
    it("send method with no answer paramater should be only send correct command",async () => {
        var device  = new MTRF64Driver.NooliteDevice(controller,5,
            MTRF64Driver.NooliteDevice.Mode.NooliteF);
        var cmd = new MTRF64Driver.Command();
        cmd.ch = 5;
        cmd.mode = 1;
        cmd.ctr  = 3;
        var actualCommand = 
        await(() => { 
            return new Promise((resolve) => {
                device._onSend = (command) => {
                    resolve(command);
                };                
                port.on('open',()=> {
                    controller.send(device,cmd,false);  
                });
            });
        })();
     
        const expectedCommand = {
                        _startBit: 171,
                        _mode: 1,
                        _ctr: 3,
                        _togl: 0,
                        _ch: 5,
                        _cmd: 0,
                        _fmt: 0,
                        _d: [0,0,0,0],
                        _id: [0,0,0,0],
                        _crc: 180,
                        _stopBit: 172
                        };
        expect(actualCommand).deep.equal(expectedCommand);    
    })
    it("Send method should be correct parameter",() => {
        expect(()=> {controller.send("bug")}).to.throw(Error);
    })
    it("Send method should be not undefined parameter",() => {
        expect(()=> {controller.send()}).to.throw(Error);
    })
    it("Send command should be callback _onSend",async () => {
        var device  = new MTRF64Driver.NooliteDevice(controller,5,MTRF64Driver.NooliteDevice.Mode.NooliteF);
        var cmd = new MTRF64Driver.Command();
               var actualCommand = 
        await(() => {
            return new Promise((resolve) => {
               controller._onSend  = (command) => {
                resolve(command);   
               };
            controller.send(device,cmd);
            })
        } )();
        var expectedCommand = {
            _startBit:171,
            _mode: 4,
            _ctr: 0,
            _togl: 0,
            _ch: 0,
            _cmd: 0,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 175,
            _stopBit:172
        }
        expect(actualCommand).deep.equal(expectedCommand);

        
    })
});

describe("MTRF64 receive event from RemoteControlNooliteDevice test suite",() => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Driver.Controller(port);
    });

    it("Receive event for RemoteControlNooliteDevice",async () => {
        var device  = new MTRF64Driver.AbstractRemoteControl(controller,5,
            MTRF64Driver.NooliteDevice.Mode.NooliteF);
        
        var actualCommand = 
        await(() => { 
            return new Promise((resolve) => {
                device.onCommand = (command) => {
                    resolve(command);
                };
                controller.register(device);
                port.on('open',()=> {
                       port.binding.emitData(Buffer.from([173,1,0,2,5,15,0,0,0,0,0,0,0,0,0,196,174]));
                });
            });
        })();
     
        const expectedCommand = {
                        _startBit: 173,
                        _mode: 1,
                        _ctr: 0,
                        _togl: 2,
                        _ch: 5,
                        _cmd: 15,
                        _fmt: 0,
                        _d: [0,0,0,0],
                        _id: [0,0,0,0],
                        _crc: 196,
                        _stopBit: 174
                        };
        expect(actualCommand).deep.equal(expectedCommand);    
    });
});
describe("#1760 -- Implement send user command directly via low leveldriver",() => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        
    });
    it("send correct command from user", async () =>{
       let actualCommand = 
       await (()=>{
          return new Promise((resolve) => {
            controller = new MTRF64Driver.Controller(port,null,(data) =>{
                resolve(data);
            });
            controller._onSend = (data)=> {
                actualCommand = data;
               };
            port.on('open',()=> {
                controller.execUserCommand([173,1,0,2,5,15,0,0,0,0,0,0,0,0,0,196,174]);            
            });               
          });   
        })();
        const expectedCommand = {
            _startBit: 173,
            _mode: 1,
            _ctr: 0,
            _togl: 2,
            _ch: 5,
            _cmd: 15,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 196,
            _stopBit: 174
            };
        expect(actualCommand).deep.equal(expectedCommand);    
    });
    it("lastReceivedCommand contain correct", async () =>{
        let actualCommand = 
        await (()=>{
           return new Promise((resolve) => {
             controller = new MTRF64Driver.Controller(port);
             controller._onReceive = (command) => {
                 resolve();
             }             
             port.on('open',()=> {
                port.binding.emitData(Buffer.from([173,1,0,2,5,15,0,0,0,0,0,0,0,0,0,196,174]));           
             });               
           });   
         })();
         const expectedCommand = {
             _startBit: 173,
             _mode: 1,
             _ctr: 0,
             _togl: 2,
             _ch: 5,
             _cmd: 15,
             _fmt: 0,
             _d: [0,0,0,0],
             _id: [0,0,0,0],
             _crc: 196,
             _stopBit: 174
             };
         expect(new MTRF64Command(controller.lastReceivedCommand)).deep.equal(expectedCommand);    
     });
    // it("receive correct answer after user command has been sent", async () =>{
    //     let actualCommand =  await (()=>{
    //        return new Promise((resolve) => {
    //          port.on('open', ()=> {
                 
    //              let command = controller.execUserCommand([173,1,0,2,5,15,0,0,0,0,0,0,0,0,0,196,174]);
    //              resolve(command);
    //          });
    //          port.on('data',(data) => {
    //             port.binding.emitData(Buffer.from([173,1,0,2,5,15,0,0,0,0,0,0,0,0,0,196,174]));
                
    //          })   
    //        });   
    //      })();
    //      const expectedCommand = {
    //          _startBit: 173,
    //          _mode: 1,
    //          _ctr: 0,
    //          _togl: 2,
    //          _ch: 5,
    //          _cmd: 15,
    //          _fmt: 0,
    //          _d: [0,0,0,0],
    //          _id: [0,0,0,0],
    //          _crc: 196,
    //          _stopBit: 174
    //          };
    //      expect(actualCommand).deep.equal(expectedCommand);    
    //  })
});

