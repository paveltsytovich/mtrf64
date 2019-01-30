"use strict"
const MTRF64Command = require('./MTRF64Command');
const RemoteControlNooliteDevice = require('./RemoteControlNooliteDevice');
class MTRF64Adapter {
    constructor(port,onSend, onReceive) {
        this.port = port;
        this.onSend = onSend;
        this.onReceive = onReceive;
        this._registry = [];
    }
    send(command) {
        if(!command || !(command instanceof MTRF64Command))
          throw Error('Bad type of parameter');
        this.port.write(command.buildPacket(),() => {
            if(this.onSend)
             this.onSend(command);
        });

    }
        
    register(device) {
        if(!device || !(device instanceof RemoteControlNooliteDevice))
         throw Error("Bad type for interface")
        this._registry[device.channel] = device;
        return true;
    }
    listen() {
       var self = this;
        this.port.on('data',(data) => {
            const command = new MTRF64Command(data);
            const device = self._registry[command.ch];
            if(self.onReceive)
              self.onReceive(command);
            if(device)
              device.onCommand(command);
        });
    }
}

MTRF64Adapter.Command = {"Bind":9}
module.exports = MTRF64Adapter;