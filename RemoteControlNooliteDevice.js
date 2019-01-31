const NooliteDevice = require('./NooliteDevice');
const Command = require('./MTRF64Command');

class RemoteControlNooliteDevice extends NooliteDevice {
    
    async bind() {
     var cmd = new Command();
     cmd.ch = this.channel;
     cmd.ctr = 3;
     cmd.mode = this.mode == NooliteDevice.Mode.Noolite? 1 : 3;
     var answer = 
     await(()=> {
        return new Promise((resolve) => {
            this._unlock = resolve;
            this._controller.send(this,cmd);
        })
     })();
     return answer.mode == 1 && answer.ctr == 0 && answer.togl == 2 && answer.cmd == 15;
    }
    unbind() {
       var cmd = new Command();
       cmd.mode = this.mode == NooliteDevice.Mode.Noolite? 1 : 3;
       cmd.cmd = 0;
       cmd.ch = this.channel;
       cmd.ctr = 5;
       this._controller.send(this,cmd,false);
    }
   
    onLowBattery(command) {
    }
    onSensTempHumi(command) {

    }
    onSendState(command) {

    }
    constructor(controller,channel,mode = NooliteDevice.Mode.Noolite) {

        super(controller,channel,mode);
        this._unlock = null;
    }
    
}

module.exports  = RemoteControlNooliteDevice;