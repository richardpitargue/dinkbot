import dictionary from '../../lib/dictionary';
import { RichEmbed } from 'discord.js';

export default async function(word, message) {
    try {
        const embed = new RichEmbed();
        const result = await dictionary.synonyms(word);

        if(result.type === 'error') {
            embed.setDescription('Could not find synonyms for the word ' + word + '. Check your spelling?');
            embed.setColor(0xFF4136);
            message.channel.send({embed});
            return;
        }

        const res = result.result;

        embed.setTitle('Synonyms for the word **' + res.word + '**');
        embed.setColor(0x0074D9);
        embed.setDescription(res.entries.join(', '));
        message.channel.send({embed});
    } catch(e) {
        if(e.statusCode === 404) {
            message.channel.send('better check your spelling, ho, i dont know that shit.');
        }
    }
}
