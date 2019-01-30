"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";


const RemoteControlNooliteDevice = require('../RemoteControlNooliteDevice');

const MTRF64Command = require('../MTRF64Command');
const MTRF64Adapter = require('../MTRF64Adapter');


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

