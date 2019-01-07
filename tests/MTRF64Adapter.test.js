require('mocha');
const chai = require('chai');



const MTRF64Command = require('../MTRF64Command');
const MTRF64Adapter = require('../MTRF64Adapter');
const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB0";
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
chai.should();

describe("Creation adapter tests",() => {

    var port;
    var adapter;
    beforeEach(() => {
       
        const mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: false});
        port = new SerialPort(devPath);
        adapter = new MTRF64Adapter(port);
        
    });
    it("Adapter should be have all necessary properties", () => {
        adapter.should.have.property("port",port);
    });

    it("Adapter should be sent correct command", () => {
       var command = new MTRF64Command();
       adapter.send(command);
       var actualCommand = port.binding.lastWrite;
       actualCommand.should.be.equalTo(command.buildPacket());
    });
});