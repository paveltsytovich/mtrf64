/**
 * @copyright Pavel Tsytovich, 2019
 * 
 * Implement MTRF64 Adapter interface
 */

"use strict"
const MTRF64Command = require('./MTRF64Command');
const RemoteControlNooliteDevice = require('./AbstractRemoteControl');
class MTRF64Adapter {
    /**
     * Constructor class
     * @param {object} port  - Serial port object for send data to serial port
     * @param {function} onSend - Callback after send packet. Internal use only
     * @param {function} onReceive - Callback after receive packet. Internal use only
     * @param {object} parser - Serial port object for read data from serial port
     */
    constructor(port,onSend, onReceive,parser) {
        this.port = port;
        this.onSend = onSend;
        this.onReceive = onReceive;
        this._parser = parser ? parser : port;
    }
    /**
     * Send MTRF64Command to serial port
     * @param {MTRF64Command} command 
     */
    send(command) {
        if(!command || !(command instanceof MTRF64Command))
          throw Error('Bad type of parameter');
        this.port.write(command.buildPacket(),() => {
            if(this.onSend)
             this.onSend(command);
        });

    }
    /**
     * Open Adapter for receive packet. Do not use this method directly
     */
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