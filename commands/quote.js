const Discord = require('discord.js');

module.exports = (client, message, args) => {
    let channel = message.guild.channels.find("name", args[1]);
    let messageId = args[0];

    if (!channel) {
        return message.channel.send("Please specify a real channel!");
    }

    channel.fetchMessage(messageId)
        .then(msg => {

            let embed = new Discord.RichEmbed();
            embed.setTitle("Quote:")
                .setAuthor(msg.member.displayName, msg.author.displayAvatarURL)
                .setColor(987)
                .setDescription(msg.cleanContent)
                .setTimestamp(msg.createdAt)
                .setFooter(`Quoted by ${message.member.displayName}`, message.author.displayAvatarURL)
                .setThumbnail(msg.author.displayAvatarURL);

            message.channel.send({embed});
            message.delete();

        })
        .catch(e => {
            console.error(e);
            message.channel.send('That message either does not exist, or is not in the right channel!');
        });

}