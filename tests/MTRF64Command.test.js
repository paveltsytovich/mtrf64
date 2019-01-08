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
       var actualCommand = new MTRF64Command();
       var expectedCommand = {
           startBit:171,
           mode: 4,
           ctr: 0,
           togl: 0,
           ch: 0,
           cmd: 0,
           fmt: 0,
           d: [0,0,0,0],
           id: [0,0,0,0],
           crc: 175,
           stopBit:172
       }
       expect(actualCommand).deep.equal(expectedCommand);
    });

    it("Build Packet Should be correact byte array",() => {
        var command = new MTRF64Command();
        const packet = command.buildPacket()
        packet.should.to.be.equalTo([171,4,0,0,0,0,0,0,0,0,0,0,0,0,0,175,172]);

    });
    it("Create command from byte array should be ok",() => {
        const receivePacket = [171,4,1,2,3,1,2,3,1,2,3,1,2,3,1,200,172];
        var actualCommand = new MTRF64Command(receivePacket);

        var expectedCommand = {
            startBit: 171,
            mode: 4,
            ctr: 1,
            togl: 2,
            ch: 3,
            cmd: 1,
            fmt: 2,
            d: [3,1,2,3],
            id: [1,2,3,1],
            crc: 200,
            stopBit: 172
        };

        expect(actualCommand).deep.equal(expectedCommand);

    });
    it("Create command from non-array packet should be error",()=> {
        expect(()=>{
            new MTRF64Command("BUG");
        }).to.throw(Error);
    });
    it("Array packet too long should be error",() => {
        expect(()=> {
            new MTRF64Command(Array(18));

        }).to.throw(Error);
    });
    it("Command create from buffer should be ok",()=> {
        const receivePacket = [171,4,1,2,3,1,2,3,1,2,3,1,2,3,1,200,172];
        var command = new MTRF64Command(Buffer.from(receivePacket));
        command.should.have.property("startBit",171);
        command.should.have.property("mode",4);
        command.should.have.property("ctr").eq(1);
        command.should.have.property("togl").eq(2);
        command.should.have.property("ch").eq(3);
        command.should.have.property("cmd").eq(1);
        command.should.have.property("fmt").eq(2);
        command.should.have.property("d").to.be.equalTo([3,1,2,3]);
        command.should.have.property("id").to.be.equalTo([1,2,3,1]);
        command.should.have.property("crc",200);
        command.should.have.property("stopBit").eq(172);
    })
});