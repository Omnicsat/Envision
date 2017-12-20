module.exports = (client, message, args) => {
    let numberToDelete = parseInt(args[0]);
    if (!numberToDelete || numberToDelete < 2 || numberToDelete > 99) {
        message.channel.send("That is not a valid number!");
        return;
    } else {
        message.channel.bulkDelete(numberToDelete + 1);
        client.log('Administration', `${message.author.tag} purged ${numberToDelete} messages in channel ${message.channel.name} (${message.channel.id}).`)
    }

}