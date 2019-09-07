"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";

const MTRF64Driver = require('../');



describe("test for bug #1737 -- mixed input and output address during event handle",() => {
    var mockBinding;
    var port;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        
    });
    it("turnOn command for Relay should be not call turnOn method in RemoteControl ",async () =>
    {
        var bugFound = false;
        class TestRemoteControl extends MTRF64Driver.RemoteControl {
            onTurnOn() {
                bugFound = true;
            }
            onTurnOff() {
                bugFound = true;
            }
        };
        var controller = controller = new MTRF64Driver.Controller(port);
        var outputDevice = new MTRF64Driver.Relay(controller,5,MTRF64Driver.Relay.Mode.NooliteF);
        var inputDevice = new TestRemoteControl(controller,5,MTRF64Driver.NooliteF);
        controller.register(inputDevice);
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    port.binding.emitData(Buffer.from([173,2,0,0,5,0,0,0,0,0,0,0,0,0,0,0x180,174]));
                }
                port.on('open',() => {
                    var status = outputDevice.turnOn();
                    resolve(status);
                }) 
            });
        })();
        bugFound.should.false;
    });
});

describe("test for bug #1745 -- wrong color in RGB", () => {
    var mockBinding;
    var port;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        
    });
    it("Color bytes should be according as specification", async () => {
        var actualCommand;
        var controller = controller = new MTRF64Driver.Controller(port);
        var device = new MTRF64Driver.Relay(controller,5,MTRF64Driver.Relay.Mode.NooliteF);
        const actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,0,0,5,6,0,0,0,0,0,0,0,0,0,191,174]));
                }
                port.on('open',() => {
                    var status = device.setColor(1,1,1);
                    resolve(status);
                })  
            });
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 6,
            _fmt: 3 ,
            _d: [1,1,1,0],
            _id: [0,0,0,0],
            _crc: 190,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;      

    });
});