const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0',{autoOpen:true});
const parser = port.pipe(new SerialPort.parsers.ByteLength({length: 17}));


const MTRF64Controller = require('./MTRF64Controller');
const RemoteControl = require('./RemoteControl');


class DoorSensor extends RemoteControl {
    constructor(controller,channel) {
        super(controller,channel,DoorSensor.Mode.Noolite);
    }
    onTurnOn() {
        console.log("door is open");
    }
    onTurnOff() {
        console.log("door is closed");
    }
}

let controller = new MTRF64Controller(port,parser);


let device = new DoorSensor(controller,1);

//device.bind();
controller.register(device);
