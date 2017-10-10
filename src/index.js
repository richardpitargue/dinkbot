import Discord from 'discord.js';
import config from '../config';

const client = new Discord.Client();

client.on('ready', () => {
    console.log('i\'m ready!');
});

client.login(config.TOKEN);
