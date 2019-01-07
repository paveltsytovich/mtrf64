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
    buildCommand() {
        return [this.startBit,this.mode,this.ctr,0,this.ch,this.cmd,this.fmt,
        this.d[0],this.d[1],this.d[2],this.d[3],this.id[0],this.id[1],this.id[2],this.id[3],
        this._crc(),this.stopBit];  
    }
    _crc() {
        return this.startBit + this.mode + this.ctr + 0 + this.ch + this.cmd + this.fmt +
        this.d[0] + this.d[1] + this.d[2] + this.d[3] + this.id[0] + this.id[1] + this.id[2] + 
        this.id[3];
    }
}

module.exports = MTRF64Adapter;