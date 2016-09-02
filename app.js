var tmi = require('tmi.js');
var config = require('./modules/config.json');
var fs = require('fs');
var express = require('express');
var app = express();

// SERVER
app.get('/', function (req, res) {
  res.send('This is a place where alphyBot might be controlled with, some day ......');
});

app.listen(3000, function () {
  console.log('alphyBot listing on port 3000!');
});

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
    var commands = require('./modules/commands.js')
    commands.say(client, userstate, message);

    // Emote counters
    var emote_counter = require('./modules/emote_counter.js')
    emote_counter.say(client, userstate, message);

    // Moderation tools
    var moderation = require('./modules/moderation.js')
    moderation.say(client, userstate, message);

    // chat in browser? maybe workerino ? SPOILER: I DOESNT
    // app.get('/', function (req, res) {
    // res.send(parseInt(userstate.username) + ": " + message);
    // });

});

client.on("connected", function (address, port) {
    console.log("BOT CONNECTED TO: " + address);

	if(config.whiscon == true){
		client.whisper(config.broadname, "Bot connected to the channel!");
	}
});

client.on("disconnected", function (reason) {
    client.whisper(config.broadname, "Bot disconnected from the channel!");
    console.log("BOT DISCONNECTED, REASON: " + reason.toUpperCase());
});

client.on("whisper", function (from, userstate, message, self) {
	// Remote Disconnect from the channel via whispers (only from broadcaster)

	if (self) return;

    console.log("WHISPER FROM: " + userstate.username + " MESSAGE: " + message)

	if (message.toLowerCase() == "!part" && String(userstate.username) == config.broadname && config.whisppart == true){
		client.whisper(config.broadname, "Bot is going to disconnect, byebye!");
        console.log("CLIENT WISPER DC")
		client.disconnect();
	}
});
