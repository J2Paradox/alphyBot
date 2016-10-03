# alphyBot
A basic Twitch bot for (moderating chat and) using commands.

## Installation

Install node.js

```
sudo apt-get install -y nodejs
```

Create Database

```
CREATE DATABASE alphybot;
```

Create a 'configs/config.json' file and use the scheme for the config file

```
{
    "botname": "",
    "password": "",
    "channel": [
        "",
        ""
    ],
    "broadname": "",
    "dbuser": "",
    "dbpassword": ""
}
```

!- ALL fields have to be filled in, otherwise the bot won't work -!

Install packages
```
npm install
```

For a single execution type following in the repository directory:

```
node app.js
```

For a permanent run type following in the repository directory:

```
nodemon
```

More readme soon. XD
