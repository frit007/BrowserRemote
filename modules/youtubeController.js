var Controller = require("./controller");

module.exports = function() {

    class YoutubeController extends Controller {
        constructor() {
            super();
        }
        this.filter = {type:"youtubeRemote"};
    }


    return YoutubeController;
}