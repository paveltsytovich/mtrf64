require('mocha');
const chai = require('chai');
const expect = require('chai').expect;



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
    it("Create command from byte array should be ok",() => {
        const receivePacket = [171,4,1,2,3,1,2,3,1,2,3,1,2,3,1,200,172];
        var command = new MTRF64Command(receivePacket);
        command.should.have.property("startBit",171);
        command.should.have.property("mode",4);
        command.should.have.property("ctr").eq(1);
        command.should.have.property("togl").eq(2);
        command.should.have.property("ch").eq(3);
        command.should.have.property("cmd").eq(1);
        command.should.have.property("d").to.be.equalTo([2,3,1,2]);
        command.should.have.property("id").to.be.equalTo([3,1,2,3]);
        command.should.have.property("crc",300);
        command.should.have.property("stopBit").eq(172);

    });
    it("Create command from non-array packet should be error",()=> {
        expect(()=>{
            new MTRF64Command("BUG");
        }).to.throw(Error);
    });
});