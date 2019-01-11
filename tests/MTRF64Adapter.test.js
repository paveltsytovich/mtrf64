"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;


const MTRF64Command = require('../MTRF64Command');
const MTRF64Adapter = require('../MTRF64Adapter');
const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
chai.should();

describe("Adapter elementary test suite",() => {
    var port;
    var adapter;
    var command;
    var mockBinding;
    beforeEach(() => {
       
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);        
    });
    afterEach(() => {
        port.close();
        mockBinding.reset();
    });
    it("Adapter should be have all necessary properties", () => {
        var adapter = new MTRF64Adapter(port);
        adapter.should.have.property("port",port);
        adapter.should.have.property("onSend");
        adapter.should.have.property("onReceive");
    });
});

describe("Adapter send method test suite",() => {

    var port;
    var command;
    var mockBinding;
    beforeEach(() => {
       
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);
        
        command = new MTRF64Command();
        
    });
    afterEach(() => {
        port.close();
        mockBinding.reset();
    });
    it("Adapter must be call callback after success send packet into port",async () => {
        
        var actualCommand;
        await function() {
            return new Promise((resolve) => {
               var adapter = new MTRF64Adapter(port,(command)=> {
                        actualCommand = command;
                        resolve(); 
                     });
                adapter.send(command);
                });

            }();
       var expected = JSON.stringify(command);
       var actual = JSON.stringify(actualCommand);
       expected.should.be.equal(actual);
        
    });
    it("Adapter should be sent correct byte into port ", async () => {
        var actual;
        await function() {

            return new Promise((resolve) => {
                var adapter = new MTRF64Adapter(port,() => {
                   actual = port.binding.lastWrite;
                   resolve();                    
                   });
                adapter.send(command);
            });
        }();
        actual.should.be.equalTo(command.buildPacket());        
     });
});

describe("Adapter receive method test suite",() => {
    var port;
    //var adapter;
    var command;
    var mockBinding;
    var parser;
    beforeEach(() => {
       
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath); 
    });
    afterEach(() => {
        port.close();
        mockBinding.reset();
    });
    it("Adapter receive packet should be create correct command",async () => {
        var actualCommand;
        var adapter = new MTRF64Adapter(port);
        port.on('open',() => {
                port.binding.emitData(Buffer.from([173,4,1,2,3,1,2,3,1,2,3,1,2,3,1,202,174]));
                  console.log(port.binding.lastWrite);
        });
        actualCommand = await adapter.receive();
            
        var expectedCommand = {
        _startBit: 173,
        _mode: 4,
        _ctr: 1,
        _togl: 2,
        _ch: 3,
        _cmd: 1,
        _fmt: 2,
        _d: [3,1,2,3],
        _id: [1,2,3,1],
        _crc: 202,
        _stopBit: 174
        };
        expect(actualCommand).deep.equal(expectedCommand);
    });
});