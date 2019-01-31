"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";


const AbstractRemoteControl = require('../AbstractRemoteControl');

const MTRF64Controller = require('../MTRF64Controller');


describe("RemoteControl elementary test suite",() => {
    it("RemoteNooliteDevice has all properties",() => {
        const device = new AbstractRemoteControl(null,5);
        device.should.have.property("_channel");
        device.should.have.property("_controller");
        device.should.have.property("onCommand");
        
        device.should.have.property("bind");
        device.should.have.property("unbind");
    });
});

describe("RemoteControl bind command", () => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Controller(port);
    });
    it("Bind command for NooliteF mode should be ok", async () => {
        var device = new AbstractRemoteControl(controller,5,
                                    AbstractRemoteControl.Mode.NooliteF);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,1,0,2,5,15,0,0,0,0,0,0,0,0,0,196,174]));
                }
                port.on('open',() => {
                    var status = device.bind();
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 3,
            _ctr: 3,
            _togl: 0,
            _ch: 5,
            _cmd: 0,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 182,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;
    });
    it("Bind command for Noolite mode should be ok", async () => {
        var device = new AbstractRemoteControl(controller,5,
                                    AbstractRemoteControl.Mode.Noolite);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,1,0,2,5,15,0,0,0,0,0,0,0,0,0,196,174]));
                }
                port.on('open',() => {
                    var status = device.bind();
                    resolve(status);
                })                
            })
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
        
        actualStatus.should.true;
    })
    it("Bind command should be false if wrong answer", async () => {
        var device = new AbstractRemoteControl(controller,5,
                                    AbstractRemoteControl.Mode.NooliteF);
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    port.binding.emitData(Buffer.from([173,0,0,0,5,0,0,0,0,0,0,0,0,0,0,178,174]));
                }
                port.on('open',() => {
                    var status = device.bind();
                    resolve(status);
                })                
            })
        })();
               
        actualStatus.should.false;
    })
});

describe("Unbind command",() => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Controller(port);
    });
    it("unbind command for Noolite mode should be ok", async () => {
        var actualCommand;
        const device = new AbstractRemoteControl(controller,5,AbstractRemoteControl.Mode.Noolite);
        await(()=> {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                }
                port.on('open',() => {
                    var status = device.unbind();
                    resolve(status);
                })   
            })
        })();
        var expectedCommand = {
            _startBit:171,
            _mode: 1,
            _ctr: 5,
            _togl: 0,
            _ch: 5,
            _cmd: 0,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 182,
            _stopBit:172
        }
        expect(actualCommand).deep.equal(expectedCommand);
    });

    it("unbind command for NooliteF mode should be ok", async () => {
        const device = new AbstractRemoteControl(controller,5,AbstractRemoteControl.Mode.NooliteF);
        var actualCommand;
        await(()=> {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                }
                port.on('open',() => {
                    var status = device.unbind();
                    resolve(status);
                })   
            })
        })();
        var expectedCommand = {
            _startBit:171,
            _mode: 3,
            _ctr: 5,
            _togl: 0,
            _ch: 5,
            _cmd: 0,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 184,
            _stopBit:172
        }
        expect(actualCommand).deep.equal(expectedCommand);
    })
})