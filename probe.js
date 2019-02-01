const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0',{autoOpen:true});
const parser = port.pipe(new SerialPort.parsers.ByteLength({length: 17}));


const MTRF64Controller = require('./MTRF64Controller');
const RemoteControl = require('./RemoteControl');
const Relay = require('./Relay');

let controller = new MTRF64Controller(port,parser);

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
function DoorSensorProbe() {

    let device = new DoorSensor(controller,1);

//device.bind();
    controller.register(device);
}

function RelayBindProbe() {
    let device = new Relay(controller,1,Relay.Mode.Noolite);
    device.bind();
   // port.close();
}

port.on('open', () => {
    RelayBindProbe();
})

