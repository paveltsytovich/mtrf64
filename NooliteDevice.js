/**
 * @copyright Pavel Tsytovich, 2019
 * 
 * Implement abstract class for Noolite device
 */
class NooliteDevice {

    /**
     * Support async methods in noolite-F command. Do not use this method directly
     * 
     * @param {*} command 
     */
    onCommand(command) {
        if(this._unlock) {
            this._unlock(command);
            this._unlock = null;
        }        
    }
    /**
     * Support for testing after send command. Do not use this method directly
     * @param {*} command 
     */
    _onSend(command) {

    }
    /**
     * Support async transaction 'send->receive' for all noolite device. Do not use this method directly
     * @param {*} command 
     */
    _processTransaction(command) {
        return new Promise((resolve) => {
                this._unlock = resolve;
                this._controller.send(this,command);
            });         
    }
    /**
     * Send service command.
     * Not implemented in this version
     */
    service() {
        throw Error('Not implemented');
    }
    /**
     * Constructor
     * @param {MTRF64Controller} controller - The controller for manage device
     * @param {number} channel - The channel of device
     * @param {*} mode - Mode of Noolite-F protocol
     */
    constructor(controller,channel,mode = NooliteDevice.Mode.Noolite) {
        this._channel = channel;
        this._controller = controller;
        this._unlock = null;
        this._mode = mode
    }
    /**
     * Get mode property
     * @returns {Noolite.Mode.Noolite | NooliteDevice.Mode.NooliteF}
     */
    get mode() {
        return this._mode;
    }
    /**
     * Get channel property
     */
    get channel () {
        return this._channel;
    }
}

NooliteDevice.Mode = {"Noolite": 0, "NooliteF": 2};
module.exports  = NooliteDevice;