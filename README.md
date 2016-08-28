# alphyBot
A basic Twitch bot for (moderating chat and) using commands.

## Installation
Install Node.js from the Node.js website: https://nodejs.org/en/download/

If you're on Linux this would work too:

```
sudo apt-get install -y nodejs
```

Configure the config.js file with Notepad or other Editors.

Explanation for all the variables:

```
// Use this file to enter your settings for the Bot
// Do not enter the setting into the main file, because of the syntaxes.
{
    // Twitch username of your bot (all lower case)
    "username": "",
    // OAUTH key of your bot
    "password": "",
    // Channel(s) that the bot shall connect to (all lower case)
    "channel": [
        "",
        ""
    ],
    // Broadcaster's twitch username (all lower case)
    "broadname": "",
    // Enable remote shutdown of the bot with "!part" via whisper (true / false)
    "whisppart": true,
    // Whisper message when bot connects to the channel (true / false)
    "whiscon": true
}
```

!- ALL fields have to be filled in, otherwise the bot won't work -!

Open the console or terminal in the repository directory and type.

```
npm install tmi.js --save
npm install socket.io --save
npm install nodemon --global
```

For a single execution type following in the repository directory:

```
node app.js
```

For a permanent run type following in the repository directory:

```
nodemon
```

More readme soon.
