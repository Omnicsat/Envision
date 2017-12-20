const Discord = require('discord.js');
const nsapi = require("nsapi");
const api = new nsapi.NsApi('Omniabstracta');

module.exports = (client, message, args) => {
    let wfe = api.regionRequest('Kerbin', ['factbook']).then(data => {
        let text = data['factbook'].split('url')[1].split('=')[1].split(']')[0];
        message.channel.send(new Discord.Attachment(text));
    });
}