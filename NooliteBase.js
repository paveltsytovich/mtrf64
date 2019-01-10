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
        command.ch = this.channel;
        command.cmd = NooliteBase.Command.Bind;
        this.adapter.send(command);
        if(mode == NooliteBase.Mode.NooliteF) {
        const receiveCommand = await this.adapter.receive();
        return receiveCommand.ctr === 3;
        }
        else
           return true;
    }
    async unbind(mode) {
        const command = new MTRF64Command();
        command.mode = mode;
        command.ch = this.channel;
        command.cmd = NooliteBase.Command.Unbind;
        this.adapter.send(command);
        if(mode == NooliteBase.Mode.NooliteF) {
         const receiveCommand = await this.adapter.receive();
        return receiveCommand.ctr === 0;
        }
        else
            return true;
    }
}
NooliteBase.Mode = {"Noolite":0, "NooliteF":2}
NooliteBase.Command = {"Bind":15,"Unbind":9}
module.exports = NooliteBase;
