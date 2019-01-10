class NooliteBase {
    
    constructor(channel, adapter) {
        NooliteBase.Noolite = 0
        NooliteBase.NooliteF = 2;
        if(channel <= 0 || !adapter)
         throw Error('Channel or adapter missing or have incorrect value');

        this.adapter = adapter;
        this.channel = channel;
    }
}
NooliteBase.Mode = {"Noolite":0, "NooliteF":2}
module.exports = NooliteBase;
