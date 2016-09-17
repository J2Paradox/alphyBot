var config = require('./configs/config.json');

module.exports = {
    init: function () {
        console.log(config.username)
    },
    say: function (client, userState, message) {
        if (message.length > 140){
        client.timeout(config.broadname, userstate.username, 10, "Message too long");
        client.whisper(userstate.username, "You have been timed out because your message was too long.")
        }

        // if message contains link
        // client.timeout(config.broadname, userstate.username, 10, "Message contains link");
        // client.whisper(userstate.username, "You have been timed out because your message contained a hyperlink.")
    }
}
