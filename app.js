var tmi = require('tmi.js');
var config = require('./modules/config.json');
var fs = require('fs');
// var app = require('http').createServer(handler)
// var io = require('socket.io')(app);

// Configuration for Api
var options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        // Change in config file
        username: config.username,
        password: config.password
    },
    channels: config.channel
};

// Api Listner
var client = new tmi.client(options);
client.connect();

// Chat stream
client.on("chat", function (channel, userstate, message, self) {
    if (self) return;
    // Commands
    var commands = require('./modules/commands')
    commands.say(client, userstate, message);

    // Emote counters
    var emote_counter = require('./modules/emote_counter')
    emote_counter.say(client, userstate, message);

    // Moderation tools
    var moderation = require('.modules/moderation')
    moderation.say(client, userstate, message);
});

client.on("connected", function (address, port) {
    console.log("BOT CONNECTED TO: " + address);

	if(config.whiscon == true){
		client.whisper(config.broadname, "Bot connected to the channel!");
	}
});

client.on("disconnected", function (reason) {
    client.whisper(config.broadname, "Bot disconnected from the channel!");
    console.log("BOT DISCONNECTED, REASON: " + reason);
});

client.on("whisper", function (from, userstate, message, self) {
	// Remote Disconnect from the channel via whispers (only from broadcaster)

	if (self) return;

    console.log("WHISPER FROM: " + userstate.username + " MESSAGE: " + message)

	if (message == "!part" && String(userstate.username) == config.broadname && config.whisppart == true){
		client.whisper(config.broadname, "Bot is going to disconnect, byebye!");
        console.log("CLIENT WISPER DC")
		client.disconnect();
	}
});
