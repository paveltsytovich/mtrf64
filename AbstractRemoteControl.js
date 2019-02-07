/**
 * Implement Noolite Remote Control device
 * 
 * @copyright Pavel Tsytovich, 2019
 * 
 */
const NooliteDevice = require('./NooliteDevice');
const Command = require('./MTRF64Command');

class AbstractRemoteControl extends NooliteDevice {
   /**
    *  Constuctor
    * @param {MTRF64Controller} controller - controller for manage device
    * @param {number} channel - channel of device
    * @param {Noolite.Mode.Noolite | NooliteDevice.Mode.NooliteF} mode - Mode of Noolite-F protocol
    */ 
    constructor(controller,channel,mode = NooliteDevice.Mode.Noolite) {

        super(controller,channel,mode);
        this._unlock = null;
    }
    /**
     * Bind command for RemoteControl device
     * @returns {boolean} - True if bind is successul, otherwise - fail
     */
    async bind() {
     var command = new Command();
     command.ch = this.channel;
     command.ctr = 3;
     command.mode = this.mode == NooliteDevice.Mode.Noolite? 1 : 3;
     var answer = await this._processTransaction(command);
    
     return answer.mode == 1 && answer.ctr == 0 && answer.togl == 2 && answer.cmd == 15;
    }
    /**
     * Unbind command for RemoteControl device
     * @returns {boolean} - True if bind is successul, otherwise - fail
     */
    unbind() {
       var cmd = new Command();
       cmd.mode = this.mode == NooliteDevice.Mode.Noolite? 1 : 3;
       cmd.cmd = 0;
       cmd.ch = this.channel;
       cmd.ctr = 5;
       this._controller.send(this,cmd,false);
    }
}

module.exports  = AbstractRemoteControl;