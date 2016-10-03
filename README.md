# alphyBot
A basic Twitch bot for (moderating chat and) using commands.

## Installation

Tested on
  * Ubuntu 16
  * Debian 8

Create a working directory

```
sudo mkdir /srv/alphybot
```

Install git:

```
sudo apt-get git
cd /srv/alphybot
git clone https://github.com/alphuite/alphyBot .
```

Install node.js

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install mySQL

```
sudo apt-get install mysql-server
```

Create Database

```
mysql -u root -p
CREATE DATABASE alphybot;
exit;
```

Create a 'configs/config.json' file and use this scheme for the config file:

```
{
    "twitch": {
        "botname": "",
        "password": "",
        "channel": ["",""],
        "broadname": ""
    },
    "database": {
        "dbuser": "",
        "dbpassword": ""
    },
    "osu": {
        "botname": "",
        "password": ""
    }
}
```

### !- ALL fields have to be filled in, otherwise the bot won't work -!

Install packages
```
npm install
npm install nodemon -g
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
