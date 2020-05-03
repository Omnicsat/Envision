const Discord = require('discord.js');

module.exports = (client, message, args) => {

    if (!args[1]) {
        return message.channel.send('Please provide a channel in which to fetch the quote, and a vald message ID.');
    }
    
    let channel = message.guild.channels.cache.find(channel => channel.name === args[1]);
    let messageId = args[0];

    channel.messages.fetch(messageId)
        .then(msg => {

            let embed = new Discord.MessageEmbed();
            embed.setTitle("Quote:")
                .setAuthor(msg.member.displayName, msg.author.displayAvatarURL)
                .setColor(987)
                .setDescription(msg.cleanContent)
                .setTimestamp(msg.createdAt)
                .setFooter(`Quoted by ${message.member.displayName}`, message.author.displayAvatarURL)
                .setThumbnail(msg.author.displayAvatarURL);

            message.channel.send({
                embed
            });
            message.delete();

        })
        .catch(e => {
            client.log('Error', `${message.author.tag} misquoted a message.`)
            message.channel.send('That message either does not exist, or is not in the right channel!');
        });

}