const NooliteDevice = require('./NooliteDevice')

class RelayNooliteDevice extends NooliteDevice {
    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite) {

        super(adapter,channel,mode)
        }
    turnOn() {
        throw Error('Not implemented');
    }
    turnOff() {
        throw Error('Not implemented');
    }
    brightDown() {

    }
    brightUp() {

    }
    setBrightness(brightness) {

    }
    loadPreset() {

    }
    savePreset() {

    }
    stopReq() {

    }
    brightStepDown(step) {

    }
    brightStepUp(step) {

    }
    brightReq(direction,speed) {

    }
    RollColour() {

    }
    switchColour() {

    }
    switchMode() {

    }
    speedModeBack() {

    }
    temporaryOn(time) {

    }
    readState() {
        
    }
}