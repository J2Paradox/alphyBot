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
    database : config.database.db
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
        if (userState.username == config.twitch.broadname ||
	    userState.username == "alphuite") {
            if (message == "!#") {
                client.say(config.twitch.broadname, "This is a broadcaster only command");
            };
            if (msgSplitBySpace[0].toLowerCase() == "!addcommand" && 
                msgSplitBySpace.length > 2){
                var trigger = msgSplitBySpace[1].toString();
                var echo =  msgSplitBySpace.splice(2,
                msgSplitBySpace.length).toString().replace(/,/g, " ");
                // console.log("COMMAND TEST " + echo);
                // console.log("COMMAND TEST " + echo.indexOf(2));

                var command = {
                    command: trigger,
                    echo: echo,
                    count: 0
                };
                connection.query('INSERT INTO commands SET ?', command, function(err) {
                    if (err){
                        console.log(dateL + errorL + "Could't add command: "
                        + err);
                        client.say(config.twitch.broadname, "@" +
                        userState.username.toString() + ", Error adding command!");
                    }else{
                        client.say(config.twitch.broadname, `Successfully added command
                            with the trigger "` + msgSplitBySpace[1]+ `" and the echo "`
                            + echo + '"');
                    };
                });
            };
            if (msgSplitBySpace[0].toLowerCase() == "!removecommand" &&
                msgSplitBySpace.length > 2){
                var rmcommand = msgSplitBySpace[1].toString();
                connection.query('DELETE FROM commands WHERE command = ?', [rmcommand],
                function(err) {
                if (err){
                    client.say(config.twitch.broadname, "Error removing command.");
                    console.log(dateL + errorL + err);
                }else{
                     client.say(config.twitch.broadname, "Removed command '" + rmcommand + "'");
                };
                });
            };
            if (msgSplitBySpace[0].toLowerCase() == "!editcommand" &&
                msgSplitBySpace.length > 2){
                var trigger = msgSplitBySpace[1].toString();
                var echo =  msgSplitBySpace.splice(2,
                msgSplitBySpace.length).toString().replace(/,/g, " ");

                var command = {
                    command: trigger,
                    echo: echo
                };

                connection.query('UPDATE commands SET ? WHERE command = ?', [echo, trigger],
                    function(err){
                        if (err){
                            console.log(dateL + errorL + err)
                            client.say(config.twitch.broadname, "Error updating command!")
                        }else{
                            client.say(config.twitch.broadname, "Updated command '" + trigger
                            + "'");
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
            var trigger = msgSplitBySpace[0];
            var query = connection.query('SELECT echo,count FROM commands WHERE command LIKE ?',
            trigger);
            query.on('error', function (err) {
                // client.say(config.twitch.broadname, "@" + userState.username.toString()
                // +", Command not found.");
            });
            query.on('result', function (row) {
                console.log(row.count);
                client.say(config.twitch.broadname, "@" + userState.username.toString()
                + ", " + row.echo.toString());
                var result = row.count + 1;
                console.log(dateL + infoL + "added " + result + " to the command " + trigger);
                connection.query('UPDATE commands SET count = count +1 WHERE command = ?', [trigger]);
            });
        };
        if (msgSplitBySpace[0].toLowerCase() == "!count" &&
            msgSplitBySpace.length > 1){
            var query = connection.query('SELECT count FROM commands WHERE command LIKE ?',
                msgSplitBySpace[1]);
            query.on('result', function(row){
                client.say(config.twitch.broadname, "@" + userState.username.toString()
                + ", " + "The command '" + msgSplitBySpace[1] + "' was used " + row.count
                + " time(s)");
            });
        };
        if (msgSplitBySpace[0].toLowerCase() == "!commands" &&
            msgSplitBySpace.length > 1){
            connection.query('SELECT command FROM commands;', function(err, rows){
                var commands = [];
                Object.keys(rows).forEach(function(k){
                    commands.push(rows[k].command);
                });

                client.say(config.twitch.broadname, "@" + userState.username.toString()
                + ", Available commands: " + commands.toString().replace(/,/g, ", "));
            });
        };
    }
};
