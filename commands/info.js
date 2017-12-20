const Discord = require('discord.js');

module.exports = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setColor(987)
        .setAuthor("Envision Information Page", client.user.displayAvatarURL)
        .setTitle("Main Envision Information Page")
        .setDescription(`Run ${client.config.prefix}help <command> for usage information.`)
        .addField("Primary Commands", Array.from(client.commands.keys()), true)
        .addField("Administrative Commands", Array.from(client.adminCommands.keys()), true)
        .setTimestamp(new Date())
        .setFooter(`Online for: ${Math.floor(client.uptime / 86400000)} days, ${Math.floor((client.uptime / 3600000) % 24)} hours, ${Math.floor((client.uptime / 60000) % 60)} minutes, and ${Math.floor((client.uptime / 1000) % 60)} seconds.`, message.author.displayAvatarURL);

    message.channel.send({embed});
}