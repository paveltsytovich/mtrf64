
class NooliteDevice {
    onCommand(command) {

    }
   
    bind() {
        throw Error('Not implemented');
    }
    unbind() {
        throw Error('Not implemented');
    }
    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite,
                                ) {
        this._channel = channel;
        this._adapter = adapter;
    }
    get channel () {
        return this._channel;
    }
    get deviceType() {
        return this._deviceType;
    }
    
}

NooliteDevice.Mode = {"Noolite": 0, "NooliteF": 2};
module.exports  = NooliteDevice;