
class NooliteDevice {

    _onAnswer(command) {
        
    }
    onCommand(command) {

    }
   
    bind() {
        throw Error('Not implemented');
    }
    unbind() {
        throw Error('Not implemented');
    }
    service() {
        throw Error('Not implemented');
    }
    clearMemory() {
        throw Error('Not implemented');
    }
    constructor(controller,channel,mode = NooliteDevice.Mode.Noolite) {
        this._channel = channel;
        this._controller = controller;
    }
    get channel () {
        return this._channel;
    }
}

NooliteDevice.Mode = {"Noolite": 0, "NooliteF": 2};
module.exports  = NooliteDevice;