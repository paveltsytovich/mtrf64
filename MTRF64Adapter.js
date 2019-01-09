"use strict"
const MTRF64Command = require('./MTRF64Command');

class MTRF64Adapter {
    constructor(port) {
        this.port = port;
    }
    send(command,callback = null) {
        this.port.write(command.buildPacket(),(error) => {
            if(callback)
             callback(command);
        });
    }
    receive(callback) {
        if(!callback)
         throw Error('Callback must be exists!');
        this.port.on('data',(data) => {
            var cmd = new MTRF64Command(data);
            callback(cmd);
        });
    }
}


module.exports = MTRF64Adapter;