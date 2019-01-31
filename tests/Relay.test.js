"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";


const Relay = require('../Relay');

const MTRF64Command = require('../MTRF64Command');
const MTRF64Adapter = require('../MTRF64Adapter');

describe("RelayNooliteDevice elementary test suite",() => {
    it("RelayNooliteDevice has all properties",() => {
        const device = new Relay(null,5);
        device.should.have.property("_channel");
        device.should.have.property("_controller");
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
