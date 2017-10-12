import dictionary from '../../lib/dictionary';
import { RichEmbed } from 'discord.js';

export default function(word, message) {
    const embed = new RichEmbed();
    dictionary.antonyms(word, (result) => {
        if(result.type === 'error') {
            console.log(result.message);
            console.log(result.error);
            embed.setDescription('Could not find synonyms for the word ' + word + '. Check your spelling?');
            embed.setColor(0xFF4136);
            message.channel.send({embed});
            return;
        }

        const res = result.result;

        embed.setTitle('Antonyms for the word **' + res.word + '**');
        embed.setColor(0x0074D9);
        embed.setDescription(res.entries.join(', '));
        message.channel.send({embed});
    });
}
