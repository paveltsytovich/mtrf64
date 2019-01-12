class NooliteDevice {
    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite) {
        this._channel = channel;
        this._adapter = adapter;
        this.OnCommand = null;
    }
    get channel () {
        return this._channel;
    }
}

NooliteDevice.Mode = {"Noolite": 0, "NooliteF": 2};
module.exports  = NooliteDevice;