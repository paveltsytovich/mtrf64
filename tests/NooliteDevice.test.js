"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";


const NooliteDevice = require('../NooliteDevice');

const MTRF64Command = require('../MTRF64Command');
const MTRF64Adapter = require('../MTRF64Adapter');

describe("NooliteDevice elementary test suite",() => {
    it("NooliteDevice has all properties",() => {
        const device = new NooliteDevice(null,5);
        device.should.have.property("_channel");
        device.should.have.property("_adapter");
        device.should.have.property("onCommand");
        device.should.have.property("onLowBattery");
        device.should.have.property("onTurnOn");
        device.should.have.property("onTurnOff");
        device.should.have.property("onSwitch");
        device.should.have.property("onRoll_Colour");
        device.should.have.property("onSwitch_Colour");
        device.should.have.property("onSend_State");
        device.should.have.property("deviceType");
    });
});

describe("NooliteDevice command handler tests suite", () => {
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
    
    it("Receive packet should be call OnCommand method in NooliteDevice",async() => {
        var device;
        var actualCommand;
       
        await(()=>{
            return new Promise((resolve) => {
                var device = new NooliteDevice(adapter,5,NooliteDevice.Mode.NooliteF);
                    device.onCommand = (command) => {
                        actualCommand = command;
                        resolve();
                    };  
                adapter.register(device);             
                port.on('open',()=> {
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