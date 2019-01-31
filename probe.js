const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0',{autoOpen:true});
const parser = port.pipe(new SerialPort.parsers.ByteLength({length: 17}));


const MTRF64Controller = require('./MTRF64Controller');
const RemoteControl = require('./RemoteControlNooliteDevice');

let controller = new MTRF64Controller(port,parser);


let device = new RemoteControl(controller,1,RemoteControl.Mode.Noolite);

device.bind();
