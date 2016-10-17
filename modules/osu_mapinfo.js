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
        var url = messageCheck[0].toString();
        const regex = /^https?:\/\/osu.ppy.sh\/[b|s]\//.test(url);
        if (regex){
            const final = url.substr(url.lastIndexOf('/') + 1);
            var id = final.split('?')
            osu.getBeatmap(id[0].toString(), function callback(error, output){
                const parse = parseFloat(output.difficultyrating).toFixed(2);
                client.say(config.twitch.broadname, output.artist + " - "
                + output.title + " [" + output.version + "], AR "
                + output.diff_approach + ", " + output.bpm
                + " BPM, Max Combo " + output.max_combo + ", "
                + parse.toString() + " stars");
            });
        };
        };
    }
}
