class NooliteBase {
    constructor(channel, adapter) {
        if(channel <= 0 || !adapter)
         throw Error('Channel or adapter missing or have incorrect value');

        this.adapter = adapter;
        this.channel = channel;
    }
}

module.exports = NooliteBase;