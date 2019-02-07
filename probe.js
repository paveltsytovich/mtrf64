const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0',{autoOpen:true});
const parser = port.pipe(new SerialPort.parsers.ByteLength({length: 17}));


const MTRF64Controller = require('./MTRF64Controller');
const RemoteControl = require('./RemoteControl');
const Relay = require('./Relay');

let controller = new MTRF64Controller(port,parser);
let relay = new Relay(controller,3,Relay.Mode.Noolite);

class DoorSensor extends RemoteControl {
    constructor(controller,channel) {
        super(controller,channel,DoorSensor.Mode.Noolite);
    }
    onTurnOn() {
        console.log("door is open");
        relay.brightReq(Relay.Direction.Up,0.1);
    }
    onTurnOff() {
        console.log("door is closed");
        relay.brightReq(Relay.Direction.Down,0.1);
    }
}
function DoorSensorProbe() {

    let device = new DoorSensor(controller,1);

//device.bind();
    controller.register(device);
}

async function RelayBindProbe() {
    let device = new Relay(controller,3,Relay.Mode.Noolite);
    console.log(await device.bind());
    //device = new Relay(controller,2,Relay.Mode.Noolite);
    //console.log(await device.bind());
    //port.close();
}
async function RelayUnbindProbe() {
    let device = new Relay(controller,1,Relay.Mode.Noolite);
    console.log(await device.unbind());
}
async function ElementaryCommandProbe() {
    let device = new Relay(controller,3,Relay.Mode.Noolite);
    console.log(await device.switch());
    //console.log(await device.brightDown());
  
   port.close();
}
async function ParamsProbe() {
    let device = new Relay(controller,3,Relay.Mode.Noolite);
    //console.log(await device.setBrightness(0.1));
    await device.brightReq(Relay.Direction.Down,0.1);
    
    port.close();
    
}
port.on('open', () => {
    DoorSensorProbe();
    //RelayBindProbe();
    //RelayUnbindProbe();
    //ElementaryCommandProbe();
    // ParamsProbe();
    
})

