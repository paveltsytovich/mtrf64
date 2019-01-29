
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

    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite,
                                devType = NooliteDevice.DeviceType.Console) {
        this._channel = channel;
        this._adapter = adapter;
        this._deviceType = devType;
    }
    get channel () {
        return this._channel;
    }
    get deviceType() {
        return this._deviceType;
    }
    
}

NooliteDevice.Mode = {"Noolite": 0, "NooliteF": 2};
NooliteDevice.DeviceType = {"Relay": 0 ,"Console": 2}
module.exports  = NooliteDevice;