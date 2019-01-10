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
    it("Base device bind NooliteF create correct command",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                actualCommand = command;
                port.binding.emitData(Buffer.from([173,2,3,0,5,130,0,0,0,0,0,0,0,0,0,0x39,174]));
            });       
        const device = new NooliteBase(5,adapter);
        await device.bind(NooliteBase.Mode.NooliteF);
        var expectedCommand = {
            startBit: 171,
            mode: 2,
            ctr: 0,
            togl: 0,
            ch: 5,
            cmd: 15,
            fmt: 0,
            d: [0,0,0,0],
            id: [0,0,0,0],
            crc: 0xC1,
            stopBit: 172
        };

        expect(actualCommand).deep.equal(expectedCommand);
    }); 
    it("Base device bind NooliteF is ok",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                port.binding.emitData(Buffer.from([173,2,3,0,5,130,0,0,0,0,0,0,0,0,0,0x39,174]));
            });       
        const device = new NooliteBase(5,adapter);
        var actual = await device.bind(NooliteBase.Mode.NooliteF);
        actual.should.true;
    }); 

    it("Base device bind Noolite create correct command",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                actualCommand = command;
                port.binding.emitData(Buffer.from([173,0,3,0,5,130,0,0,0,0,0,0,0,0,0,0x39,174]));
            });       
        const device = new NooliteBase(5,adapter);
        await device.bind(NooliteBase.Mode.Noolite);
        var expectedCommand = {
            startBit: 171,
            mode: 0,
            ctr: 0,
            togl: 0,
            ch: 5,
            cmd: 15,
            fmt: 0,
            d: [0,0,0,0],
            id: [0,0,0,0],
            crc: 0xBF,
            stopBit: 172
        };

        expect(actualCommand).deep.equal(expectedCommand);
    }); 

    it("Base device  bind Noolite is ok",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port);       
        const device = new NooliteBase(5,adapter);
        var actual = await device.bind(NooliteBase.Mode.Noolite);
        actual.should.true;
    }); 
    it("Base device not execute bind should be Error",async() => {        
        
        var adapter = new MTRF64Adapter(port,
                    (command) => { // onSend
                        port.binding.emitData(Buffer.from([173,2,2,0,5,130,0,0,0,0,0,0,0,0,0,0x38,174]));
                    });
        const device = new NooliteBase(5,adapter);                
        const actual = await device.bind(NooliteBase.Mode.NooliteF);        
        actual.should.false;
    });
});

describe("NooliteBase unbind test suite",() => {
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
    it("Base device unbind NooliteF mode send correct command",async() => {
        var actualCommand;
        var adapter = new MTRF64Adapter(port,
            (command) => { //onSend
                actualCommand = command;
                port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x32,174]));
            });
                
        var device = new NooliteBase(5,adapter);
        const actual = await device.unbind(NooliteBase.Mode.NooliteF);
        var expectedCommand = {
            startBit: 171,
            mode: 2,
            ctr: 0,
            togl: 0,
            ch: 5,
            cmd: 9,
            fmt: 0,
            d: [0,0,0,0],
            id: [0,0,0,0],
            crc: 0xBB,
            stopBit: 172
        };
        expect(actualCommand).deep.equal(expectedCommand);
    });
    it("Base device success unbind Noolite mode command",async() => {
        var actualCommand;
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x32,174]));
            });
                
        var device = new NooliteBase(5,adapter);
        var actual = await device.unbind(NooliteBase.Mode.NooliteF);
        actual.should.true;
    });





    /* it("Base device not execute unbind should be Error", async() => {
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
            device.unbind(NooliteBase.Mode.NooliteF);
            });

        }();
        assert.fail('Not implemented');
    }); */
});