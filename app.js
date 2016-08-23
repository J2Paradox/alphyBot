var tmi = require('tmi.js');
var config = require('./config.js');
var fs = require('fs');
var app = require('http').createServer(handler)
var io = require('socket.io')(app);

// http handler
app.listen(9000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

// // Connection to bot
io.on('connection', function (socket) {
    console.log("HTTP CLIENT CONNECTED");
});


// config

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

// Api listner

var client = new tmi.client(options);
client.connect();

client.on("chat", function (channel, userstate, message, self) {
    if (self) return;

	// Broadcaster only commands
    if(userstate.username == config.broadname){
        if(message == "!#"){
            client.say(config.broadname, "This is a broadcaster only command");
        }
    }

	// Moderator commands
    if(userstate.mod == true){
        if(message == "!$"){
            client.say(config.broadname, "This is a mod-only command!");
        }
    }
	// Commands that can be used by anyone
    if(message == "!"){
        client.say(config.broadname, "This command can be used by anyone!");
    }

    // Kappa Detector
    if(message.includes("Kappa")){
        console.log("KAPPA DETECTED")
        // Kappa to overlay
        io.emit('showemote', "Kappa");
        // Kappa counter
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

    console.log("WHISPER FROM: " + userstate.username + " MESSAGE: " + message)

	if (message == "!part" && String(userstate.username) == config.broadname && config.whisppart == true){
		client.whisper(config.broadname, "Bot is going to disconnect, byebye!");
        console.log("CLIENT WISPER DC")
		client.disconnect();
	}
});
