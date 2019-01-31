const MTRF64Adapter = require('./MTRF64Adapter');
const MTRF64Command = require('./MTRF64Command');
const RemoteControllerNooliteDevice = require('./RemoteControl');

function _fireReceive(registry, command) {
    for(let d of registry) {
        if(!d)
         continue;
        if(d.channel == command.ch) {
            d._onAnswer(command);
            return true;
        }
    }
    return false;
  }

class MTRF64Controller {
   
  _onSend(command) {

  }
  
  _onReceive(command) {

    if(_fireReceive(MTRF64Controller._sendingRegistry,command)) {
        delete MTRF64Controller._sendingRegistry[command.ch];
    }
    _fireReceive(MTRF64Controller._registry,command);
  }
  constructor(port,parser) {
    this._adapter = new MTRF64Adapter(port,this._onSend,this._onReceive,parser);
    this._sendingRegistry = [ ];
    MTRF64Controller._sendingRegistry = [ ];
    MTRF64Controller._registry = [ ];
    this._adapter.listen();
    MTRF64Controller.self = this;
  }
  send(device,command,ack = true) {
      if(!command || !(command instanceof MTRF64Command))
       throw Error("Bad parameter type");
      if(ack)
        MTRF64Controller._sendingRegistry[command.ch] = device;
      this._adapter.send(command);
      if(device._onSend)
       device._onSend(command);
      if(this._onSend) {
        this._onSend(command);
      }
  }
  register(device) {
      if(!device || !(device instanceof RemoteControllerNooliteDevice))
       throw Error('Bad type for register')
    MTRF64Controller._registry[device.channel] = device;
    return true;
  }
}

module.exports = MTRF64Controller;