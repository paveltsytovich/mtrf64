const MTRF64Adapter = require('./MTRF64Adapter');
const MTRF64Command = require('./MTRF64Command');
const RemoteControllerNooliteDevice = require('./RemoteControlNooliteDevice');

class MTRF64Controller {
   
  _onSend(command) {

  }
  _onReceive(command) {

    for(var d of MTRF64Controller._sendingRegistry) {
        if(!d)
         continue;
        if(d.channel == command.ch) {
            d._onAnswer(command);
            delete MTRF64Controller._sendingRegistry[d.channel];
            return;
        }
    }
  }
  constructor(port) {
    this._adapter = new MTRF64Adapter(port,this._onSend,this._onReceive);
    this._sendingRegistry = [ ];
    MTRF64Controller._sendingRegistry = [ ];
    MTRF64Controller._registry = [ ];
    this._adapter.listen();
    MTRF64Controller.self = this;
  }
  send(device,command) {
      if(!command || !(command instanceof MTRF64Command))
       throw Error("Bad parameter type");
      MTRF64Controller._sendingRegistry[command.ch] = device;
      this._adapter.send(command);
  }
  register(device) {
      if(!device || !(device instanceof RemoteControllerNooliteDevice))
       throw Error('Bad type for register')
    MTRF64Controller._registry[device.channel] = device;
    return true;
  }
}

module.exports = MTRF64Controller;