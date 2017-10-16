import dictionary from '../../lib/dictionary';
import { RichEmbed } from 'discord.js';

export default async function(word, message) {
    try {
        const embed = new RichEmbed();
        const result = await dictionary.define(word);

        if(result.type === 'error') {
            embed.setDescription('Could not find a definition for the word ' + word + '. Check your spelling?');
            embed.setColor(0xFF4136);
            message.channel.send({embed});
            return;
        }

        const res = result.result;

        embed.setTitle('Definitions for the word **' + res.word + '**');
        embed.setColor(0x0074D9);
        for(let i = 0; i < res.entries.length; i++) {
            embed.addField(res.entries[i].lexicalCategory, '- ' + res.entries[i].definitions.join('\n- '));
        }
        message.channel.send({embed});
    } catch(e) {
        if(e.statusCode === 404) {
            message.channel.send("Bitch ass ho that word doesn't exist fuck off.");
        }
    }
}
