import uri from './uri';
import config from '../../config';
import rp from 'request-promise';

function define(word, callback) {
    if(!word) {
        callback({
            'type': 'error',
            'message': 'Please provide a word to define.'
        });
        return;
    }

    rp(generate_options(uri.TYPE.DEFINE, word)).then((result) => {
        const dictionaryEntry = result.results[0];
        const lexicalEntries = dictionaryEntry.lexicalEntries;

        let returnObject = {
            'type': 'success',
            'result': {
                'word': dictionaryEntry.word,
                'entries': []
            }
        };

        for(let i = 0; i < lexicalEntries.length; i++) {
            returnObject.result.entries.push({
                'lexicalCategory': lexicalEntries[i].lexicalCategory,
                'definitions': []
            });
            for(let j = 0; j < Math.min(lexicalEntries[i].entries[0].senses.length, 3); j++) {
                returnObject.result.entries[i].definitions.push(lexicalEntries[i].entries[0].senses[j].definitions[0]);
            }
        }
        callback(returnObject);
    }).catch((error) => {
        callback({
            'type': 'error',
            error
        });
    });
}

function synonyms(word, callback) {
    if(!word) {
        callback({
            'type': 'error',
            'message': 'Please provide a word to define.'
        });
        return;
    }

    rp(generate_options(uri.TYPE.SYNONYM, word)).then((result) => {
        const dictionaryEntry = result.results[0];
        const lexicalEntries = dictionaryEntry.lexicalEntries;

        let returnObject = {
            'type': 'success',
            'result': {
                'word': dictionaryEntry.word,
                'entries': []
            }
        };

        for(let i = 0; i < lexicalEntries.length; i++) {
            for(let j = 0; j < lexicalEntries[i].entries[0].senses[0].synonyms.length; j++) {
                returnObject.result.entries.push(lexicalEntries[i].entries[0].senses[0].synonyms[j].text);
            }
        }
        callback(returnObject);
    }).catch((error) => {
        callback({
            'type': 'error',
            error
        });
    });
}

function antonyms(word, callback) {
    if(!word) {
        callback({
            'type': 'error',
            'message': 'Please provide a word to define.'
        });
        return;
    }

    rp(generate_options(uri.TYPE.ANTONYM, word)).then((result) => {
        const dictionaryEntry = result.results[0];
        const lexicalEntries = dictionaryEntry.lexicalEntries;

        let returnObject = {
            'type': 'success',
            'result': {
                'word': dictionaryEntry.word,
                'entries': []
            }
        };

        for(let i = 0; i < lexicalEntries.length; i++) {
            for(let j = 0; j < lexicalEntries[i].entries[0].senses[0].antonyms.length; j++) {
                returnObject.result.entries.push(lexicalEntries[i].entries[0].senses[0].antonyms[j].text);
            }
        }
        callback(returnObject);
    }).catch((error) => {
        callback({
            'type': 'error',
            error
        });
    });
}

function generate_options(type, word) {
    return {
        uri: uri.URI(type, word),
        headers: {
            'User-Agent': 'Request-Promise',
            'app_id': config.DICTIONARY_API.APP_ID,
            'app_key': config.DICTIONARY_API.APP_KEY
        },
        json: true
    };
}

export default {
    define,
    synonyms,
    antonyms
};
