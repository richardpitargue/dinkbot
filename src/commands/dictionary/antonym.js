import dictionary from '../../lib/dictionary';
import { RichEmbed } from 'discord.js';

export default async function(word, message) {
    const m = await message.channel.send('Searching antonyms of the word ' + word.toLowerCase() + '...');
    try {
        const embed = new RichEmbed();
        const result = await dictionary.antonyms(word);

        embed.setTitle('Antonyms for the word **' + result.word + '**');
        embed.setColor(0x0074D9);
        embed.setDescription(result.entries.join(', '));
        embed.setFooter('Requested by: ' + message.author.username, message.author.avatarURL);
        m.edit({embed});
    } catch(e) {
        if(e.statusCode === 404) {
            m.edit('better check your spelling, ho, i dont know that shit.');
        }
    }
}
