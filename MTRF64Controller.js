/**
 * @copyright Pavel Tsytovich, 2019
 * 
 * Implement MTRF64 controller
 */


const MTRF64Adapter = require('./MTRF64Adapter');
const MTRF64Command = require('./MTRF64Command');
const RemoteControllerNooliteDevice = require('./AbstractRemoteControl');
/**
 * Internal function for handle answer from serial port. Do not use directly
 * @param {Array} registry -  registry of sending device objects
 * @param {MTRF64Command} command - received command from serial port
 */
function _fireReceive(registry, command) {
    for(let d of registry) {
        if(!d)
         continue;
        if(d.channel == command.ch) {
            d.onCommand(command);
            return true;
        }
    }
    return false;
  }

class MTRF64Controller {
   /**
    * Callback method for internal use only. Do not use directly
    * @param {MTRF64Command} command - MTRF64 answer command
    */
  _onSend(command) {

  }
  /**
   * Callback method after receive some answer from serial port. Internal use only
   * @param {MTRF64Command} command 
   */
  _onReceive(command) {

    if(_fireReceive(MTRF64Controller._sendingRegistry,command)) {
        delete MTRF64Controller._sendingRegistry[command.ch];
    }
    else //fix #1737
        _fireReceive(MTRF64Controller._registry,command);
  }
  /**
   * Constructor of class
   * @param {Object} port - The `SerialPort` object for sending data to serial port
   * @param {Object} parser - The `SerialPort` object for receive data from serial port
   */
  constructor(port,parser) {
    this._adapter = new MTRF64Adapter(port,this._onSend,this._onReceive,parser);
    this._sendingRegistry = [ ];
    MTRF64Controller._sendingRegistry = [ ];
    MTRF64Controller._registry = [ ];
    this._adapter.listen();
    MTRF64Controller.self = this;
  }
  /**
   * Send command to adapter
   * @param {Object} device - The Device that sends the command
   * @param {MTRF64Command} command - Command from device
   * @param {boolean} ack - Does the method need to wait for response to the command? 
   */
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
  /**
   * Register device in controller
   * @param {AbstractRemoteControl} device 
   */
  register(device) {
      if(!device || !(device instanceof RemoteControllerNooliteDevice))
       throw Error('Bad type for register')
    MTRF64Controller._registry[device.channel] = device;
    return true;
  }
}

module.exports = MTRF64Controller;