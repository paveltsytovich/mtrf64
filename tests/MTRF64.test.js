require('mocha');
const chai = require('chai');



const MTRF64Adapter = require('../mtrf64');
const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB0";
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
chai.should();

function CompareAdapters(o1,o2) {
    
}

describe("Elementary tests",() =>{
    var port;
    var adapter;
    beforeEach(() => {
       
        const mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: false});
        port = new SerialPort(devPath);
        adapter = new MTRF64Adapter(port);
    });

    it("Adapter should be have all properties",() => {
       
       adapter.should.have.property("port").eq(port);
       adapter.should.have.property("startBit",171);
       adapter.should.have.property("mode",4);
       adapter.should.have.property("ctr").eq(0);
       adapter.should.have.property("togl").eq(0);
       adapter.should.have.property("ch").eq(0);
       adapter.should.have.property("cmd").eq(0);
       adapter.should.have.property("d").to.be.equalTo([0,0,0,0]);
       adapter.should.have.property("id").to.be.equalTo([0,0,0,0]);
       adapter.should.have.property("crc",175);
       adapter.should.have.property("stopBit").eq(172);
    });

    it("Build Command Should be correact byte array",() => {
        const command = adapter.buildCommand();
        command.should.to.be.equalTo([171,4,0,0,0,0,0,0,0,0,0,0,0,0,0,175,172]);

    });
  
});