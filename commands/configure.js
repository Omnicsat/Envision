const Discord = require('discord.js');

module.exports = (client, message, args) => {
    if (!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) {
        message.channel.send('I have insufficient permissions to configure myself. Please give me the ADMINISTRATOR permission.');
        return;
    } else {
    
        let muterole = message.guild.createRole({
            name: 'muted',
            color: 'RED',
        })
          .then(role => client.log('Administration',`Created new muted role on guild ${message.guild.name} (${message.guild.id})`))
          .catch(console.error);
    
        message.guild.channels.filter(c =>
            c.type === "text"
        )
         .forEach(c => 
                c.overwritePermissions(mutedrole, {
                 SEND_MESSAGES: false
            })
              .catch(console.error)
        );
    }
}