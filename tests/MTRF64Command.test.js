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
           _startBit:171,
           _mode: 4,
           _ctr: 0,
           _togl: 0,
           _ch: 0,
           _cmd: 0,
           _fmt: 0,
           _d: [0,0,0,0],
           _id: [0,0,0,0],
           _crc: 175,
           _stopBit:172
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
            _startBit: 171,
            _mode: 4,
            _ctr: 1,
            _togl: 2,
            _ch: 3,
            _cmd: 1,
            _fmt: 2,
            _d: [3,1,2,3],
            _id: [1,2,3,1],
            _crc: 200,
            _stopBit: 172
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
        var actualCommand = new MTRF64Command(Buffer.from(receivePacket));

        var expectedCommand = {
            _startBit: 171,
            _mode: 4,
            _ctr: 1,
            _togl: 2,
            _ch: 3,
            _cmd: 1,
            _fmt: 2,
            _d: [3,1,2,3],
            _id: [1,2,3,1],
            _crc: 200,
            _stopBit: 172
        };
        expect(actualCommand).deep.equal(expectedCommand);
    })
    it("Command should be correct CRC after change it`s properties",() => {
        var actualCommand = new MTRF64Command();
        actualCommand.ch = 5;
        actualCommand.cmd = 15;
        var expectedCommand = {
            _startBit:171,
            _mode: 4,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 15,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xC3,
            _stopBit:172
        }
        expect(actualCommand).deep.equal(expectedCommand);
     });
     it("Command should be correct crc in data package", () => {
        var actualCommand = new MTRF64Command();
        actualCommand.ch = 5;
        actualCommand.cmd = 6;
        actualCommand.mode = 0;
        actualCommand.setData(0,95);
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 6,
            _fmt: 0,
            _d: [95,0,0,0],
            _id: [0,0,0,0],
            _crc: 0x15,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
     })
});