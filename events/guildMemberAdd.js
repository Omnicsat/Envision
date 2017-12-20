module.exports = (client, member) => {
    client.log('GuildMemberAdd', `${member.user.tag} (${member.id}) has joined ${member.guild.name} (${member.guild.id})`);
    member.guild.defaultChannel.send(`Welcome ${member.user} to the ${member.guild} Discord!`);
}