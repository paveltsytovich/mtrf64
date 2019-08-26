const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0',{autoOpen:true});
const parser = port.pipe(new SerialPort.parsers.ByteLength({length: 17}));
const MTRF64Driver = require('mtrf64');
let controller = new Controller(port,parser);

class DoorSensor extends MTRF64Driver.RemoteControl {
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
let relay = new MTRF64Driver.Relay(controller,3,MTRF64Driver.Relay.Mode.Noolite);
let door = new DoorSensor(controller,1)
controller.register(door);
//await relay.bind();
//await door.bind();
}

port.on('open', () => {
    DoorSensorProbe();  
})
