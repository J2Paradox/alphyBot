// CONSOLE LOG VARIABLES
var dateData = String(new Date());
var dateSplit = dateData.split(" ")
var datePrint = dateSplit[1] + " " + dateSplit[2] + " " +
    dateSplit[3] + " " + dateSplit[4];
var dateL = "[" + datePrint + "]";
const errorL = " [ ERROR ] ";
const infoL = " [ INFO ] ";

// MAIN
(function(){
"use strict";

// container start
const container = {};

// NPMJS Pakcages
const tmi = require('tmi.js');

// Custom Modules Import
container.config = require('./json/config.json');
const config = container.config;

const database = require('./modules/initdatabase.js')(container);

// TWITCH API CONFIG
const twitchOptions = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: config.twitch.botname,
        password: config.twitch.password
    },
    channels: config.twitch.channel
};

// Create the connection
const client = new tmi.client(twitchOptions);
client.connect();

// CHAT STREAM
client.on("chat", function (channel, userstate, message, self) {
    if (self) return;
    // COMMANDS
    const commands = require('./modules/commands.js');
    commands.say(client, userstate, message);
});

// CONSOLE LOG CONNTECTION
client.on("connected", function (address, port) {
    console.log(dateL + infoL + "alphyBot connected to: " + address);
    client.whisper(config.twitch.broadname, "Bot connected to the channel!");
    client.say(config.twitch.broadname, "alphyBot connected to the chat @ " +
    dateL + ". Running as version " + config.info.version);
});

// CONSOLE LOG DISCONNECT
client.on("disconnected", function (reason) {
    client.whisper(config.twitch.broadname, "Bot disconnected from the channel!");
    console.log(dateL + errorL + "BOT DISCONNECTED, REASON: " + reason.toUpperCase());
});

// container end
}());
