import dictionary from '../../lib/dictionary';
import { RichEmbed } from 'discord.js';

export default async function(word, message) {
    try {
        const embed = new RichEmbed();
        const result = await dictionary.antonyms(word);

        embed.setTitle('Antonyms for the word **' + result.word + '**');
        embed.setColor(0x0074D9);
        embed.setDescription(result.entries.join(', '));
        message.channel.send({embed});
    } catch(e) {
        if(e.statusCode === 404) {
            message.channel.send('better check your spelling, ho, i dont know that shit.');
        }
    }
}
