/**
 * Implement Relay device for Noolite-F protocol
 * @copyright Pavel Tsytovich, 2019
 */

const NooliteDevice = require('./NooliteDevice');
const Command = require('./MTRF64Command');
/**
 * Convert from float to rgb color. Do not use this function directly
 * @param {float} bright 
 */
function _convertColor(bright) {
    let value;
    if (bright >= 1)
     value = 255;
    else if (bright <= 0)
          value = 0;
          else  
            value = Math.trunc(255* bright + 0.5);
    return value;
}

class Relay extends NooliteDevice {
    /**
     * Constructor
     * @param {MTRF64Controller} controller - controller for manage device
     * @param {number} channel - device channel
     * @param {NooliteDevice.Mode} mode - Noolite protocol mode 
     */
    constructor(controller,channel,mode = NooliteDevice.Mode.Noolite) {

        super(controller,channel,mode);
        this._id = null;
    }
    /**
     * Processing send command. Do bot use this method directly
     * @param {MTRF64Command} cmd - sending command
     * @param {Relay.Command} ctr - control flag parameter in Noolite-F protocol
     * @returns {boolean} - True if transation is completed, otherwise - false
     */
    async _processCommand(cmd,ctr) {
        const command = new Command();
        command.mode = this.mode == NooliteDevice.Mode.NooliteF ? 2 : 0;
        command.ch = this.channel;
        command.cmd = cmd;
        if (ctr == Relay.Command.Broadcast)
            command.ctr = 1;
        else if (ctr == Relay.Command.ByID) {
            command.ctr = 8;
            command.id = this._id;
        }
        for(let i = 2; i < arguments.length; i++) {
            command.setData(i-2,arguments[i]);
        }
        var answer = await this._processTransaction(command);
        return (answer.mode == 2 && answer.ctr == 0) || (answer.mode == 0 && answer.cmd == cmd);
    }
    /**
     * Bind command for Relay device
     * @returns {boolean} - True if command successful, otherwise false
     */
    async bind() {
        const command  = new Command();
        command.mode = this.mode == NooliteDevice.Mode.NooliteF ? 2 : 0;
        command.cmd = 15;
        command.ch = this.channel;
        var answer = await this._processTransaction(command);
        
        if(answer.mode == 2 && answer.cmd == 130 && answer.ctr == 3) {
            this._id = answer.id.slice();
            return true;
        }
        else return (answer.mode == 0 && answer.cmd == 15 && answer.ctr == 0);
    }

    /**
     * Unbind command for Relay device
     * @returns {boolean} - True if command successful, otherwise false
     */
    async unbind() {
        const command = new Command();
        command.mode = this.mode == NooliteDevice.Mode.NooliteF ? 2 : 0;
        command.cmd = 9;
        command.ch = this.channel;
        var answer = await this._processTransaction(command);
        
        return (answer.mode == 2 && answer.ctr == 0) || (answer.mode == 0 && answer.cmd == 9);
    }

    /**
     * Turn on command for Relay device
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async turnOn(ctr = 0) {
        return await this._processCommand(2,ctr);  
    }
    /**
     * Turn off command for Relay device
     * 
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async turnOff(ctr = 0) {
        return await this._processCommand(0,ctr);  
    }
    /**
     * Switch command for Relay device
     * 
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async switch(ctr = 0) {
        return await this._processCommand(4,ctr); 
    }
    /**
     * Bright Down command
     * 
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async brightDown(ctr = 0) {
        return await this._processCommand(1,ctr);
    }
    /**
     * Bright Up command
     * @param {Relay.Command} ctr 
     * @returns {boolean} - True if command successful, otherwise false
     */
    async brightUp(ctr = 0) {
        return await this._processCommand(3,ctr);
    }
    /**
     * Set Brightness command
     * 
     * @param {float} brightness - Brightness. (from 0 to 1)
     * @param {*} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async setBrightness(brightness,ctr = 0) {
        let value = brightness;
        if (brightness >= 1)
          value = 155;
        else if(brightness <= 0) 
        value = 0;
        return await this._processCommand(6,ctr,35 + Math.trunc(120 * value + 0.5));
    }
    /**
     * Set Brightness command for RGB controller
     * 
     * @param {float} r - red colour
     * @param {float} g - green colour
     * @param {float} b - blue colour
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async setColor(r,g,b,ctr = 0) {
        return await this._processCommand(6,ctr,_convertColor(r),_convertColor(g),
                                                                    _convertColor(b));
    }
    /**
     * Load Preset command
     * 
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async loadPreset(ctr = 0) {
        return await this._processCommand(7,ctr);
    }
    /**
     * Save preset command
     * 
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async savePreset(ctr = 0) {
        return await this._processCommand(8,ctr);
    }
    /**
     * Stop Req command
     * 
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async stopReq(ctr = 0) {
        return await this._processCommand(10,ctr);
    }
    /**
     * Bright Step Down command
     * 
     * @param {number} step - step of brihtness down
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async brightStepDown(step,ctr = 0) {
        if (step < 0 )
         return;

         return await this._processCommand(11,ctr,step);
    }
    /**
     * Brigth Step Up command
     * 
     * @param {number} step - step of brightness up
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async brightStepUp(step,ctr = 0) {
        if (step < 0 )
        return;

        return await this._processCommand(12,ctr,step);
    }
    /**
     * Bright Req command
     * 
     * @param {Relay.Direction} direction - Direction of change brightness
     * @param {float} speed - speed of change Brightness (from 0 to 1)
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async brightReq(direction,speed,ctr = 0) {
        let value;
        if (speed >= 1)
         value = 127;
        else if(speed <= 0)
               value = 0;
              else 
                  value = Math.trunc(speed * 127 + 0.5);
        if(direction == Relay.Direction.Down) 
          value = -value - 1;
        return await this._processCommand(13,ctr,value & 0xFF);  
    }
    /**
     * Roll Colour command
     * 
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async rollColour(ctr = 0) {
        return await this._processCommand(16,ctr);
    }
    /**
     * Switch Colour command
     * 
     * @param {Relay.Command} crt - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async switchColour(crt = 0) {
        return await this._processCommand(17,ctr);
    }
    /**
     * Switch Mode command
     * 
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async switchMode(ctr = 0) {
        return await this._processCommand(18,ctr);
    }
    /**
     * Speed Mode Back command
     * 
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async speedModeBack(ctr = 0) {
        return await this._processCommand(19,ctr);
    }
    /**
     * Temporary On command
     * 
     * @param {integer} time - time in 5 sec interval
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {boolean} - True if command successful, otherwise false
     */
    async temporaryOn(time,ctr = 0) {
        if(this.Mode != Relay.Mode.NooliteF && time <= 0)
         return false;
         const command = new Command();
         command.mode =  2;
         command.cmd = 25;
         command.ch = this.channel;
         if(time <= 255) {
          command.setData(0,time)
          command.fmt = 5;
         }
         else {
             command.setData(0,255);
             command.setData(1,time - 255);
             command.fmt = 6;
         }
         var answer = await this._processTransaction(command);
        
        return (answer.mode == 2 && answer.ctr == 0);
    }
    /**
     * Read State command
     * 
     * @param {number} info - set info bit. (See Noolite-F protocol)
     * @param {Relay.Command} ctr - Broadcast mode
     * @returns {*} - Object with fmt and data property if successful, otherwise - false
     */
    async readState(info = 0,ctr = 0) {
        if(this.mode == Relay.Mode.Noolite)
         return false;

        const command = new Command();
        command.mode =  2;
        command.cmd = 128;
        command.ch = this.channel;
        command.fmt = info;
        var answer = await this._processTransaction(command);
        if(answer.cmd == 130) 
         return {fmt : answer.fmt, data : answer.d };
        else
            return false;        
    }
}

Relay.Command = {"Normal" : 0 , "Broadcast" : 1, "ByID" : 2};
Relay.Direction  = {"Up": 1, "Down" : 2};

module.exports = Relay