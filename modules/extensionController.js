var Controller = require("./controller");

module.exports = function(mysqlPool) {
    class ExtensionController extends Controller {
        constructor() {
            super();
            this.filter = {type:"extensionRemote"};
        }
    }

    return ExtensionController;
}
