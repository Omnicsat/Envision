module.exports = (client, member) => {
    client.log('GuildMemberAdd', `${member.user.tag} (${member.id}) has joined ${member.guild.name} (${member.guild.id})`);
    if (member.guild.channels.find('name', 'general-ooc')) {
        member.guild.channels.find('name', 'general-ooc').send(`Welcome ${member.user} to the ${member.guild} Discord!`);
    } else {
        return;
    }
}