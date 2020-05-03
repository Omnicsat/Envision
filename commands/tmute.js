module.exports = (client, message, args) => {
    let operativeUser = message.guild.member(message.mentions.users.first());
    let timeOut = parseFloat(args[0]);

    if (!timeOut || timeOut < 0) {
        return message.reply("Please specify a valid mute time!");
    }
    if (!operativeUser) {
        return message.reply("Please specify a (real) user to mute!");
    };

    let operativeRole = message.guild.roles.cache.find(role => role.name === "muted");
    operativeUser.roles.add(operativeRole);

    client.setTimeout(function () {
        operativeUser.roles.remove(operativeRole)
            .then(message.channel.send(`The mute on ${operativeUser} has expired.`));
    }, timeOut * 60000);

    message.reply(`${operativeUser.displayName} has been muted for ${timeOut} minutes!`);
    client.log('Administration', `${operativeUser.user.tag} was muted by ${message.author.tag} for ${timeOut} minutes.`);
}