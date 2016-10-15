var irc = require('irc');
var bancho = new irc.Client('irc.ppy.sh','alphuite', {
    userName: 'alphuite',
    password: '',
    port: 6667,
    debug: true,
    showErrors: true,
    secure: true,
    realName: 'alphyBot - twitch moderation bot.'
});

bancho.connect();
bancho.join('#osu');

bancho.addListener('pm', function(from, message){

    console.log(from + ' : ' + message);
});

bancho.addListener('message', function(from, to, message){
    console.log(from + ' : ' + message);
});

bancho.addListener('error', function(message) {
        console.log('error: ', message);
});

