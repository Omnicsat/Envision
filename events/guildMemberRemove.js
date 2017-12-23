module.exports = (client, member) => {
    client.log('GuildMemberRemove', `${member.user.tag} (${member.id}) has left ${member.guild.name} (${member.guild.id})`);
}