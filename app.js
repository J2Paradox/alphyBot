var tmi = require('tmi.js');
var config = require('./config.js');
var fs = require('fs');

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

var client = new tmi.client(options);
client.connect();

client.on("chat", function (channel, userstate, message, self) {
    if (self) return;

	// Broadcaster only commands
    if(userstate.username == config.broadname){
        if(message == "!broadonly"){
            client.say(config.broadname, "This is a broadcaster only command");
        }
    }

	// Moderator commands
    if(userstate.mod == true){
        if(message == "!modonly"){
            client.say(config.broadname, "This is a mod-only command!");
        }
    }
	// Commands that can be used by anyone
    if(message == "!everyone"){
        client.say(config.broadname, "This command can be used by anyone!");
    }

    // Kappa Counter
    if(message.includes("Kappa")){
        var oldkappa = fs.readFileSync("counter/kappacount");
        var readkappa = parseInt(oldkappa);
		var newkappa = (readkappa + 1);
        fs.writeFileSync("counter/kappacount", newkappa);
    }

	if(message == "!kappa"){
		var kappanumber = fs.readFileSync("counter/kappacount");
		client.say(config.broadname, "Total Kappa messages: " + kappanumber);
	}

});

client.on("connected", function (address, port) {
    console.log("BOT CONNECTED TO: " + address);

	if(config.whiscon == true){
		client.whisper(config.broadname, "Bot connected to the channel!");
	}
});

client.on("disconnected", function (reason) {
    client.whisper(config.broadname, "Bot disconnected to the channel!");
    console.log("BOT DISCONNECTED, REASON: " + reason);
});

client.on("whisper", function (from, userstate, message, self) {
	// Remote Disconnect from the channel via whispers (only from broadcaster)

	if (self) return;

	if (message == "!part" && userstate.username == config.broadname && config.whispart == true){
		client.whisper(config.broadname, "Bot is going to disconnect, byebye!");
		client.disconnect;
	}
});
