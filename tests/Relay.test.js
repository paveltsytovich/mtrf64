"use strict"
require('mocha');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;

const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB112";


const Relay = require('../Relay');

const MTRF64Adapter = require('../MTRF64Adapter');
const MTRF64Controller = require('../MTRF64Controller');

describe("Relay elementary test suite",() => {
    it("Relay has all properties",() => {
        const device = new Relay(null,5);
        device.should.have.property("_channel");
        device.should.have.property("_controller");
        device.should.have.property("_id");
        device.should.have.property("onCommand");

        device.should.have.property("turnOn");
        device.should.have.property("turnOff");
        device.should.have.property("brightUp");
        device.should.have.property("brightDown");
        device.should.have.property("setBrightness");
        device.should.have.property("loadPreset");
        device.should.have.property("savePreset");
        device.should.have.property("stopReq");
        device.should.have.property("brightStepDown");
        device.should.have.property("brightStepUp");
        device.should.have.property("brightReq");
        device.should.have.property("rollColour");
        device.should.have.property("switchColour");
        device.should.have.property("switchMode");
        device.should.have.property("speedModeBack");
        device.should.have.property("temporaryOn");
        device.should.have.property("readState");
        
    });
});

describe("Relay bind command", () => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Controller(port);
    });
    it("Relay Bind command for NooliteF mode should be ok", async () => {
        var device = new Relay(controller,5,Relay.Mode.NooliteF);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,2,3,0,5,130,0,0,0,0,0,0,0,0,0,0x39,174]));
                }
                port.on('open',() => {
                    var status = device.bind();
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 15,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 193,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;
    });
    it("Relay Bind command for NooliteF mode should set id device", async () => {
        var device = new Relay(controller,5,Relay.Mode.NooliteF);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,2,3,0,5,130,0,0,0,0,0,1,2,3,4,0x39,174]));
                }
                port.on('open',() => {
                    var status = device.bind();
                    resolve(status);
                })                
            })
        })();        
       expect(device._id).deep.equal([1,2,3,4]);
    });
    it("Relay Bind command for Noolite mode should be ok", async () => {
        var device = new Relay(controller,5,Relay.Mode.Noolite);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,0,0,5,15,0,0,0,0,0,0,0,0,0,0x39,174]));
                }
                port.on('open',() => {
                    var status = device.bind();
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 15,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 191,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;
    });

});

describe("Relay unbind command", () => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Controller(port);
    });
    it("Relay Unbind command for NooliteF mode should be ok", async () => {
        var device = new Relay(controller,5,Relay.Mode.NooliteF);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x40,174]));
                }
                port.on('open',() => {
                    var status = device.unbind();
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 9,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 187,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;
    });
    it("Relay Unbind command for Noolite mode should be ok", async () => {
        var device = new Relay(controller,5,Relay.Mode.Noolite);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,0,0,5,9,0,0,0,0,0,0,0,0,0,0xBB,174]));
                }
                port.on('open',() => {
                    var status = device.unbind();
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 9,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 185,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;
    });
});

describe("Relay turnOn ommands", () => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Controller(port);
    });
    it("Relay turnOn for NooliteF mode should be ok",async () => {
        var device = new Relay(controller,5,Relay.Mode.NooliteF);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x40,174]));
                }
                port.on('open',() => {
                    var status = device.turnOn();
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 2,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xb4,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;  
    })
    it("Relay broadcast turnOn for NooliteF mode  should be ok",async () => {
        var device = new Relay(controller,5,Relay.Mode.NooliteF);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x40,174]));
                }
                port.on('open',() => {
                    var status = device.turnOn(Relay.Command.Broadcast);
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 1,
            _togl: 0,
            _ch: 5,
            _cmd: 2,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xb5,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;  
    });
    it("Relay turnOn by id for NooliteF mode  should be ok",async () => {
        var device = new Relay(controller,5,Relay.Mode.NooliteF);
        device._id = [1,1,1,1];
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x40,174]));
                }
                port.on('open',() => {
                    var status = device.turnOn(Relay.Command.ByID);
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 8,
            _togl: 0,
            _ch: 5,
            _cmd: 2,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [1,1,1,1],
            _crc: 0xc0,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;  
    });
    it("Relay turnOn for Noolite mode should be ok", async () => {
        var device = new Relay(controller,5,Relay.Mode.Noolite);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,0,0,5,2,0,0,0,0,0,0,0,0,0,0x40,174]));
                }
                port.on('open',() => {
                    var status = device.turnOn();
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 2,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 178,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;  
    })
});

describe("Relay turnOff commands", () => {
    var mockBinding;
    var port;
    var controller;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Controller(port);
    });
    it("Relay turnOff for NooliteF mode should be ok",async () => {
        var device = new Relay(controller,5,Relay.Mode.NooliteF);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x40,174]));
                }
                port.on('open',() => {
                    var status = device.turnOff();
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 0,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xb2,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;  
    })
    it("Relay broadcast turnOff for NooliteF mode  should be ok",async () => {
        var device = new Relay(controller,5,Relay.Mode.NooliteF);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x40,174]));
                }
                port.on('open',() => {
                    var status = device.turnOff(Relay.Command.Broadcast);
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 1,
            _togl: 0,
            _ch: 5,
            _cmd: 0,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xb3,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;  
    });
    it("Relay turnOff by id for NooliteF mode  should be ok",async () => {
        var device = new Relay(controller,5,Relay.Mode.NooliteF);
        device._id = [1,1,1,1];
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,2,0,0,5,130,0,0,0,0,0,0,0,0,0,0x40,174]));
                }
                port.on('open',() => {
                    var status = device.turnOff(Relay.Command.ByID);
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 2,
            _ctr: 8,
            _togl: 0,
            _ch: 5,
            _cmd: 0,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [1,1,1,1],
            _crc: 0xbe,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;  
    });
    it("Relay turnOff for Noolite mode should be ok", async () => {
        var device = new Relay(controller,5,Relay.Mode.Noolite);
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0x40,174]));
                }
                port.on('open',() => {
                    var status = device.turnOff();
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 0,
            _fmt: 0,
            _d: [0,0,0,0],
            _id: [0,0,0,0],
            _crc: 176,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;  
    })
});

describe("Relay parametrized commands test suite",() => {
    var mockBinding;
    var port;
    var controller;
    var device;
    beforeEach(() => {
        mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: true,autoOpen: true});
        port = new SerialPort(devPath);  
        controller = new MTRF64Controller(port);
        device = new Relay(controller,5,Relay.Mode.Noolite);
    });
    it("Relay setBrigthness", async () => {
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0x40,174]));
                }
                port.on('open',() => {
                    var status = device.setBrightness(0.5);
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 6,
            _fmt: 1,
            _d: [95,0,0,0],
            _id: [0,0,0,0],
            _crc: 0x16,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;      
    });
    it("Relay brightStepDown should be ok", async () => {
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,0,0,5,11,0,0,0,0,0,0,0,0,0,189,174]));
                }
                port.on('open',() => {
                    var status = device.brightStepDown(3);
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 11,
            _fmt: 1,
            _d: [3,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xbf,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;      
    });
    it("Relay brightStepUp should be ok", async () => {
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,0,0,5,12,0,0,0,0,0,0,0,0,0,190,174]));
                }
                port.on('open',() => {
                    var status = device.brightStepUp(3);
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 12,
            _fmt: 1,
            _d: [3,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xc0,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;      
    });

    it("Relay brightReq with up should be ok", async () => {
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,0,0,5,13,0,0,0,0,0,0,0,0,0,191,174]));
                }
                port.on('open',() => {
                    var status = device.brightReq(Relay.Direction.Up,0.5);
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 13,
            _fmt: 1,
            _d: [64,0,0,0],
            _id: [0,0,0,0],
            _crc: 0xfe,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;      
    });

    it("Relay brightReq with down should be ok", async () => {
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,0,0,5,13,0,0,0,0,0,0,0,0,0,191,174]));
                }
                port.on('open',() => {
                    var status = device.brightReq(Relay.Direction.Down,0.5);
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 13,
            _fmt: 1,
            _d: [191,0,0,0],
            _id: [0,0,0,0],
            _crc: 0x7d,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;      
    });

    it("Relay setColor with rgb parameters should be ok", async () => {
        var actualCommand;
        var actualStatus = 
        await(() => {
            return new Promise((resolve) => {
                controller._onSend = (command) => {
                    actualCommand = command;
                    port.binding.emitData(Buffer.from([173,0,0,0,5,6,0,0,0,0,0,0,0,0,0,191,174]));
                }
                port.on('open',() => {
                    var status = device.setColor(0.5,0.2,0.4);
                    resolve(status);
                })                
            })
        })();
        const expectedCommand = {
            _startBit: 171,
            _mode: 0,
            _ctr: 0,
            _togl: 0,
            _ch: 5,
            _cmd: 6,
            _fmt: 3 ,
            _d: [128,51,102,0],
            _id: [0,0,0,0],
            _crc: 0xd2,
            _stopBit: 172
            };
        expect(actualCommand).deep.equal(expectedCommand);
        
        actualStatus.should.true;      
    });
});

describe("Relay states commands", () => {

})
