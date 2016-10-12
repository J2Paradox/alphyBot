const config = require('../json/config.json');
const mysql = require('mysql');

// CONSOLE LOG VARIABLES
var dateData = String(new Date());
var dateSplit = dateData.split(" ")
var datePrint = dateSplit[1] + " " + dateSplit[2] + " " +
    dateSplit[3] + " " + dateSplit[4]
var dateL = "[" + datePrint + "] "
const errorL = " [ ERROR ] "
const infoL = " [ INFO ] "

// DATABASE SETUP
var connection = mysql.createConnection({
    host : 'localhost',
    user : config.database.dbuser,
    password : config.database.dbpassword,
    database : 'alphybot'
});

connection.connect(function(err) {
    if (err) {
        console.error(dateL + errorL + "Couldn't conntect to DB" + err.stack);
            return;
    };
    console.log(dateL + infoL + 'Connected with ID: ' + connection.threadId);
});

module.exports = {
    init: function () {
        console.log(config.username)
    },
    say: function (client, userState, message) {
        var msgSplitBySpace = message.split(" ");
        var msgSplitBySymbol = message.split("");

        // Broadcaster only commands
        if (userState.username == config.twitch.broadname) {
            if (message == "!#") {
                client.say(config.twitch.broadname, "This is a broadcaster only command");
            };
            if (msgSplitBySpace[0].toLowerCase() == "!addcommand"){
                connection.query(`INSERT INTO commands VALUES
                (NULL, ?, ?, 0, NOW())`, msgSplitBySpace[1].toString(),
                msgSplitBySpace[2].toString(), function(err) {
                    if (err){
                        console.log(dateL + errorL + "Could't add command: "
                        + err);
                        client.say(config.twitch.broadname, "@" +
                        userState.username.toString() + ", Error adding command!");
                    }else{
                        client.say(config.twitch.broadname, `Successfully added command
                            with the trigger "` + msgSplitBySpace[1]+ `" and the echo "`
                            + msgSplitBySpace[2] + '"');
                    };
                });
            };
        };

        // Moderator commands
        if (userState.mod == true) {
            if (message == "!$") {
                client.say(config.twitch.broadname, "This is a mod-only command!");
            };
        };

        // Commands that can be used by anyone
        if (message == "!") {
            client.say(config.twitch.broadname, "This command can be used by anyone!");
        };

        if (msgSplitBySymbol[0].toString() == "!"){
            var query = connection.query(`SELECT echo FROM commands WHERE
                command LIKE ?`, msgSplitBySpace[1].toString())
            query.on('error', function (err) {
                client.say(config.twitch.broadname, "@" + userState.username.toString()
                +", Command not found.");
            query.on('result' function (row) {
                client.say(config.twitch.broadname, "@" + userState.username.toString()
                + row.toString());
            });
            });
        };
    };
};
