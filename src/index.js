const Discord = require('discord.js');
const config = require('../config');

const client = new Discord.Client();

client.on('ready', () => console.log('DINK! I\'m ready!'));

client.on('message', message => {
    if(message.content === '!ping') {
        message.channel.send('pong!');
    } else if(message.content === '!pong') {
        message.channel.send('ping!');
    }
});

client.login(config.TOKEN);