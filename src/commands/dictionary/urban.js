import define from '../../lib/urbanDictionary';
import { RichEmbed } from 'discord.js';

export default async function(word, message) {
    const m = await message.channel.send('Searching urban dictionary for the word ' + word.toLowerCase() + '...');
    try {
        const embed = new RichEmbed();
        const result = await define(word);

        embed.setTitle(word);
        embed.setColor(0x2ECC40);
        embed.setFooter('Requested by: ' + message.author.username, message.author.avatarURL);
        embed.setDescription(result.definition);
        embed.addField('Example', result.example || '_no example_');
        embed.addField('Permalink', result.permalink);
        embed.addField('Upvotes', result.thumbsUp, true);
        embed.addField('Downvotes', result.thumbsDown, true);
        m.edit({embed});
    } catch(e) {
        m.edit(e.message);
    }
}
