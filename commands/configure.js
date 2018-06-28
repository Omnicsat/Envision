const Discord = require('discord.js');

module.exports = (client, message, args) => {
    if (!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) {
        message.channel.send('I have insufficient permissions to configure myself. Please give me the ADMINISTRATOR permission.');
        return;
    } else {
    
        message.guild.createRole({
            name: 'muted',
            color: 'RED',
        })
          .then(muterole => 
            client.log('Administration',`Created new muted role on guild ${message.guild.name} (${message.guild.id})`) &&
    
            message.guild.channels.filter(c =>
                c.type === "text"
            )
             .forEach(c => 
                    c.overwritePermissions(muterole, {
                     SEND_MESSAGES: false
                })
                  .catch(console.error)
            )
             .catch(console.error) &&
             message.channel.send(`Configured successfully`)
        );
    }
}