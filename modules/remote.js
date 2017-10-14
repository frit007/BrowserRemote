var Group = require('../SocketUser/modules/Group');

module.exports = function(mysqlPool) {
    class Remote extends Group {
        constructor() {
            super();
            this.filter = {type:"remote"}
        }
    }

    return Remote;
}
