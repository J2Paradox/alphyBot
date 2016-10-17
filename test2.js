var config = require('./json/config.json');
var osuapi = require('osu-api');
var osu = new osuapi.Api(config.osu.password);
osu.setMode(0);

// const url = 'https://osu.ppy.sh/b/705378?m=0';
const url = 'https://osu.ppy.sh/b/194320&m=1';
const regex = /^https?:\/\/osu.ppy.sh\/[b|s]\//.test(url);
console.log(regex);
if (regex){
    const final = url.substr(url.lastIndexOf('/') + 1);
    console.log(final);
    var id = final.split('?')
    osu.getBeatmap(id[0].toString(), function callback(error, output){
        console.log(output);
        const parse = parseFloat(output.difficultyrating).toFixed(2);
        console.log(parse);
        console.log(output.artist + " - " + output.title + " ["
        + output.version + "], AR " + output.diff_approach + ", " + output.bpm
        + " BPM, Max Combo " + output.max_combo + ", "
        + parse.toString() + " stars" );
    });
};
