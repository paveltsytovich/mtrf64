class NooliteDevice {
    defaultCommandHandler(command) {

    }

    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite,onCommand=NooliteDevice.defaultCommandHandler) {
        this._channel = channel;
        this._adapter = adapter;
        this.onCommand = onCommand;

        this.onLowBattery = null;
        this.onTurnOn = null;
        this.onTurnOff = null
        this.onSwitch = null;
        this.onRoll_Colour = null;
        this.onSwitch_Colour = null;
        this.onSend_State = null;
    }
    get channel () {
        return this._channel;
    }
    
}

NooliteDevice.Mode = {"Noolite": 0, "NooliteF": 2};
module.exports  = NooliteDevice;