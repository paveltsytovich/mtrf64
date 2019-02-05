const NooliteDevice = require('./NooliteDevice');
const Command = require('./MTRF64Command');


class Relay extends NooliteDevice {
    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite) {

        super(adapter,channel,mode);
        this._id = null;
    }
    async _processCommand(cmd,ctr,d0) {
        const command = new Command();
        command.mode = this.mode == NooliteDevice.Mode.NooliteF ? 2 : 0;
        command.ch = this.channel;
        command.cmd = cmd;
        if (ctr == Relay.Command.Broadcast)
            command.ctr = 1;
        else if (ctr == Relay.Command.ByID) {
            command.ctr = 8;
            command.id = this._id;
        }
        if (d0) {
            command.setData(0,d0);
        }
        var answer = await this._processTransaction(command);
        return (answer.mode == 2 && answer.ctr == 0) || (answer.mode == 0 && answer.cmd == cmd);
    }
    async bind() {
        const command  = new Command();
        command.mode = this.mode == NooliteDevice.Mode.NooliteF ? 2 : 0;
        command.cmd = 15;
        command.ch = this.channel;
        var answer = await this._processTransaction(command);
        
        if(answer.mode == 2 && answer.cmd == 130 && answer.ctr == 3) {
            this._id = answer.id.slice();
            return true;
        }
        else return (answer.mode == 0 && answer.cmd == 15 && answer.ctr == 0);
    }
    async unbind() {
        const command = new Command();
        command.mode = this.mode == NooliteDevice.Mode.NooliteF ? 2 : 0;
        command.cmd = 9;
        command.ch = this.channel;
        var answer = await this._processTransaction(command);
        
        return (answer.mode == 2 && answer.ctr == 0) || (answer.mode == 0 && answer.cmd == 9);
    }
    async turnOn(ctr = 0) {
        return await this._processCommand(2,ctr);  
    }
    async turnOff(ctr = 0) {
        return await this._processCommand(0,ctr);  
    }
    async switch(ctr = 0) {
        return await this._processCommand(4,ctr); 
    }
    async brightDown(ctr = 0) {
        return await this._processCommand(1,ctr);
    }
    async brightUp(ctr = 0) {
        return await this._processCommand(3,ctr);
    }
    async setBrightness(brightness,ctr = 0) {
        let value = brightness;
        if (brightness >= 1)
          value = 155;
        else if(brightness <= 0) 
        value = 0;
        return await this._processCommand(6,ctr,35 + Math.trunc(120 * value + 0.5));
    }
    async loadPreset(ctr = 0) {
        return await this._processCommand(7,ctr);
    }
    async savePreset(ctr = 0) {
        return await this._processCommand(8,ctr);
    }
    async stopReq(ctr = 0) {
        return await this._processCommand(10,ctr);
    }
    brightStepDown(step,crt = 0) {
        throw Error('Not implemented');
    }
    brightStepUp(step,ctr = 0) {
        throw Error('Not implemented');
    }
    brightReq(direction,speed,ctr = 0) {
        throw Error('Not implemented');
    }
    async rollColour(ctr = 0) {
        return await this._processCommand(16,ctr);
    }
    async switchColour(crt = 0) {
        return await this._processCommand(17,ctr);
    }
    async switchMode(ctr = 0) {
        return await this._processCommand(18,ctr);
    }
    async speedModeBack(ctr = 0) {
        return await this._processCommand(19,ctr);
    }
    temporaryOn(time,ctr = 0) {
        throw Error('Not implemented');
    }
    readState(ctr = 0) {
        throw Error('Not implemented');
    }
}

Relay.Command = {"Normal" : 0 , "Broadcast" : 1, "ByID" : 2};
Relay.Direction  = {"Up": 1, "Down" : 2};

module.exports = Relay