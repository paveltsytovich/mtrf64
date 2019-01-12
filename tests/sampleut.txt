"use strict"
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
               var adapter = new MTRF64Adapter(port,(command)=> {
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
    it("Adapter should be sent correct byte into port ", async () => {
        var actual;
        await function() {

            return new Promise((resolve) => {
                var adapter = new MTRF64Adapter(port,() => {
                   actual = port.binding.lastWrite;
                   resolve();                    
                   });
                adapter.send(command);
            });
        }();
        actual.should.be.equalTo(command.buildPacket());        
     });
});

describe("Adapter receive method test suite",() => {
    var port;
    //var adapter;
    var command;
    var mockBinding;
    var parser;
    beforeEach(() => {
       
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath); 
    });
    afterEach(() => {
        port.close();
        mockBinding.reset();
    });
    it("Adapter receive packet should be create correct command",async () => {
        var actualCommand;
        var adapter = new MTRF64Adapter(port);
        port.on('open',() => {
                port.binding.emitData(Buffer.from([173,4,1,2,3,1,2,3,1,2,3,1,2,3,1,202,174]));
                  console.log(port.binding.lastWrite);
        });
        actualCommand = await adapter.receive();
            
        var expectedCommand = {
        _startBit: 173,
        _mode: 4,
        _ctr: 1,
        _togl: 2,
        _ch: 3,
        _cmd: 1,
        _fmt: 2,
        _d: [3,1,2,3],
        _id: [1,2,3,1],
        _crc: 202,
        _stopBit: 174
        };
        expect(actualCommand).deep.equal(expectedCommand);
    });
});

//------------------------------------------------------------------------------------------7
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const MTRF64Adapter = require('../MTRF64Adapter');
const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
chai.should();

const NooliteBase = require('../NooliteBase')

describe("NooliteBase elementary test suite",() => {
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
    it("Base device have all need properties",() => {
        var actualDevice = new NooliteBase(100,adapter);
        var expectedDevice = {
            channel : 100,
            adapter: adapter,
        }
        actualDevice.should.have.property('channel',100);
        actualDevice.should.have.property('adapter',adapter);
    });
    it("Channel less them zero should be error", () => {
        expect(() => {
            var actualDevice = new NooliteBase(-2,adapter);
        }).to.throw(Error);    
    });
    it("zero channel should be error", () => {
        expect(() => {
            var actualDevice = new NooliteBase(0,adapter);
        }).to.throw(Error);    
    });
    it("Base device without adapter should be error",() => {
        expect(() => {
            var actualDevice = new NooliteBase(1);
        }).to.throw(Error);
    });   
})

describe("NooliteBase bind test suite",() => {
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
    it("Base device bind NooliteF create correct command",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                actualCommand = command;
                port.binding.emitData(Buffer.from([173,2,3,0,5,130,0,0,0,0,0,0,0,0,0,0x39,174]));
            });       
        const device = new NooliteBase(5,adapter);
        await device.bind(NooliteBase.Mode.NooliteF);
        var expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 15,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xC1,
            _stopBit: 172
        };

        expect(actualCommand).deep.equal(expectedCommand);
    }); 
    it("Base device bind NooliteF is ok",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                port.binding.emitData(Buffer.from([173,2,3,0,5,130,0,0,0,0,0,0,0,0,0,0x39,174]));
            });       
        const device = new NooliteBase(5,adapter);
        var actual = await device.bind(NooliteBase.Mode.NooliteF);
        actual.should.true;
    }); 

    it("Base device bind Noolite create correct command",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                actualCommand = command;
                port.binding.emitData(Buffer.from([173,0,3,0,5,130,0,0,0,0,0,0,0,0,0,0x39,174]));
            });       
        const device = new NooliteBase(5,adapter);
        await device.bind(NooliteBase.Mode.Noolite);
        var expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 15,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xBF,
            _stopBit: 172
        };

        expect(actualCommand).deep.equal(expectedCommand);
    }); 

    it("Base device  bind Noolite is ok",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port,(command) => {
            port.binding.emitData(Buffer.from([173,0,3,0,5,130,0,0,0,0,0,0,0,0,0,0x6E,174]));
        });       
        const device = new NooliteBase(5,adapter);
        var actual = await device.bind(NooliteBase.Mode.Noolite);
        actual.should.true;
    }); 
    it("Base device not execute bind for NooliteF should be Error",async() => {        
        
        var adapter = new MTRF64Adapter(port,
                    (command) => { // onSend
                        port.binding.emitData(Buffer.from([173,2,2,0,5,130,0,0,0,0,0,0,0,0,0,0x38,174]));
                    });
        const device = new NooliteBase(5,adapter);                
        const actual = await device.bind(NooliteBase.Mode.NooliteF);        
        actual.should.false;
    });
});

describe("NooliteBase unbind test suite",() => {
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
    it("Base device unbind NooliteF mode send correct command",async() => {
        var actualCommand;
        var adapter = new MTRF64Adapter(port,
            (command) => { //onSend
                actualCommand = command;
                port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x32,174]));
            });
                
        var device = new NooliteBase(5,adapter);
        const actual = await device.unbind(NooliteBase.Mode.NooliteF);
        var expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 9,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xBB,
            _stopBit: 172
        };
        expect(actualCommand).deep.equal(expectedCommand);
    });
    it("Base device success unbind Noolite mode command",async() => {
        var actualCommand;
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x32,174]));
            });
                
        var device = new NooliteBase(5,adapter);
        var actual = await device.unbind(NooliteBase.Mode.NooliteF);
        actual.should.true;
    });
    it("Base device not execute unbind for NooliteF should be Error",async() => {
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                port.binding.emitData(Buffer.from([173,0,0,0,5,130,0,0,0,0,0,0,0,0,0,0x38,174]));
            });
        const device = new NooliteBase(5,adapter);                
        const actual = await device.bind(NooliteBase.Mode.NooliteF);        
        actual.should.false;
    });




    /* it("Base device not execute unbind should be Error", async() => {
        var actualCommand;
        await function () {
            
            return new Promise((resolve)=> {
                var adapter = new MTRF64Adapter(port,
                (command) => { // onSend
                    //здесь надо имитировать ответ от устройства
                },
                (command) => { //onReceive
                    resolve();
                    actualCommand = command;
                });
            var device = new NooliteBase(5,adapter);
            device.unbind(NooliteBase.Mode.NooliteF);
            });

        }();
        assert.fail('Not implemented');
    }); */
});
//--------------------------------------------------
"use strict"
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
               var adapter = new MTRF64Adapter(port,(command)=> {
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
    it("Adapter should be sent correct byte into port ", async () => {
        var actual;
        await function() {

            return new Promise((resolve) => {
                var adapter = new MTRF64Adapter(port,() => {
                   actual = port.binding.lastWrite;
                   resolve();                    
                   });
                adapter.send(command);
            });
        }();
        actual.should.be.equalTo(command.buildPacket());        
     });
});

describe("Adapter receive method test suite",() => {
    var port;
    //var adapter;
    var command;
    var mockBinding;
    var parser;
    beforeEach(() => {
       
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath); 
    });
    afterEach(() => {
        port.close();
        mockBinding.reset();
    });
    it("Adapter receive packet should be create correct command",async () => {
        var actualCommand;
        var adapter = new MTRF64Adapter(port);
        port.on('open',() => {
                port.binding.emitData(Buffer.from([173,4,1,2,3,1,2,3,1,2,3,1,2,3,1,202,174]));
                  console.log(port.binding.lastWrite);
        });
        actualCommand = await adapter.receive();
            
        var expectedCommand = {
        _startBit: 173,
        _mode: 4,
        _ctr: 1,
        _togl: 2,
        _ch: 3,
        _cmd: 1,
        _fmt: 2,
        _d: [3,1,2,3],
        _id: [1,2,3,1],
        _crc: 202,
        _stopBit: 174
        };
        expect(actualCommand).deep.equal(expectedCommand);
    });
});

//------------------------------------------------------------------------------------------7
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const MTRF64Adapter = require('../MTRF64Adapter');
const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
chai.should();

const NooliteBase = require('../NooliteBase')

describe("NooliteBase elementary test suite",() => {
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
    it("Base device have all need properties",() => {
        var actualDevice = new NooliteBase(100,adapter);
        var expectedDevice = {
            channel : 100,
            adapter: adapter,
        }
        actualDevice.should.have.property('channel',100);
        actualDevice.should.have.property('adapter',adapter);
    });
    it("Channel less them zero should be error", () => {
        expect(() => {
            var actualDevice = new NooliteBase(-2,adapter);
        }).to.throw(Error);    
    });
    it("zero channel should be error", () => {
        expect(() => {
            var actualDevice = new NooliteBase(0,adapter);
        }).to.throw(Error);    
    });
    it("Base device without adapter should be error",() => {
        expect(() => {
            var actualDevice = new NooliteBase(1);
        }).to.throw(Error);
    });   
})

describe("NooliteBase bind test suite",() => {
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
    it("Base device bind NooliteF create correct command",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                actualCommand = command;
                port.binding.emitData(Buffer.from([173,2,3,0,5,130,0,0,0,0,0,0,0,0,0,0x39,174]));
            });       
        const device = new NooliteBase(5,adapter);
        await device.bind(NooliteBase.Mode.NooliteF);
        var expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 15,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xC1,
            _stopBit: 172
        };

        expect(actualCommand).deep.equal(expectedCommand);
    }); 
    it("Base device bind NooliteF is ok",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                port.binding.emitData(Buffer.from([173,2,3,0,5,130,0,0,0,0,0,0,0,0,0,0x39,174]));
            });       
        const device = new NooliteBase(5,adapter);
        var actual = await device.bind(NooliteBase.Mode.NooliteF);
        actual.should.true;
    }); 

    it("Base device bind Noolite create correct command",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                actualCommand = command;
                port.binding.emitData(Buffer.from([173,0,3,0,5,130,0,0,0,0,0,0,0,0,0,0x39,174]));
            });       
        const device = new NooliteBase(5,adapter);
        await device.bind(NooliteBase.Mode.Noolite);
        var expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 15,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xBF,
            _stopBit: 172
        };

        expect(actualCommand).deep.equal(expectedCommand);
    }); 

    it("Base device  bind Noolite is ok",async () => {
        var actualCommand;
        
        var adapter = new MTRF64Adapter(port,(command) => {
            port.binding.emitData(Buffer.from([173,0,3,0,5,130,0,0,0,0,0,0,0,0,0,0x6E,174]));
        });       
        const device = new NooliteBase(5,adapter);
        var actual = await device.bind(NooliteBase.Mode.Noolite);
        actual.should.true;
    }); 
    it("Base device not execute bind for NooliteF should be Error",async() => {        
        
        var adapter = new MTRF64Adapter(port,
                    (command) => { // onSend
                        port.binding.emitData(Buffer.from([173,2,2,0,5,130,0,0,0,0,0,0,0,0,0,0x38,174]));
                    });
        const device = new NooliteBase(5,adapter);                
        const actual = await device.bind(NooliteBase.Mode.NooliteF);        
        actual.should.false;
    });
});

describe("NooliteBase unbind test suite",() => {
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
    it("Base device unbind NooliteF mode send correct command",async() => {
        var actualCommand;
        var adapter = new MTRF64Adapter(port,
            (command) => { //onSend
                actualCommand = command;
                port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x32,174]));
            });
                
        var device = new NooliteBase(5,adapter);
        const actual = await device.unbind(NooliteBase.Mode.NooliteF);
        var expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 9,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xBB,
            _stopBit: 172
        };
        expect(actualCommand).deep.equal(expectedCommand);
    });
    it("Base device success unbind Noolite mode command",async() => {
        var actualCommand;
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x32,174]));
            });
                
        var device = new NooliteBase(5,adapter);
        var actual = await device.unbind(NooliteBase.Mode.NooliteF);
        actual.should.true;
    });
    it("Base device not execute unbind for NooliteF should be Error",async() => {
        var adapter = new MTRF64Adapter(port,
            (command) => { // onSend
                port.binding.emitData(Buffer.from([173,0,0,0,5,130,0,0,0,0,0,0,0,0,0,0x38,174]));
            });
        const device = new NooliteBase(5,adapter);                
        const actual = await device.bind(NooliteBase.Mode.NooliteF);        
        actual.should.false;
    });




    /* it("Base device not execute unbind should be Error", async() => {
        var actualCommand;
        await function () {
            
            return new Promise((resolve)=> {
                var adapter = new MTRF64Adapter(port,
                (command) => { // onSend
                    //здесь надо имитировать ответ от устройства
                },
                (command) => { //onReceive
                    resolve();
                    actualCommand = command;
                });
            var device = new NooliteBase(5,adapter);
            device.unbind(NooliteBase.Mode.NooliteF);
            });

        }();
        assert.fail('Not implemented');
    }); */
});