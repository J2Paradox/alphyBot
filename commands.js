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
