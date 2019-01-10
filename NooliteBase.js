const MTRF64Command = require('./MTRF64Command');
class NooliteBase {
    
    constructor(channel, adapter) {
        NooliteBase.Noolite = 0
        NooliteBase.NooliteF = 2;
        if(channel <= 0 || !adapter)
         throw Error('Channel or adapter missing or have incorrect value');

        this.adapter = adapter;
        this.channel = channel;
    }
    async bind(mode) {
        const command = new MTRF64Command();
        command.mode = mode;
        command.ch = this.adapter;
        command.cmd = 15; //Bind
        this.adapter.send(command);
        const receiveCommand = await this.adapter.receive();
        return receiveCommand.crt == 3;
    }
}
NooliteBase.Mode = {"Noolite":0, "NooliteF":2}
module.exports = NooliteBase;
