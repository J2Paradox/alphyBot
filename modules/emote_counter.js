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
            fs.writeFileSync("counter/kappacount", newkappa);
        }

        // Get amount of send Kappas in chat
        if(message == "!kappa"){
            var kappanumber = fs.readFileSync("counter/emoteCountKappa");
            client.say(config.broadname, "Total messages incluing a Kappa : " + kappanumber);
        }

    }
}

