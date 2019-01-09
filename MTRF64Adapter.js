"use strict"
const MTRF64Command = require('./MTRF64Command');

class MTRF64Adapter {
    constructor(port,onSend, onReceive) {
        this.port = port;
        this.onSend = onSend;
        this.onReceive = onReceive;
    }
    send(command) {
        this.port.write(command.buildPacket(),(error) => {
            if(this.onSend)
             this.onSend(command);
        });
    }
    listen() {
        this.port.on('data',(data) => {
            var cmd = new MTRF64Command(data);
            if(this.onReceive)
            this.onReceive(cmd);
        });
    }
}
module.exports = MTRF64Adapter;