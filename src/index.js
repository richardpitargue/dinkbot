import Discord from 'discord.js';

const client = new Discord.Client();

client.on('ready', () => {
    console.log('i\'m ready!');
});

client.login('MzYyMTg5MDk5MzcwNjc2MjM0.DKvCcQ.KloYUv3PtoRFk_sEYCYfgA1BjRw');
