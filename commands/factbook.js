module.exports = (client, message, args) => {
    // Sends the factbook entry associated with the name provided in the message
    let nationName = args[0];
    nationName.replace(/ /g, "_"); // Replaces all spaces in nationName with underscore
    let link = 'https://www.nationstates.net/nation='+nationName+'/detail=factbook';
    message.channel.send("Caution: the below link may not work. If so, check for typos in the nation you entered.");
    message.channel.send(link);
}
