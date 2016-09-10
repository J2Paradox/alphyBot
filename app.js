var tmi = require('tmi.js');
var config = require('./configs/config.json');
var fs = require('fs');
var express = require('express');
var app = express();

// CONSOLE LOG VARIABLES
var dateData = String(new Date());
var dateSplit = dateData.split(" ")
var datePrint = dateSplit[1] + " " + dateSplit[2] + " " +
    dateSplit[3] + " " + dateSplit[4]

var dateL = "[" + datePrint + "] "
var errorL = " [ ERROR ] "
var infoL = " [ INFO ] "

// SERVER
var serverSettings = "There could be settings stored here someday."
var alphyServer = require('./server.js');
alphyServer.server()

// Configuration for Api
var twitchOptions = {
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
var client = new tmi.client(twitchOptions);
client.connect();

// Chat stream
client.on("chat", function (channel, userstate, message, self) {
    if (self) return;
    // Commands
    var commands = require('./modules/commands.js')
    commands.say(client, userstate, message);

    // Emote counters
    var emoteCounter = require('./modules/emote_counter.js')
    emoteCounter.say(client, userstate, message);

    // Moderation tools
    var moderation = require('./modules/moderation.js')
    moderation.say(client, userstate, message);

});

client.on("connected", function (address, port) {
    console.log(dateL + infoL + "BOT CONNECTED TO: " + address);

	if(config.whiscon == true){
		client.whisper(config.broadname, "Bot connected to the channel!");
	}
});

client.on("disconnected", function (reason) {
    client.whisper(config.broadname, "Bot disconnected from the channel!");
    console.log(dateL + errorL + "BOT DISCONNECTED, REASON: " + reason.toUpperCase());
});

client.on("whisper", function (from, userstate, message, self) {
	// Remote Disconnect from the channel via whispers (only from broadcaster)

	if (self) return;

    console.log(dateL + infoL + "WHISPER FROM: " + userstate.username + " MESSAGE: " + message)

	if (message.toLowerCase() == "!part" && String(userstate.username) == config.broadname && config.whisppart == true){
		client.whisper(config.broadname, "Bot is going to disconnect, byebye!");
        console.log(dateL + infoL + "CLIENT WISPER DC")
		client.disconnect();
	}
});
