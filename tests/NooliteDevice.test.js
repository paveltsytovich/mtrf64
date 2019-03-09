"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";

const MTRF64Driver = require('../');

describe("NooliteDevice elementary test suite",() => {
    it("NooliteDevice has all properties",() => {
        const device = new MTRF64Driver.NooliteDevice(null,5);
        device.should.have.property("_channel");
        device.should.have.property("_controller");
        device.should.have.property("onCommand");
    });
});

