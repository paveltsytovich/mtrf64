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

describe("NooliteBase elementary test suite",() => {
    var port;
    var adapter;
    var command;
    var mockBinding;
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
    it("Base device have all need properties",() => {
        var actualDevice = new NooliteBase(100,adapter);
        var expectedDevice = {
            channel : 100,
            adapter: adapter,
        }
        actualDevice.should.have.property('channel',100);
        actualDevice.should.have.property('adapter',adapter);
    });
    it("Channel less them zero should be error", () => {
        expect(() => {
            var actualDevice = new NooliteBase(-2,adapter);
        }).to.throw(Error);    
    });
    it("zero channel should be error", () => {
        expect(() => {
            var actualDevice = new NooliteBase(0,adapter);
        }).to.throw(Error);    
    });
    it("Base device without adapter should be error",() => {
        expect(() => {
            var actualDevice = new NooliteBase(1);
        }).to.throw(Error);
    });   
})

describe("NooliteBase bind test suite",() => {
    var port;
    var adapter;
    var command;
    var mockBinding;
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
    it("Base device success bind command",async () => {
        var actualCommand;
        await function () {
            
            return new Promise((resolve)=> {
                var adapter = new MTRF64Adapter(port,
                (command) => { // onSend
                    //здесь надо имитировать ответ от устройства
                },
                (command) => { //onReceive
                    resolve();
                    actualCommand = command;
                });
            const device = new NooliteBase(5,adapter);
            device.bind();
            });

        }();
        
        assert.fail('Partialy implemented');
    });
    it("Base device not execute bind should be Error",async() => {        
        var actualCommand;
        await function () {
            
            return new Promise((resolve)=> {
                var adapter = new MTRF64Adapter(port,
                    (command) => { // onSend
                        //здесь надо имитировать ответ от устройства
                    },
                    (command) => { //onReceive
                        resolve();
                        actualCommand = command;
                    });
                const device = new NooliteBase(5,adapter);                
                device.unbind();
            });

        }();
        assert.fail('Partialy implemented');
    });
});

describe("NooliteBase unbind test suite",() => {
    it("Base device success unbind command",async() => {
        var actualCommand;
        await function () {
            
            return new Promise((resolve)=> {
                var adapter = new MTRF64Adapter(port,
                (command) => { // onSend
                    //здесь надо имитировать ответ от устройства
                },
                (command) => { //onReceive
                    resolve();
                    actualCommand = command;
                });
            var device = new NooliteBase(5,adapter);
            device.unbind();
            });

        }();
        assert.fail('Partialy implemented');
    });
    it("Base device not execute unbind should be Error", async() => {
        var actualCommand;
        await function () {
            
            return new Promise((resolve)=> {
                var adapter = new MTRF64Adapter(port,
                (command) => { // onSend
                    //здесь надо имитировать ответ от устройства
                },
                (command) => { //onReceive
                    resolve();
                    actualCommand = command;
                });
            var device = new NooliteBase(5,adapter);
            device.unbind();
            });

        }();
        assert.fail('Not implemented');
    });
});