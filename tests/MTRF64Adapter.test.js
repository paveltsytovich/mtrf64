"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;


const MTRF64Command = require('../MTRF64Command');
const MTRF64Adapter = require('../MTRF64Adapter');
const NooliteDevice= require('../NooliteDevice');
const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
chai.should();

describe("Adapter elementary test suite",() =>{
    it("Adapter have all properties after created", () => {
        var mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        var port = new SerialPort(devPath);  
        var adapter = new MTRF64Adapter(port);

        adapter.should.have.property("port",port);
        adapter.should.have.property("onSend");
        adapter.should.have.property("onReceive");
    });
});
describe("Adapter register event test suite",() => {
    var mockBinding;
    var port;
    var adapter;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        adapter = new MTRF64Adapter(port);
    });
    it("Register interface should be ok",() => {
        var device = new NooliteDevice(5,NooliteDevice.Mode.NooliteF);
        const actual = adapter.register(device);
        actual.should.true;
        
    });
    it("Register with undefined device should be Error",()=> {
        expect(()=> {
            adapter.register();
         }).to.throw(Error);
    });
    it("Register with bad inheritance should be Error",() => {
        expect(()=> {
            adapter.register("BUG") 
        }).to.throw(Error);
    })
})

describe("Send command in adapter test suite",() => {

    var mockBinding;
    var adapter;
    var port;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
    });
    it("Send command create correct packet", async () => {
        var actualCommand;
        await (() => {
                return new Promise((resolve) => {
                    adapter = new MTRF64Adapter(port,(command) => {
                        actualCommand = command;
                        resolve();
                    });
                    var command = new MTRF64Command();
                    command.ch = 5;
                    command.mode = 2;
                    command.cmd = MTRF64Adapter.Command.Bind;
                    adapter.send(command);
                });   
        })();
        var expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 9,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 187,
            _stopBit: 172
            };
            expect(actualCommand).deep.equal(expectedCommand);
    });
    it("send parameter must be not null or undefined",() => {
        var adapter = new MTRF64Adapter(port);
        expect(() => {adapter.send();}).to.throw(Error);
    });
    it("Send parameter must be type of MTRF64Command",() => {
        var adapter = new MTRF64Adapter(port);
        expect(() => {adapter.send("BUG");}).to.throw(Error);
    })

});

describe("Event handlers from adapter test suite", () => {
    var mockBinding;
    var port;
    var adapter;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        adapter = new MTRF64Adapter(port);
    });
    afterEach(() => {
        port.close();
        mockBinding.reset();
    });
   
    it("Receive packet for unregister channel should be ignored",async () => {
        var actualCommand;
        var adapter;
        await(() => {
                return new Promise((resolve) => {
                    adapter = new MTRF64Adapter(port,null,(command) => {
                      actualCommand = command;
                      resolve();
                });
            port.on('open', () => {
                port.binding.emitData(Buffer.from([173,4,0,2,5,0,0,0,0,0,0,0,0,0,0,184,174]));
            });
            adapter.listen();        
            });
        })();
        const expectedCommand = {
            _startBit: 173,
            _mode: 4,
            _ctr: 0,
            _togl: 2,
            _ch: 5,
            _cmd: 0,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 184,
            _stopBit: 174
            };
        expect(actualCommand).deep.equal(expectedCommand);
    });
});