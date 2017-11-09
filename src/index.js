const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const path = require('path');

const client = new Discord.Client();

fs
    .readdirSync(path.join(__dirname, 'events'))
    .forEach(file => {
        const fileName = file.replace('.js', '');
        client.on(fileName, require('./events/' + fileName));
    });

client.login(config.TOKEN);