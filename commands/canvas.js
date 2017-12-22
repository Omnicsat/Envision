const Discord = require('discord.js')
const Canvas = require('canvas')
const Image = Canvas.Image;
const canvas = new Canvas(300, 300);
const ctx = canvas.getContext('2d');
const fs = require('fs');
const out = fs.createWriteStream('./text.png');

module.exports = (client, message, args) => {
    ctx.font = '30px Impact';
    ctx.rotate(0.1);
    ctx.fillText("Dynamic image rendering!", 50, 100);
    
    var te = ctx.measureText('Dynamic');
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + te.width, 102);
    ctx.stroke();

    const stream = canvas.pngStream();

    stream.on('data', function(chunk){
        out.write(chunk);
      });
       
      stream.on('end', function(){
        console.log('saved png');
        message.channel.send(new Discord.Attachment('./text.png'));
      });
}