module.exports = (client) => {
    client.log('Ready', `Logged in as ${client.user.tag} at ${new Date()}!`);
}