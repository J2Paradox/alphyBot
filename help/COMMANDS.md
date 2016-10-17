# Help Documentation for alphyBot
You can find almost everything about the commands of alphyBot here, if you have any further questions; please open a ticket on GitHub or message me on twitch (https://www.twitch.tv/alphuite)!
## Managing commands!
How to manage commands: 
### Adding commands to the database
```
!addcommand {commandTrigger} {commandRepsonse}
```

The command response can contain as many spaces as you wish, but the command trigger can't contain any spaces.

### Removing commands from the database

This method doesn't work for commands that aren't in the database, you can get a list of commands from the database by writing ```!commands``` in the chat.

```
!removecommand {commandName}
```

If the command that you're trying to remove doesn't exist, you will get an error message and no command wil be touched.

### Updating commands in the database
Soon™

## Osu Module
Here is the usage of the osu module in alphyBot:

### Get player info
```
!osu {playerName}
```

With this command you can get some basic information about the player, such as rank and current amount of pp.

```
!osu
```

If you put no player name after the osu command you get info about the default player, in most cases the streamer.

```
{beatmapUrl}
```

Linking a valid beatmap URL will give you info about the beatmap, such as; bpm, star rating, or max combo.
