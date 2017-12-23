const Discord = require('discord.js')
const Canvas = require('canvas')
const Image = Canvas.Image;
const canvas = new Canvas(500, 300);
const ctx = canvas.getContext('2d');
const fs = require('fs');
const out = fs.createWriteStream('./text.png');

module.exports = (client, message, args) => {
  ctx.font = '30px Impact';
  ctx.fillText("Dynamic image rendering!", 50, 100);

  const stream = canvas.pngStream();

  stream.on('data', function (chunk) {
    out.write(chunk);
  });

  stream.on('end', function () {
    console.log('saved png');
    message.channel.send(new Discord.Attachment('./text.png'));
  });
}