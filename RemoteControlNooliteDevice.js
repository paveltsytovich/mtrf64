const NooliteDevice = require('./NooliteDevice');
const Command = require('./MTRF64Command');

class RemoteControlNooliteDevice extends NooliteDevice {
    
    async bind() {
     var cmd = new Command();
     cmd.ch = this.channel;
     cmd.ctr = 3;
     cmd.mode = 1;
     var answer = 
     await(()=> {
        return new Promise((resolve) => {
            this._unlock = resolve;
            this._controller.send(this,cmd);
        })
     })();
     return true; //temporary
    }
    unBind() {
        throw Error('Not implemented');
    }
    _onAnswer(command) {
        if(this._unlock) {
            this._unlock(command);
        }
    }
    onLowBattery(command) {
    }
    constructor(controller,channel,mode = NooliteDevice.Mode.Noolite) {

        super(controller,channel,mode);
        this._unlock = null;
    }
    onSensTempHumi(command) {

    }
    onSendState(command) {

    }
}

module.exports  = RemoteControlNooliteDevice;