// IMPORTS
const tmi = require('tmi.js');
const config = require('./configs/config.json');
const database = require('./modules/initdatabase.js');

// CONSOLE LOG VARIABLES
var dateData = String(new Date());
var dateSplit = dateData.split(" ")
var datePrint = dateSplit[1] + " " + dateSplit[2] + " " +
    dateSplit[3] + " " + dateSplit[4]
var dateL = "[" + datePrint + "]"
const errorL = " [ ERROR ] "
const infoL = " [ INFO ] "
const botversion = "DEV0.1.1"

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
        username: config.twitch.botname,
        password: config.twitch.password
    },
    channels: config.twitch.channel
};

database.create();

// API LISTENER
var client = new tmi.client(twitchOptions);
client.connect();

// CHAT STREAM
client.on("chat", function (channel, userstate, message, self) {
    if (self) return;

    // COMMANDS
    var commands = require('./modules/commands.js')
    commands.say(client, userstate, message);

    // EMOTE COUNTER
    // var emoteCounter = require('./modules/emote_counter.js')
    // emoteCounter.say(client, userstate, message);

    // MODERATION
    // var moderation = require('./modules/moderation.js')
    // moderation.say(client, userstate, message);

});

// CONSOLE LOG CONNTECTION
client.on("connected", function (address, port) {
    console.log(dateL + infoL + "alphyBot connected to: " + address);
    client.whisper(config.twitch.broadname, "Bot connected to the channel!");
    client.say(config.twitch.broadname, "alphyBot connected to the chat @ " +
    dateL + ". Running as version " + botversion);
});

// CONSOLE LOG DISCONNECT
client.on("disconnected", function (reason) {
    client.whisper(config.twitch.broadname, "Bot disconnected from the channel!");
    console.log(dateL + errorL + "BOT DISCONNECTED, REASON: " + reason.toUpperCase());
});
