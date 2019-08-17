const Discord = require('discord.js');
const botconfig = require('../botconfig.json');

module.exports.run = async (client, message, args) => {
    message.channel.send(`:wave: Hi! ${message.author.username} :wave:`);
}

module.exports.config = {
    name: "hello",
    aliases: ["hi"]
}