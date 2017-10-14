var Group = require('../SocketUser/modules/Group');


module.exports = function(mysqlPool) {
    var ExtensionController = require("./ExtensionController")(mysqlPool);
    var YoutubeController = require("./youtubeController")(mysqlPool);


    class RemoteGroup extends Group {
        constructor() {
            super();
            this.extensionController = new ExtensionController();
        }

        youtubeControlllers = [];

        youtubeControllerDo(action) {
            for(var i = this.youtubeControlllers.length - 1; 0 <= i; i--) {
                var youtubeController = this.youtubeControlllers[i];
                action(youtubeController);
            }
        }

        childrenDo(action) {
            action(this.extensionController)
            youtubeControllerDo(action);
        } 

        addUser(user) {
            super.addUser(user);
            this.childrenDo(function(child) {
                child.addUser(user);
            })
        }

        removeUser(user, keepBindings) {
            super.removeUser(user);
            this.childrenDo(function(child) {
                child.removeUser(user);
            })
        }

    }
}