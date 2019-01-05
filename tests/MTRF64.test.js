require('mocha');
const chai = require('chai');

chai.should();

const MTRF64Adapter = require('../mtrf64');
const SerialPort = require('serialport/test');

const devPath = "/dev/ttyUSB0";


describe("Initialization test",() =>{
    var port;
    beforeEach(() => {
        const mockBinding = SerialPort.Binding;
        mockBinding.createPort(devPath,{echo: false, record: false});
        port = new SerialPort(devPath);
    });

    it("Create adapter",() => {

        const adapter = new MTRF64Adapter(port);
        adapter.should.have.property('port').eq(port);
        adapter.should.have.property('startBit').eq(171);
        adapter.should.have.property('stopBit').eq(172);
        adapter.should.have.property('mode').eq(4);
        adapter.should.have.property('ctr').eq(0);
        adapter.should.have.property('togl').eq(0);
        adapter.should.have.property('ch').eq(0);
        adapter.should.have.property('cmd').eq(0);
        adapter.should.have.property('fmt').eq(0);
    
        
    });
  
});