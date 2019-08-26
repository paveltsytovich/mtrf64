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