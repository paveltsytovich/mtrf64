/**
 * @copyright Pavel Tsytovich, 2019
 * 
 * Implement MTRF64 packet
 * @module MTRF64Command
 */

"use strict"

class MTRF64Command {
    /**
     * Constructor class. if `packet` not undefined it use for create object
     * @param {Array} packet - source packet 
     */
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
    /**
     * Get mode property
     */
    get mode () {
        return this._mode;        
    }    
    /**
     *  Set mode property
     * @param value {number} - mode value. Must be 0 or 2
     *  */     
    set mode(value) {
        this._mode = value;
        this._crc = this._evaluteCrc();
    }
    /**
     * Get channel property
     */
    get ch() {
        return this._ch;
    }
    /**
     * Set channel property
     * @param value {number} - channel of device
     */
    set ch(value) {
        this._ch = value;
        this._crc = this._evaluteCrc();
    }
    /**
     * Get command propery
     */
    get cmd() {
        return this._cmd;
    }
    /**
     * Set command property
     * @param value {number} - 
     */
    set cmd(value) {
        this._cmd = value;
        this._crc = this._evaluteCrc();
    }
    /**
     * Get data property
     */
    get d() {
        return this._d.slice();
    }
    /**
     * Get id property
     */
    get id() {
        return this._id.slice();
    }
    /**
     * Set id property
     * @param value must 
     */
    set id(value) {
        this._id = value.slice();
        this._crc = this._evaluteCrc();
    }
    /**
     * Get ctr byte property
     */
    get ctr() {
        return this._ctr;
    }
    /**
     * Set ctr byte property
     * @param value {number}
     */
    set ctr(value) {
        this._ctr = value;
        this._crc = this._evaluteCrc();
    }
    /**
     * Get togl byte propety
     */
    get togl() {
        return this._togl;
    }
    /**
     * Set fmt byte property
     */
    set fmt(value) {
        this._fmt = value;
        this._crc = this._evaluteCrc();
    }
    /**
     * Get fmt byte property
     */
    get fmt() {
        return this._fmt;
    }
    /**
     * Set block data
     * @param n {number}  - index in data block
     * @param value {number} - value of block data block 
     */
    setData(n,value) {
        if(n < 0 || n > 3 )
          throw Error('Bad parameter');
        this._d[n] = value;
        this._fmt++;
        this._crc = this._evaluteCrc();
    }
    /**
     * Build packet. This method is internal, not use it directly
     */
    buildPacket() {
        return [this._startBit,this._mode,this._ctr,this._togl,this._ch,this._cmd,this._fmt,
        this._d[0],this._d[1],this._d[2],this._d[3],this._id[0],this._id[1],this._id[2],this._id[3],
        this._crc,this._stopBit];  
    }
    /**
     * Calculate control check sum. This method is internal, not use it directly 
     */
    _evaluteCrc() {
        return (this._startBit + this._mode + this._ctr + this._togl + this._ch + this._cmd + this._fmt +
        this._d[0] + this._d[1] + this._d[2] + this._d[3] + this._id[0] + this._id[1] + this._id[2] + 
        this._id[3]) & 0xFF;
    }
}

module.exports = MTRF64Command;