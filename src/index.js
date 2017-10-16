import Discord from 'discord.js';
import config from '../config';
import handler from './commands/handler';

const client = new Discord.Client();

client.on('ready', () => {
    console.log('DINK! I\'m ready.');
});

client.on('message', (message) => {
    handler(message);
});

client.login(config.TOKEN);

process.on('uncaughtException', err => console.error('Uncaught Exception: ', err));
process.on('unhandledRejection', err => console.error('Unhandled Rejection: ', err));
