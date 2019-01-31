const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0',{autoOpen:true});
const parser = port.pipe(new SerialPort.parsers.ByteLength({length: 17}));


const MTRF64Controller = require('./MTRF64Controller');
const RemoteControl = require('./RemoteControl');

let controller = new MTRF64Controller(port,parser);


class RemoteControlHandler extends RemoteControl {
    constructor(controller,channel,mode) {
        super(controller,channel,mode);
    }
    onCommand(command) {
        super(command);
        switch(command.cmd) {
            case 0:
                this.onTurnOff();
                break;
            case 1:
                this.onBrightDown();
                break;
            case 2:
                this.onTurnOn();
                break;
            case 3:
                this.onBrightUp();
                break;
            case 4:
                this.onSwitch();
                break;
            case 5:
                this.onBrightBack();
            case 7:
                this.onExecuteScenario();
                break;
            case 8:
                this.onSaveScenario();
                break;
            case 10:
                this.onStopReq();
                break;
            case 16: 
                this.onRollColour();
                break;
            case 17:
                this.onSwitchColour();
                break;
            case 18:
                this.onSwitchMode();
                break;
            case 19:
                this.onSpeedBackMode();
                break;
            case 20: 
                this.onLowBattery();
                break;
            case 21:
                this.onSensTempHumi(command.d);
                break;
            case 130:
                this.onSendState(command.d);
                break;
        }
    }
    onTurnOn() {
        throw Error('Not implemented');
    }
    onTurnOff() {
        throw Error('Not implemented');
    }
    onBrightDown() {

    }
    onBrightUp() {

    }
    onSetBrightness(brightness) {

    }
    onExecuteScenario() {

    }
    onSaveScenario() {

    }
    onStopReq() {

    }
    onRollColour() {

    }
    onSwitchColour() {

    }
    onSwitchMode() {

    }
    onSpeedBackMode() {

    }
    onSendState(data) {

    }
    onSwitch() {

    }
    onBrightBack() {

    }
    onLowBattery() {

    }
    onSensTempHumi(data) {

    }
}

let device = new RemoteControlHandler(controller,1,RemoteControl.Mode.Noolite);

//device.bind();
controller.register(device);
