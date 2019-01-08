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

describe("Adapter send method test suite",() => {

    var port;
    var adapter;
    var command;
    var mockBinding;
    beforeEach(() => {
       
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);
        adapter = new MTRF64Adapter(port);
        command = new MTRF64Command();
        
    });
    afterEach(() => {
        port.close();
        mockBinding.reset();
    });
    it("Adapter should be have all necessary properties", () => {
        adapter.should.have.property("port",port);
    });
    it("Adapter must be call callback after success send packet into port",() => {
        adapter.send(command,(success) => {
            success.should.true;
        })
    });
    it("Adapter should be sent correct command", () => {
       
        adapter.send(command,() => {
         var actual = port.binding.lastWrite;
        
         actual.should.be.equalTo(command.buildPacket());
        });
     });
});

describe("Adapter receive method test suite",() => {
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
    it("Adapter receive packet should be create command",() => {
        adapter.receive((command) => {
            var actual = command.buildPacket();
            var expected = [173,4,1,2,3,1,2,3,1,2,3,1,2,3,1,300,174];
            actual.should.be.equalTo(expected);
        });
        port.binding.emitData(Buffer.from([173,4,1,2,3,1,2,3,1,2,3,1,2,3,1,300,174]))
    });
    it("Callback function  for receive method should`nt be exists", () => {
        expect(() => {
            adapter.receive();
        }).to.throw(Error);
    });
});