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
        this.port.write(command.buildPacket(),(error) => {
            if(this.onSend)
             this.onSend(command);
        });
    }
       async receive() {
        var packet;
        var result = false;
        const port = this.port;
        const onReceive = this.onReceive;
        
        result = await(() =>
        {
        return new Promise((resolve) => {
            port.once('data',(data)=> {
                packet = data;
                if(packet)
                result = new MTRF64Command(packet);
        
                if(onReceive)
                    onReceive(result);
                resolve(result);
                });
            });
        })();       
        return result;
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
module.exports = MTRF64Adapter;