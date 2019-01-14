"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const NooliteDevice = require('../NooliteDevice');

describe("NooliteDevice elementary test suite",() => {
    it("NooliteDevice has all properties",() => {
        const device = new NooliteDevice(null,5);
        device.should.have.property("_channel");
        device.should.have.property("_adapter");
        device.should.have.property("onCommand");
    });
});