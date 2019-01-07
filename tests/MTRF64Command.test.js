require('mocha');
const chai = require('chai');



const MTRF64Command = require('../MTRF64Command');
const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB0";
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
chai.should();

describe("Command elementary tests",() =>{
    

    it("Command should be have all properties",() => {
       var command = new MTRF64Command();
       command.should.have.property("startBit",171);
       command.should.have.property("mode",4);
       command.should.have.property("ctr").eq(0);
       command.should.have.property("togl").eq(0);
       command.should.have.property("ch").eq(0);
       command.should.have.property("cmd").eq(0);
       command.should.have.property("d").to.be.equalTo([0,0,0,0]);
       command.should.have.property("id").to.be.equalTo([0,0,0,0]);
       command.should.have.property("crc",175);
       command.should.have.property("stopBit").eq(172);
    });

    it("Build Packet Should be correact byte array",() => {
        var command = new MTRF64Command();
        const packet = command.buildPacket()
        packet.should.to.be.equalTo([171,4,0,0,0,0,0,0,0,0,0,0,0,0,0,175,172]);

    });
  
});