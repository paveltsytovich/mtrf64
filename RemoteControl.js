/**
 * Implement RemoteControl class for Noolite-F device
 * @copyright Pavel Tsytovich, 2019
 */
const AbstractRemoteControl = require('./AbstractRemoteControl');

class RemoteControl extends AbstractRemoteControl {
    /**
     * Constructor
     * @param {MTRF64Controller} controller - controller for manage device
     * @param {number} channel - channel of device
     * @param {NooliteDevice.Mode} mode - Noolite protocol mode 
     */
    constructor(controller, channel, mode) {
        super(controller, channel, mode);
    }
    /**
     * Method for receive command handler. Do not use this method directly
     * 
     * @param {MTRF64Command} command 
     */
    onCommand(command) {
        
        super.onCommand(command);

        switch (command.cmd) {
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
    /**
     * Handle for `Turn On` command from remote control device
     */
    onTurnOn() {
    }
    /**
     * Handle for `Turn Off` command from remote control device
     */
    onTurnOff() {
    }
    /**
     * Handle for `Bright Down` command from remote control device
     */
    onBrightDown() {
    }
    /**
     * Handle `Bright Up` command from remote control device
     */
    onBrightUp() {
    }
    
    /**
     * Handle `Load Scenario` command from remote control device
     */
    onExecuteScenario() {
    }
    /**
     * Handle `Save Scenario` command from remote control device
     */
    onSaveScenario() {
    }
    /**
     * Handle `Stop Req` command from remote control device
     */
    onStopReq() {
    }
    /**
     * Handle `Roll Colour` command from remote control device
     */
    onRollColour() {
    }
    /**
     * Handle `Switch Colour` command from remote control device
     */
    onSwitchColour() {
    }
    /**
     * Handle `Switch Mode` command from remote control device
     */
    onSwitchMode() {
    }
    /**
     * Handle `SpeedBack Mode` command from remote control device
     */
    onSpeedBackMode() {
    }
    /**
     * Handle `Send State` command from remote control device
     * @param {Array} data - Data array with device state
     */
    onSendState(data) {
    }
    /**
     * Handle `Switch` command from remote control device
     */
    onSwitch() {
    }
    /**
     * Handle `Bright Back` command from remote control device
     */
    onBrightBack() {
    }
    /**
     * Handle `Low Battery` command from remote control device
     */
    onLowBattery() {
    }
    /**
     * Handle `Sens TempHumi` command from remote control device
     * @param {Array} data - Data array with device state
     */
    onSensTempHumi(data) {
    }
}
module.exports  = RemoteControl;
