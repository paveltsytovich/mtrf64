const NooliteDevice = require('./NooliteDevice');
const Command = require('./MTRF64Command');


class Relay extends NooliteDevice {
    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite) {

        super(adapter,channel,mode);
        this._id = null;
    }
    async bind() {
        const command  = new Command();
        command.mode = this.mode == NooliteDevice.Mode.NooliteF ? 2 : 0;
        command.cmd = 15;
        command.ch = this.channel;
        var answer = await this._processTransaction(command);
        // await ( () => {
        //     return new Promise((resolve) => {
        //         this._unlock = resolve;
        //     this._controller.send(this,command);
        //     });
        // })();
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
        // await ( () => {
        //     return new Promise((resolve) => {
        //         this._unlock = resolve;
        //     this._controller.send(this,command);
        //     });
        // })();
        return (answer.mode == 2 && answer.ctr == 0) || (answer.mode == 0 && answer.cmd == 9);
    }
    turnOn(broadcast = false) {
        throw Error('Not implemented');
    }
    turnOff(broadcast = false) {
        throw Error('Not implemented');
    }
    brightDown(broadcast = false) {
        throw Error('Not implemented');
    }
    brightUp(broadcast = false) {
        throw Error('Not implemented');
    }
    setBrightness(brightness,broadcast = false) {
        throw Error('Not implemented');
    }
    loadPreset(broadcast = false) {
        throw Error('Not implemented');
    }
    savePreset(broadcast = false) {
        throw Error('Not implemented');
    }
    stopReq(broadcast = false) {
        throw Error('Not implemented');
    }
    brightStepDown(step,broadcast = false) {
        throw Error('Not implemented');
    }
    brightStepUp(step,broadcast = false) {
        throw Error('Not implemented');
    }
    brightReq(direction,speed,broadcast = false) {
        throw Error('Not implemented');
    }
    rollColour(broadcast = false) {
        throw Error('Not implemented');
    }
    switchColour(broadcast = false) {
        throw Error('Not implemented');
    }
    switchMode(broadcast = false) {
        throw Error('Not implemented');
    }
    speedModeBack(broadcast = false) {
        throw Error('Not implemented');
    }
    temporaryOn(time,broadcast = false) {
        throw Error('Not implemented');
    }
    readState(broadcast = false) {
        throw Error('Not implemented');
    }
}

module.exports = Relay