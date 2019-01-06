class MTRF64Adapter {
    constructor(port=null) {
        this.port = port;
        this.startBit = 171;
        this.mode = 4;
        this.ctr = 0;
        this.togl = 0;
        this.ch = 0;
        this.cmd = 0
        this.fmt = 0;
        this.d = [0,0,0,0];
        this.id = [0,0,0,0];
        this.crc = 175;
        this.stopBit = 172        
    }
    buidCommand() {
        throw Error();
    }
}

module.exports = MTRF64Adapter;