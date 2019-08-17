const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", async () => {
    console.log(`${client.user.username} is now Active!`);
    client.user.setActivity('With Discord!');
})

const fs = require('fs');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    const jsfile = files.filter(f => f.endsWith('.js'));
    if (jsfile.length <= 0) return console.log("[FS] Couldn't Find Commands!");

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        client.commands.set(pull.config.name, pull)
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name)
        })
    })
});

client.on("message", async message => {
    if(message.author.bot || message.channel.type === 'dm') return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandFile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
    if(commandFile) commandFile.run(client, message, args)
})

client.login(botconfig.token)