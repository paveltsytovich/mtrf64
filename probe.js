const { RemoteControlHandler: RemoteControl } = require("./RemoteControl");

const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0',{autoOpen:true});
const parser = port.pipe(new SerialPort.parsers.ByteLength({length: 17}));


const MTRF64Controller = require('./MTRF64Controller');
const RemoteControl = require('./AbstractRemoteControl');

let controller = new MTRF64Controller(port,parser);


let device = new RemoteControlHandler(controller,1,RemoteControl.Mode.Noolite);

//device.bind();
controller.register(device);
