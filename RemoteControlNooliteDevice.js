const NooliteDevice = require('./NooliteDevice');
class RemoteControlNooliteDevice extends NooliteDevice {
    bind() {
        throw Error('Not implemented');
    }
    unBind() {
        throw Error('Not implemented');
    }
    _onAnswer(command) {
        
    }
    onLowBattery(command) {
    }
    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite) {

        super(adapter,channel,mode);
    }
    onSensTempHumi(command) {

    }
    onSendState(command) {

    }
}

module.exports  = RemoteControlNooliteDevice;