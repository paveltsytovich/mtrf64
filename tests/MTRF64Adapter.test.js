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