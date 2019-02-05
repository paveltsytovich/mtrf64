const NooliteDevice = require('./NooliteDevice');
const Command = require('./MTRF64Command');

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
    constructor(adapter,channel,mode = NooliteDevice.Mode.Noolite) {

        super(adapter,channel,mode);
        this._id = null;
    }
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
    async unbind() {
        const command = new Command();
        command.mode = this.mode == NooliteDevice.Mode.NooliteF ? 2 : 0;
        command.cmd = 9;
        command.ch = this.channel;
        var answer = await this._processTransaction(command);
        
        return (answer.mode == 2 && answer.ctr == 0) || (answer.mode == 0 && answer.cmd == 9);
    }
    async turnOn(ctr = 0) {
        return await this._processCommand(2,ctr);  
    }
    async turnOff(ctr = 0) {
        return await this._processCommand(0,ctr);  
    }
    async switch(ctr = 0) {
        return await this._processCommand(4,ctr); 
    }
    async brightDown(ctr = 0) {
        return await this._processCommand(1,ctr);
    }
    async brightUp(ctr = 0) {
        return await this._processCommand(3,ctr);
    }
    async setBrightness(brightness,ctr = 0) {
        let value = brightness;
        if (brightness >= 1)
          value = 155;
        else if(brightness <= 0) 
        value = 0;
        return await this._processCommand(6,ctr,35 + Math.trunc(120 * value + 0.5));
    }
    async setColor(r,g,b,ctr = 0) {
        return await this._processCommand(6,ctr,_convertColor(r),_convertColor(g),
                                                                    _convertColor(b));
    }
    async loadPreset(ctr = 0) {
        return await this._processCommand(7,ctr);
    }
    async savePreset(ctr = 0) {
        return await this._processCommand(8,ctr);
    }
    async stopReq(ctr = 0) {
        return await this._processCommand(10,ctr);
    }
    async brightStepDown(step,ctr = 0) {
        if (step < 0 )
         return;

         return await this._processCommand(11,ctr,step);
    }
    async brightStepUp(step,ctr = 0) {
        if (step < 0 )
        return;

        return await this._processCommand(12,ctr,step);
    }
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
    async rollColour(ctr = 0) {
        return await this._processCommand(16,ctr);
    }
    async switchColour(crt = 0) {
        return await this._processCommand(17,ctr);
    }
    async switchMode(ctr = 0) {
        return await this._processCommand(18,ctr);
    }
    async speedModeBack(ctr = 0) {
        return await this._processCommand(19,ctr);
    }
    temporaryOn(time,ctr = 0) {
        throw Error('Not implemented');
    }
    readState(info = 0,ctr = 0) {
        throw Error('Not implemented');
    }
}

Relay.Command = {"Normal" : 0 , "Broadcast" : 1, "ByID" : 2};
Relay.Direction  = {"Up": 1, "Down" : 2};

module.exports = Relay