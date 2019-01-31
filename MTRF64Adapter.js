"use strict"
const MTRF64Command = require('./MTRF64Command');
const RemoteControlNooliteDevice = require('./AbstractRemoteControl');
class MTRF64Adapter {
    constructor(port,onSend, onReceive,parser) {
        this.port = port;
        this.onSend = onSend;
        this.onReceive = onReceive;
        this._parser = parser ? parser : port;
    }
    send(command) {
        if(!command || !(command instanceof MTRF64Command))
          throw Error('Bad type of parameter');
        this.port.write(command.buildPacket(),() => {
            if(this.onSend)
             this.onSend(command);
        });

    }
    listen() {
       var self = this;
        this._parser.on('data',(data) => {
            const command = new MTRF64Command(data);
            if(self.onReceive)
              self.onReceive(command);
        });
    }
}

MTRF64Adapter.Command = {"Bind":9}
module.exports = MTRF64Adapter;