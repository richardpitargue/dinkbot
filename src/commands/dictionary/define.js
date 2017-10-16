import dictionary from '../../lib/dictionary';
import { RichEmbed } from 'discord.js';

export default async function(word, message) {
    const m = await message.channel.send('Searching definitions of the word ' + word.toLowerCase() + '...');
    try {
        const embed = new RichEmbed();
        const result = await dictionary.define(word);

        embed.setTitle('Definitions for the word **' + result.word + '**');
        embed.setColor(0x0074D9);

        for(let i = 0; i < result.entries.length; i++) {
            embed.addField(result.entries[i].lexicalCategory, '- ' + result.entries[i].definitions.join('\n- '));
        }
        embed.setFooter('Requested by: ' + message.author.username, message.author.avatarURL);
        m.edit({embed});
    } catch(e) {
        if(e.statusCode === 404) {
            m.edit('Bitch ass ho that word doesn\'t exist fuck off.');
        }
    }
}
