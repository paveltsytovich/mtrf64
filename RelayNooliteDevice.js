const NooliteDevice = require('./NooliteDevice')

class RelayNooliteDevice extends NooliteDevice {
    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite) {

        super(adapter,channel,mode)
    }
    bind() {
        throw Error('Not implemented');
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

module.exports = RelayNooliteDevice