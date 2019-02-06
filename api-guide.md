# API Guide for Noolite-F javascript driver

## Table of contents

* [Sample use case](#sample-use-case)
* [Usage RemoteControl class](#usage-remotecontrol-class)
* [Usage Relay class](#usage-relay-class) 


## Sample use case
In this case you need turn on lamp in the hall after open the entry door. 

For implements this scenario you need :

* RemoteControl class for get event from door sensor
* Relay class for manage lamp
* Controller class for manage RemoteControl and Relay instances

### Create port and controller

Create probe-noolite.js file 

First of all, you need create serial port and controller

```javascript
const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0',{autoOpen:true});
const parser = port.pipe(new SerialPort.parsers.ByteLength({length: 17}));
let controller = new MTRF64Controller(port,parser);
```
### Create DoorSensor class

Second, we need create *DoorSensor* class base on *RemoteControl* class

```javascript
class DoorSensor extends RemoteControl {
    constructor(controller,channel) {
        super(controller,channel,DoorSensor.Mode.Noolite);
    }
}
```
### Bind devices with adapter

And them, you need perform bind command for Relay and DoorSensor

Create function DoorSensorProbe and put it following code

```javascript
function DoorSensorProbe() {
let relay = new Relay(controller,3,Relay.Mode.Noolite);
let door = new DoorSensor(controller,1)
await relay.bind();
await door.bind();
}
```
Now you must waiting while port will ready.

```javascript
port.on('open', () => {
    DoorSensorProbe();  
})
```
Please run this code and bind device as follow in Noolite instruction 

```
  node probe-noolite.js
```

Please press Ctrl-C for close application after bind

### Create method in DoorSensor class

After that you need  override two method onTurnOn() and onTurnOff() in DoorSensor class

```javascript
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
```

### Register your DoorSensor in controller

Before run it, we need register door sensor in controller in DoorSensorProbe function

```javascript
controller.register(door);
```
### Call turnOn and turnOff command from DoorSensors methods

As final, call command for lamp from DoorSensor method

```javascript
class DoorSensor extends RemoteControl {
    constructor(controller,channel) {
        super(controller,channel,DoorSensor.Mode.Noolite);
    }
    onTurnOn() {
        console.log("door is open");
        relay.turnOn();
    }
    onTurnOff() {
        console.log("door is closed");
        relay.turnOff();
    }
}
```


### Simple run it!

Run you very small smarthome system under nodejs

```
  node probe-noolite.js
```

 Please open and close your door with sensor :-)

## Usage RemoteControl class

TO DO

## Usage Relay class 

TO DO