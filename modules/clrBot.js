const tmi = require('tmi.js');
var config = require('./configs/config.json');

// TWITCH API CONFIG
var twitchOptions = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        // CHANGE IN CONFIG ONLY
        username: config.username,
        password: config.password
    },
    channels: config.channel
};

// API LISTENER
var client = new tmi.client(twitchOptions);
client.connect();

// CHAT STREAM
client.on("chat", function (channel, userstate, message, self) {
    if (self) return;

    if(message.includes("Kappa")){
        
    };
});
