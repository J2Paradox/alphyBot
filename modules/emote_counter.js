var fs = require('fs');
var config = require('./config')

module.exports = {
    init: function () {
        console.log(config.username)
    },
    say: function (client, userState, message) {
        // Kappa
        if(message.includes("Kappa")){
            console.log("KAPPA DETECTED")
            // Kappa counter
            var oldkappa = fs.readFileSync("counter/emoteCountKappa");
            var readkappa = parseInt(oldkappa);
            var newkappa = (readkappa + 1);
            fs.writeFileSync("counter/emoteCountKappa", newkappa);
            }

        // Get amount of send Kappas in chat
        if(message.toLowerCase() == "!kappa"){
            var kappanumber = fs.readFileSync("counter/emoteCountKappa");
            client.say(config.broadname, "Total messages incluing a Kappa : " + kappanumber);
            }

        // PogChamp
        if(message.includes("PogChamp")){
            console.log("POGCHAMP DETECTED")
            // PogChamp counter
            var oldpogchamp = fs.readFileSync("counter/emoteCountPogChamp");
            var readpogchamp = parseInt(oldpogchamp);
            var newpogchamp = (readpogchamp + 1);
            fs.writeFileSync("counter/emoteCountPogChamp", newpogchamp);
            }

        // Get amount of send PogChamps in chat
        if(message.toLowerCase() == "!pogchamp"){
            var pogchampnumber = fs.readFileSync("counter/emoteCountPogChamp");
            client.say(config.broadname, "Total messages incluing a PogChamp : " + pogchampnumber);
            }

        // LUL
        if(message.includes("LUL")){
            console.log("LULP DETECTED")
            // LUL counter
            var oldlul = fs.readFileSync("counter/emoteCountLUL");
            var readlul = parseInt(oldlul);
            var newlul = (readlul + 1);
            fs.writeFileSync("counter/emoteCountLUL", newlul);
            }

        // Get amount of send LULs in chat
        if(message.toLowerCase() == "!lul"){
            var lulnumber = fs.readFileSync("counter/emoteCountLUL");
            client.say(config.broadname, "Total messages incluing a LUL : " + lulnumber);
            }


    }
}

