const fs = require('fs');
const path = require('path');
const config = require('../../config.json');
const RichEmbed = require('discord.js').RichEmbed;

const commands = {};

fs
    .readdirSync(path.join(__dirname, '..', 'commands'))
    .forEach(file => {
        const fileName = file.replace('.js', '');
        commands[fileName] = require('../commands/' + fileName);
    });

module.exports = message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.PREFIX)) return;

    const args = message.content.trim().split(' ');
    const commandName = args.shift().slice(config.PREFIX.length);
    if(commandName === 'help') {
        const embed = new Discord.RichEmbed()
            .setTitle('All commands')
            .setDescription('Prefix is ' + config.PREFIX)
            .setColor(0x39CCCC)
            .setFooter('Requested by ' + message.author.username, message.author.avatarURL);

        Object.keys(commands).forEach(name => {
            embed.addField(commands[name].name, commands[name].description);
        });

        message.channel.send(embed);
    } else if(commandName === 'prefix') {
        if(args.length !== 1) {
            message.channel.send('wot?');
        } else {
            config.PREFIX = args[0].trim();
            fs.writeFileSync('config.json', JSON.stringify(config));
            message.channel.send('The prefix has been changed to `' + config.PREFIX + '`.');
        }
    } else {
        const command = commands[commandName];
        if(command) {
            command.execute(message, args);
        }
    }
}