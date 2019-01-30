const NooliteDevice = require('./NooliteDevice');
class RemoteControlNooliteDevice extends NooliteDevice {
    onLowBattery(command) {
    }
    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite) {

        super(adapter,channel,mode);
    }
    onTurnOn(command) {

    }
    onTurnOff(command) {

    }
    onSwitch(command) {

    }
    onRoll_Colour(command) {

    }
    onSwitch_Colour(command) {

    }
    onSend_State(command) {

    }
}

module.exports  = RemoteControlNooliteDevice;