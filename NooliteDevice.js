
class NooliteDevice {

    onCommand(command) {
        if(this._unlock) {
            this._unlock(command);
            this._unlock = null;
        }        
    }
    _onSend(command) {

    }
    
    _processTransaction(command) {
        return new Promise((resolve) => {
                this._unlock = resolve;
                this._controller.send(this,command);
            });         
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
        this._unlock = null;
        this._mode = mode
    }
    get mode() {
        return this._mode;
    }
    get channel () {
        return this._channel;
    }
}

NooliteDevice.Mode = {"Noolite": 0, "NooliteF": 2};
module.exports  = NooliteDevice;