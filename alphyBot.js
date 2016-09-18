// IMPORTS
const tmi = require('tmi.js');
const config = require('./configs/config.json');

// CONSOLE LOG VARIABLES
var dateData = String(new Date());
var dateSplit = dateData.split(" ")
var datePrint = dateSplit[1] + " " + dateSplit[2] + " " +
    dateSplit[3] + " " + dateSplit[4]
var dateL = "[" + datePrint + "] "
const errorL = " [ ERROR ] "
const infoL = " [ INFO ] "

// BOT
module.exports = {
    init: function () {
        console.log(config.username)
    },
    bot: function () {
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

            // COMMANDS
            var commands = require('./modules/commands.js')
            commands.say(client, userstate, message);

            // EMOTE COUNTER
            var emoteCounter = require('./modules/emote_counter.js')
            emoteCounter.say(client, userstate, message);

            // MODERATION
            var moderation = require('./modules/moderation.js')
            moderation.say(client, userstate, message);

        });

        // CONSOLE LOG CONNTECTION
        client.on("connected", function (address, port) {
            console.log(dateL + infoL + "BOT CONNECTED TO: " + address);

        	if(config.whiscon == true){
        		client.whisper(config.broadname, "Bot connected to the channel!");
        	}
        });

        // CONSOLE LOG DISCONNECT
        client.on("disconnected", function (reason) {
            client.whisper(config.broadname, "Bot disconnected from the channel!");
            console.log(dateL + errorL + "BOT DISCONNECTED, REASON: " + reason.toUpperCase());
        });

        // WHISPER CONTROL (MOVE AWAY FROM HERE SOON)
        client.on("whisper", function (from, userstate, message, self) {
        	if (self) return;

            console.log(dateL + infoL + "WHISPER FROM: " + userstate.username + " MESSAGE: " + message)

        	if (message.toLowerCase() == "!part" && String(userstate.username) == config.broadname && config.whisppart == true){
        		client.whisper(config.broadname, "Bot is going to disconnect, byebye!");
                console.log(dateL + infoL + "CLIENT WISPER DC")
        		client.disconnect();
        	}
        });

    }
};
