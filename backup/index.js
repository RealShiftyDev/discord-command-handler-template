const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", async () => {
    console.log(`${client.user.username} is now Active!`);
    client.user.setActivity('With Discord!');
})

client.on("message", async message => {
    if(message.author.bot || message.channel.type === 'dm') return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
})