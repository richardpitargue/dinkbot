import Discord from 'discord.js';
import config from '../config';
import handler from './commands/handler';

const client = new Discord.Client();

client.on('ready', () => {
    console.log('i\'m ready!');
});

client.on('message', (message) => {
    handler(message);
});

client.login(config.TOKEN);
