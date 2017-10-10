import Discord from 'discord.js';

const client = new Discord.Client();

client.on('ready', () => {
    console.log('i\'m ready!');
});
