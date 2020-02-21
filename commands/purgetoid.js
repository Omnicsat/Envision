module.exports = (client, message, args) => {
      let targetID = message.id;
      let targetChannel = message.channel;
      let toRemove = [];
      messages = targetChannel.fetchMessages( { limit: 1000 })
      for (x in messages) {
          if (x.id) == targetID) {
            break;
          } else {
            toRemove.push(x);
          }
      }
      if (toRemove.length < 1000) { // ensures that targetID was found rather than adding everything in the past 1000 messages to toRemove
        targetChannel.bulkDelete(toRemove);
        client.log('Administration, `${message.author.tag} purged messages in channel ${targetChannel.name} (${message.channel.id}) until ID $(targetID).`)');
      } else {
        targetChannel.send("Message ID not found. Aborting purge.");
      }
}
