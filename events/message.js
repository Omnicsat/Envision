const Discord = require('discord.js');

module.exports = (client, message) => {
    if (message.author.bot) return;

    if (message.content.indexOf(client.config.prefix) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (client.commands.has(command)) {
        client.commands.get(command)(client, message, args);
    }

    if (client.adminCommands.has(command)) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            client.adminCommands.get(command)(client, message, args);
        } else {
            message.channel.send(`I'm sorry ${message.member.user}, you don't have that permission!`);
        }
    }
}