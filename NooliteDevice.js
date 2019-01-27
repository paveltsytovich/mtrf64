
class NooliteDevice {
    onCommand(command) {

    }
    onLowBattery(command) {

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

    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite) {
        this._channel = channel;
        this._adapter = adapter;
    }
    get channel () {
        return this._channel;
    }
    
}

NooliteDevice.Mode = {"Noolite": 0, "NooliteF": 2};
module.exports  = NooliteDevice;