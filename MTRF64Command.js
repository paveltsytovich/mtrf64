"use strict"

class MTRF64Command {
    constructor(packet = null) {
        if(packet == null)
        {
            this._startBit = 171;
            this._mode = 4;
            this._ctr = 0;
            this._togl = 0;
            this._ch = 0;
            this._cmd = 0
            this._fmt = 0;
            this._d = [0,0,0,0];
            this._id = [0,0,0,0];
            this._crc = this._evaluteCrc();
            this._stopBit = 172;
        }
        else
            if((packet instanceof Buffer || Array.isArray(packet)) && packet.length == 17) {
                this._startBit = packet[0];
                this._mode = packet[1];
                this._ctr = packet[2];
                this._togl = packet[3];
                this._ch = packet[4];
                this._cmd = packet[5];
                this._fmt = packet[6];
                this._d = [];
                this._d[0] = packet[7];
                this._d[1] = packet[8];
                this._d[2] = packet[9];
                this._d[3] = packet[10];
                this._id = [];
                this._id[0] = packet[11];
                this._id[1]  = packet[12];
                this._id[2] = packet[13];
                this._id[3] = packet[14];
                this._crc = packet[15];
                this._stopBit = packet[16];
            }
            else {
                throw Error("packet parameter must be array of 17 bytes!")
            }
        }
    get mode () {
        return this._mode;        
    }         
    set mode(value) {
        this._mode = value;
        this._crc = this._evaluteCrc();
    }
    get ch() {
        return this._ch;
    }
    set ch(value) {
        this._ch = value;
        this._crc = this._evaluteCrc();
    }
    get cmd() {
        return this._cmd;
    }
    set cmd(value) {
        this._cmd = value;
        this._crc = this._evaluteCrc();
    }
    get d() {
        return this._d.slice();
    }
    get id() {
        return this._id.slice();
    }
    get ctr() {
        return this._ctr;
    }
    buildPacket() {
        return [this._startBit,this._mode,this._ctr,this._togl,this._ch,this._cmd,this._fmt,
        this._d[0],this._d[1],this._d[2],this._d[3],this._id[0],this._id[1],this._id[2],this._id[3],
        this._crc,this._stopBit];  
    }
    _evaluteCrc() {
        return (this._startBit + this._mode + this._ctr + this._togl + this._ch + this._cmd + this._fmt +
        this._d[0] + this._d[1] + this._d[2] + this._d[3] + this._id[0] + this._id[1] + this._id[2] + 
        this._id[3]) & 0xFF;
    }
}

module.exports = MTRF64Command;