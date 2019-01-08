class MTRF64Adapter {
    constructor(port) {
        this.port = port;
    }
    send(command,callback = null) {
        this.port.write(command.buildPacket(),(error) => {
            if(callback)
             callback(true);
        });
    }
    receive(callback) {
        
    }
}


module.exports = MTRF64Adapter;