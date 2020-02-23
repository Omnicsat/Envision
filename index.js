const Discord = require('discord.js');

const client = new Discord.Client();

client.config = require('./config.json');

client.log = require('./functions/log.js');

client.commands = new Discord.Collection();
client.adminCommands = new Discord.Collection();

client.commands.set('ping', require('./commands/ping.js'));
client.commands.set('info', require('./commands/info.js'));
client.commands.set('map', require('./commands/map.js'));
client.commands.set('thread', require('./commands/thread.js'));
client.commands.set('quote', require('./commands/quote.js'));
client.commands.set('canvastest', require('./commands/canvas.js'));
client.commands.set('factbook', require('./commands/factbook.js'));

client.adminCommands.set('purge', require('./commands/purge.js'));
client.adminCommands.set('tmute', require('./commands/tmute.js'));
client.adminCommands.set('announce', require('./commands/announce.js'));
client.adminCommands.set('configure', require('./commands/configure.js'));
client.adminCommands.set('purgeToID', require('./commands/purgeToID.js'));
//client.adminCommands.set('playtest', require('./commands/playtest.js'));

client.on('message', message => require('./events/message.js')(client, message));
client.on('guildCreate', guild => require('./events/guildCreate')(client, guild));
client.on('ready', () => require('./events/ready.js')(client));
client.on('guildMemberAdd', member => require('./events/guildMemberAdd.js')(client, member));
client.on('guildMemberRemove', member => require('./events/guildMemberRemove.js')(client, member));
client.on('error', err => require('./events/error.js')(client, err));

client.login(client.config.token);
