var Group = require('../SocketUser/modules/Group');

class Controller extends Group {
    constructor() {

    }

    play() {
        this.emit("play", true);
    }
    stop(){
        this.emit("stop", true);
    }
    setVolume(volume) {
        this.emit("volume", volume);
    }
    
}

return Controller;