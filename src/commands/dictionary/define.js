import rp from 'request-promise';
import { RichEmbed } from 'discord.js';
import config from '../../../config';

export default function(word, message) {
    const options = generate_options(word);

    if(!options) {
        message.channel.send('There was an error processing your request. Try again.')
    }

    rp(options)
    .then((result) => {
        const dictionaryEntry = result.results[0];
        const lexicalEntries = dictionaryEntry.lexicalEntries;

        const embed = new RichEmbed();

        embed.setTitle('Definitions for the word: ' + dictionaryEntry.word);
        embed.setColor(0x0070FF);
        for(let i = 0; i < lexicalEntries.length; i++) {
            let fieldValue = '';
            for(let j = 0; j < Math.min(lexicalEntries[i].entries[0].senses.length, 3); j++) {
                fieldValue = fieldValue + '- ' + lexicalEntries[i].entries[0].senses[j].definitions[0] + '\n';
            }
            embed.addField(lexicalEntries[i].lexicalCategory, fieldValue);
        }

        message.channel.send({embed});
    })
    .catch((error) => {
        if(error.statusCode === 404) {
            message.channel.send('I could not find definitions for the word: ' + word + '. Please try again.');
            return;
        }
        message.channel.send('There was an error processing your request. Try again.')
    });
}

function generate_options(word) {
    if(!word || word === '') return false;

    return {
        uri: 'https://od-api.oxforddictionaries.com/api/v1/entries/en/' + word.toLowerCase(),
        headers: {
            'User-Agent': 'Request-Promise',
            'app_id': config.DICTIONARY_API.APP_ID,
            'app_key': config.DICTIONARY_API.APP_KEY
        },
        json: true
    };
}
