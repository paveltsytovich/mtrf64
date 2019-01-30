const NooliteDevice = require('./NooliteDevice');
class RemoteControlNooliteDevice extends NooliteDevice {
    bind() {

    }
    unBind() {
        
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