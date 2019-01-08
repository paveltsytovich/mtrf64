require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const MTRF64Adapter = require('../MTRF64Adapter');
const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
chai.should();

const NooliteBase = require('../NooliteBase')

describe("NooliteBase test suite",() => {
    it("Base device have all need properties",() => {
        assert.fail('Not implemented');
    });
   
})

describe("NooliteBase bind test suite",() => {
    it("Base device success bind command",() => {
        assert.fail('Not implemented');
    });
    it("Base device not execute bind should be Error",() => {
        assert.fail('Not implemented');
    });
});

describe("NooliteBase unbind test suite",() => {
    it("Base device success unbind command",() => {
        assert.fail('Not implemented');
    });
    it("Base device not execute unbind should be Error",() => {
        assert.fail('Not implemented');
    });
});