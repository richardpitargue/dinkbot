const RichEmbed = require('discord.js').RichEmbed;

module.exports = {
    name: 'about',
    description: 'Shows information about dinkbot.',
    execute: (message, args) => {
        const embed = new RichEmbed()
            .setTitle('About')
            .setDescription('I\'m DINK bot. Fuck you!')
            .setColor(0x39CCCC)
            .setFooter('Requested by ' + message.author.username, message.author.avatarURL);

        message.channel.send(embed);
    }
}