const Discord = require('discord.js');

module.exports = (client, message, args) => {
    let fields = args.join(" ").split("|");

    let title = fields[0];
    let channelTosend = message.guild.channels.find("name", fields[1]);
    let color = parseInt(fields[2]);
    let content = fields[3];

    if (!channelTosend) {
        return message.channel.send("Please specify a real channel.");
    }
    if (color > 16777215 || color < 0 || !color) {
        return message.channel.send("The number you have entered does not correspond to a real color. Please ensure it is less than 16777215, and is positive.");
    }

    let embed = new Discord.RichEmbed();
    embed.setColor(color)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setTitle(title)
        .setDescription(content)
        .setTimestamp(new Date())
        .setFooter(message.member.displayName, message.author.displayAvatarURL);

    channelTosend.send("Announcement:", embed);
}