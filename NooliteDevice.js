
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
                                devType = NooliteDevice.DeviceType.Incoming) {
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
NooliteDevice.DeviceType = {"Outgoing": 0 ,"Incoming": 2}
module.exports  = NooliteDevice;