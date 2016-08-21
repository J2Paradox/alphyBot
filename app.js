var tmi = require('tmi.js');
var config = require('./configt.js');

var options = {
	options: {
		debug = true
	},
	connection: {
		cluster: "aws",
		reconnect: true
	},
	identitiy: {
		// Change in config.js
		username: config.username,
		password: config.password
	},
	channels: config.channel
};

var client = new tmi.client(options);

client.connect();

client.on("chat", function (channel, userstate, message, self) {
	if (self) return;

	if (channel == config.channel){
		// Commands that only read from config.channel's channel

		if (userstate.broadname == config.channel){
			// Broadcaster only commands
			if (message == "!broadonly"){
				client.say(config.channel, "This is a broadcaster-only command!");
			}
		}

		if (userstate.mod == true){
			// Mod-Only Commands
			if (message == "!modonly"){
				client.say(config.channel, "This is a mod-only command!");
			}

		}
		// Commands that can be used by everyone in the channel
		if (message == !everyone){
			client.say(config.channel, "This command can be used by anyone");
		}
	}
});

client.on("connected", function (address, port){

	if (config.whiscon){
		client.whisper(config.broadname, "Bot connected to the channel!");
	}
	
	console.log("BOT CONNECTED TO: " + address);
});

client.on("disconnected", function (reason){
	client.whisper(config.broadname, "Bot disconnected from the channel!");
	console.log("BOT DISCONNECTED, REASON: " + reason);
});

client.on("whisper", function (from, userstate, message, self) {
	// Remote Disconnect from the channel via whispers (only from broadcaster)

	if (self) return;

	if (message == "!part" && userstate.username == config.broadname && config.whispart){
		client.whisper(config.broadname, "Bot is going to disconnect, byebye!");
		client.disconnect;
	}
});

