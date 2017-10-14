module.exports = function(users, socket) {
    var remoteNamespace = socket.of('/remote');

    // attach to session
    remoteNamespace.use(users.socketSession);
    // require the user is signed in
    remoteNamespace.use(users.requireSocketLogin);

    remoteNamespace.on('connection', function(client) {
        client.on('log', function(data) {
            console.log("client log", data);
        })
    });

}