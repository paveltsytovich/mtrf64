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
    var adapter;
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
                adapter = new MTRF64Adapter(port,(command)=> {
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
    it("Adapter should be sent correct command", async () => {
        var actual;
        await function() {

            return new Promise((resolve) => {
                adapter.send(command,() => {
                   actual = port.binding.lastWrite;
                   resolve();                    
                   });
            });
        }();
        actual.should.be.equalTo(command.buildPacket());

        
     });
});

describe("Adapter listen method test suite",() => {
    var port;
    var adapter;
    var command;
    var mockBinding;
    beforeEach(() => {
       
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: false});
        port = new SerialPort(devPath);
        adapter = new MTRF64Adapter(port);
        
    });
    afterEach(() => {
        port.close();
        mockBinding.reset();
    });
    it("Adapter listen packet should be create command",async () => {
        var actualCommand;
        await function() {
            return new  Promise( (resolve) => {
            adapter.listen((command) => {
                actualCommand = command;
                resolve();
            });
            port.on('open',() => {
                port.binding.emitData(Buffer.from([173,4,1,2,3,1,2,3,1,2,3,1,2,3,1,202,174]));
            });
        });
    }();
    var expectedCommand = {
        startBit: 173,
        mode: 4,
        ctr: 1,
        togl: 2,
        ch: 3,
        cmd: 1,
        fmt: 2,
        d: [3,1,2,3],
        id: [1,2,3,1],
        crc: 202,
        stopBit: 174
    };

    expect(actualCommand).deep.equal(expectedCommand);
    });
        
    it("Callback function  for listen method should be exists", () => {
        expect(() => {
                adapter.listen();       
        }).to.throw(Error);
    });
});