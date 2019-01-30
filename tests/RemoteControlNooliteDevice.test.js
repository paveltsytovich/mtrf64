"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";


const RemoteControlNooliteDevice = require('../RemoteControlNooliteDevice');

const MTRF64Controller = require('../MTRF64Controller');


describe("RemoteControlNooliteDevice elementary test suite",() => {
    it("RemoteNooliteDevice has all properties",() => {
        const device = new RemoteControlNooliteDevice(null,5);
        device.should.have.property("_channel");
        device.should.have.property("_controller");
        device.should.have.property("onCommand");
        device.should.have.property("onSendState");
        device.should.have.property("onSensTempHumi");
        device.should.have.property("bind");
        device.should.have.property("unbind");
        device.should.have.property("_onAnswer");
    });
});

describe("RemoteControlNooliteDevice bind command", () => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Controller(port);
    });
    it("Bind command should be ok", async () => {
        var device = new RemoteControlNooliteDevice(controller,5,
                                    RemoteControlNooliteDevice.Mode.NooliteF);
        var actualStatus;
        var actualCommand = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    port.binding.emitData(Buffer.from([173,1,0,2,5,15,0,0,0,0,0,0,0,0,0,196,174]));
                    resolve(command);
                }
                actualStatus = device.bind();
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
            _stopBit: 174
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;
    })
});