const ytdl = require("ytdl-core")

module.exports = (client, message, args) => {
    if (message.channel.type !== 'text') return;
    
    const { voiceChannel } = message.member;
    let url = args[0];
    
    if (!voiceChannel) {
        return message.reply('please join a voice channel first!');
    }
    
    voiceChannel.join().then(connection => {
        const stream = ytdl(url, { filter: 'audioonly' });
        const dispatcher = connection.playStream(stream);
    
        dispatcher.on('end', () => voiceChannel.leave());
    });
}