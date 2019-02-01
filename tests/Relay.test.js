"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";


const Relay = require('../Relay');

const MTRF64Adapter = require('../MTRF64Adapter');
const MTRF64Controller = require('../MTRF64Controller');

describe("Relay elementary test suite",() => {
    it("Relay has all properties",() => {
        const device = new Relay(null,5);
        device.should.have.property("_channel");
        device.should.have.property("_controller");
        device.should.have.property("_id");
        device.should.have.property("onCommand");

        device.should.have.property("turnOn");
        device.should.have.property("turnOff");
        device.should.have.property("brightUp");
        device.should.have.property("brightDown");
        device.should.have.property("setBrightness");
        device.should.have.property("loadPreset");
        device.should.have.property("savePreset");
        device.should.have.property("stopReq");
        device.should.have.property("brightStepDown");
        device.should.have.property("brightStepUp");
        device.should.have.property("brightReq");
        device.should.have.property("rollColour");
        device.should.have.property("switchColour");
        device.should.have.property("switchMode");
        device.should.have.property("speedModeBack");
        device.should.have.property("temporaryOn");
        device.should.have.property("readState");
        
    });
});

describe("Relay bind command", () => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Controller(port);
    });
    it("Relay Bind command for NooliteF mode should be ok", async () => {
        var device = new Relay(controller,5,Relay.Mode.NooliteF);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,3,0,5,130,0,0,0,0,0,0,0,0,0,39,174]));
                }
                port.on('open',() => {
                    var status = device.bind();
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 15,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 193,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;
    });
    it("Relay Bind command for NooliteF mode should set id device", async () => {
        var device = new Relay(controller,5,Relay.Mode.NooliteF);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,2,3,0,5,130,0,0,0,0,0,1,2,3,4,39,174]));
                }
                port.on('open',() => {
                    var status = device.bind();
                    resolve(status);
                })                
            })
        })();        
       expect(device._id).deep.equal([1,2,3,4]);
    });
    it("Relay Bind command for Noolite mode should be ok", async () => {
        var device = new Relay(controller,5,Relay.Mode.Noolite);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,2,3,0,5,15,0,0,0,0,0,0,0,0,0,39,174]));
                }
                port.on('open',() => {
                    var status = device.bind();
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 15,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 191,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;
    });

});

describe("Relay unbind command", () => {

});

describe("Relay turnOn, turnOff and Switch commands", () => {

});

describe("Relay brightness commands", () => {

});

describe("Relay Scenario commands", () => {

});

describe("Relay RGB commands", () => {

});

describe("Relay states commands", () => {

})
