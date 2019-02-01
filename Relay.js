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
        var answer = await ( () => {
            return new Promise((resolve) => {
                this._unlock = resolve;
            this._controller.send(this,command);
            });
        })();
        if(answer.mode == 2 && answer.cmd == 130 && answer.ctr == 3) {
            this._id = answer.id.slice();
            return true;
        }
        else return (answer.mode == 0 && answer.cmd == 15 && answer.ctr == 0);
    }
    unbind() {
        throw Error('Not implemented');
    }
    turnOn() {
        throw Error('Not implemented');
    }
    turnOff() {
        throw Error('Not implemented');
    }
    brightDown() {
        throw Error('Not implemented');
    }
    brightUp() {
        throw Error('Not implemented');
    }
    setBrightness(brightness) {
        throw Error('Not implemented');
    }
    loadPreset() {
        throw Error('Not implemented');
    }
    savePreset() {
        throw Error('Not implemented');
    }
    stopReq() {
        throw Error('Not implemented');
    }
    brightStepDown(step) {
        throw Error('Not implemented');
    }
    brightStepUp(step) {
        throw Error('Not implemented');
    }
    brightReq(direction,speed) {
        throw Error('Not implemented');
    }
    rollColour() {
        throw Error('Not implemented');
    }
    switchColour() {
        throw Error('Not implemented');
    }
    switchMode() {
        throw Error('Not implemented');
    }
    speedModeBack() {
        throw Error('Not implemented');
    }
    temporaryOn(time) {
        throw Error('Not implemented');
    }
    readState() {
        throw Error('Not implemented');
    }
}

module.exports = Relay