const NooliteDevice = require('./NooliteDevice');
const Command = require('./MTRF64Command');


class Relay extends NooliteDevice {
    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite) {

        super(adapter,channel,mode);
        this._id = null;
    }
    async _processCommand(cmd,ctr) {
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
    brightDown(crt = 0) {
        throw Error('Not implemented');
    }
    brightUp(crt = 0) {
        throw Error('Not implemented');
    }
    setBrightness(brightness,crt = 0) {
        throw Error('Not implemented');
    }
    loadPreset(crt = 0) {
        throw Error('Not implemented');
    }
    savePreset(crt = 0) {
        throw Error('Not implemented');
    }
    stopReq(crt = 0) {
        throw Error('Not implemented');
    }
    brightStepDown(step,crt = 0) {
        throw Error('Not implemented');
    }
    brightStepUp(step,crt = 0) {
        throw Error('Not implemented');
    }
    brightReq(direction,speed,crt = 0) {
        throw Error('Not implemented');
    }
    rollColour(crt = 0) {
        throw Error('Not implemented');
    }
    switchColour(crt = 0) {
        throw Error('Not implemented');
    }
    switchMode(crt = 0) {
        throw Error('Not implemented');
    }
    speedModeBack(crt = 0) {
        throw Error('Not implemented');
    }
    temporaryOn(time,crt = 0) {
        throw Error('Not implemented');
    }
    readState(crt = 0) {
        throw Error('Not implemented');
    }
}

Relay.Command = {"Normal" :0 , "Broadcast" : 1, "ByID" : 2};

module.exports = Relay