"use strict"

class MTRF64Command {
    constructor(packet = null) {
        if(packet == null)
        {
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
        else
            if((packet instanceof Buffer || Array.isArray(packet)) && packet.length == 17) {
                this.startBit = packet[0];
                this.mode = packet[1];
                this.ctr = packet[2];
                this.togl = packet[3];
                this.ch = packet[4];
                this.cmd = packet[5];
                this.fmt = packet[6];
                this.d = [];
                this.d[0] = packet[7];
                this.d[1] = packet[8];
                this.d[2] = packet[9];
                this.d[3] = packet[10];
                this.id = [];
                this.id[0] = packet[11];
                this.id[1]  = packet[12];
                this.id[2] = packet[13];
                this.id[3] = packet[14];
                this.crc = packet[15];
                this.stopBit = packet[16];
            }
            else {
                throw Error("packet parameter must be array of 17 bytes!")
            }         
    }
    buildPacket() {
        return [this.startBit,this.mode,this.ctr,this.togl,this.ch,this.cmd,this.fmt,
        this.d[0],this.d[1],this.d[2],this.d[3],this.id[0],this.id[1],this.id[2],this.id[3],
        this._crc(),this.stopBit];  
    }
    _crc() {
        return this.startBit + this.mode + this.ctr + this.togl + this.ch + this.cmd + this.fmt +
        this.d[0] + this.d[1] + this.d[2] + this.d[3] + this.id[0] + this.id[1] + this.id[2] + 
        this.id[3];
    }
}

module.exports = MTRF64Command;