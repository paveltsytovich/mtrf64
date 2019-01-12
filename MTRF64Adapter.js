"use strict"
const MTRF64Command = require('./MTRF64Command');
const NooliteDevice = require('./NooliteDevice');
class MTRF64Adapter {
    constructor(port,onSend, onReceive) {
        this.port = port;
        this.onSend = onSend;
        this.onReceive = onReceive;
        this._registry = [];
    }
    send(command) {
       throw Error('Not implemented');
    }
    clear(channel) {
        throw Error('Not implemented');
    }
    clearAll() {
        throw Error('Not implemented');
    }
    
    register(device) {
        if(!device || !(device instanceof NooliteDevice))
         throw Error("Bad type for interface")
        this._registry[device.channel] = device;
        return true;
    }
}

MTRF64Adapter.Command = {"Bind":9}
module.exports = MTRF64Adapter;