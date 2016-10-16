// IMPORTS
var config = require('../json/config.json');
var osuapi = require('osu-api');
var osu = new osuapi.Api(config.osu.password);
osu.setMode(0);

module.exports = {
    init: function () {
        console.log(config.username)
    },
    get: function (client, userState, message) {
        var messageCheck = message.split(" ");
        var link = messageCheck[0].toString();
        function LinkValidation(link) {

            
        };
    }
}
