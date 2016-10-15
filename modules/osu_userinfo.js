// IMPORTS
var config = require('../json/config.json');
var osuapi = require('osu-api');
var osu = new osuapi.Api(config.osu.password);
osu.setMode(0);

// CONSOLE LOG VARIABLES
var dateData = String(new Date());
var dateSplit = dateData.split(" ")
var datePrint = dateSplit[1] + " " + dateSplit[2] + " " +
    dateSplit[3] + " " + dateSplit[4]
var dateL = "[" + datePrint + "] "
const errorL = " [ ERROR ] "
const infoL = " [ INFO ] "

module.exports = {
    init: function () {
        console.log(config.username)
    },
    get: function (client, userState, message) {
        var msgSplitBySpace = message.split(" ");
        var msgSplitBySymbol = message.split("");
        var userToGet = msgSplitBySpace.splice(1,
        msgSplitBySpace.length).toString().replace(/,/g, " ");

        if (msgSplitBySpace[0].toLowerCase() == "!osu"){
            osu.getUser(userToGet, 1, function callback(error, output){
                console.log(dateL + errorL + error);
                if(output !== undefined){
                    client.say(config.twitch.broadname,"@" +
                    userState.username.toString() + ", The player '"
                    + output.username.toString() + "' is global rank #"
                    + output.pp_rank.toString() + " with "
                    + output.pp_raw.toString() + " pp");
                }else{
                    console.log(dateL + errorL + error);
                    client.say(config.twitch.broadname,"@" +
                    userState.username.toString() + ", Player not found!");
                }
            });
        };
    }
}
