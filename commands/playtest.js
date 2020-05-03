const ytdl = require("ytdl-core")
const queue = new Map();
module.exports = (client, message, args) => {
    const serverQueue = queue.get(message.guild.id);

    if (message.content.startsWith(`${client.config.prefix}play`)) {
        execute(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${client.config.prefix}skip`)) {
        skip(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${client.config.prefix}stop`)) {
        stop(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${client.config.prefix}list`)) {
        list(message, serverQueue);
        return;
    }

    async function execute(message, serverQueue) {
      
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
          return message.channel.send(
            "Please join a voice channel."
          );

        const songInfo = await ytdl.getInfo(args[0]);
        const song = {
          title: songInfo.title,
          url: songInfo.video_url
        };
      
        if (!serverQueue) {
          const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
          };
      
          queue.set(message.guild.id, queueContruct);
      
          queueContruct.songs.push(song);
      
          try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
          } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
          }
        } else {
          serverQueue.songs.push(song);
          return message.channel.send(`${song.title} has been added to the queue!`);
        }
      }
      
    function skip(message, serverQueue) {
        if (!message.member.voice.channel)
            return message.channel.send(
                "You must first join a voice channel."
            );
        if (!serverQueue)
            return message.channel.send("There are no songs in the queue");
        serverQueue.connection.dispatcher.end();
        }
      
    function stop(message, serverQueue) {
        if (!message.member.voice.channel)
            return message.channel.send("You must first join a voice channel.");
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        message.channel.send("The music has been stopped.")
        }

    function list(message, serverQueue) {
        if (!serverQueue)
        return message.channel.send("There are no songs in the queue.");
        message.channel.send(
            serverQueue.songs.map((song, index) => `**${index + 1}. ${song.title}**`).join('\n')
        )
    }
      
    function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
      
    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Now Playing: **${song.title}**`);
    } 
}