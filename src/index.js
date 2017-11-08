const Discord = require('discord.js');
const config = require('../config');
const fs = require('fs');
const path = require('path');

const client = new Discord.Client();

const commands = {};

fs
    .readdirSync(path.join(__dirname, 'commands'))
    .forEach(file => {
        const fileName = file.replace('.js', '');
        commands[fileName] = require('./commands/' + fileName);
    });

client.on('ready', () => console.log('DINK! I\'m ready!'));
client.on('message', message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.PREFIX)) return;

    const args = message.content.trim().split(' ');
    const command = commands[args.shift().slice(config.PREFIX.length)];

    if(command) {
        command.execute(message, args);
    }
});


client.login(config.TOKEN);