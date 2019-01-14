class NooliteDevice {
    defaultCommandHandler(command) {
        
    }

    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite,onCommand=NooliteDevice.defaultCommandHandler) {
        this._channel = channel;
        this._adapter = adapter;
        this.onCommand = onCommand;
    }
    get channel () {
        return this._channel;
    }
}

NooliteDevice.Mode = {"Noolite": 0, "NooliteF": 2};
module.exports  = NooliteDevice;