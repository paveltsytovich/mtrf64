const MTRF64Adapter = require('./MTRF64Adapter');

class MTRF64Controller {
  _onSend() {

  }
  _onReceive() {

  }
  constructor(port) {
    this._adapter = new MTRF64Adapter(port,this._onSend,this._onReceive);
    this._sendingRegistry = [ ];
    this._registry = [ ];
  }
}

module.exports = MTRF64Controller;