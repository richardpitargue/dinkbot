export default {
    'TYPE': {
        'DEFINE': 'DEFINE',
        'SYNONYM': 'SYNONYM',
        'ANTONYM': 'ANTONYM'
    },
    URI: (type, word) => {
        if(type === 'DEFINE') {
            return 'https://od-api.oxforddictionaries.com/api/v1/entries/en/' + word.toLowerCase() + '/definitions';
        } else if(type === 'SYNONYM') {
            return 'https://od-api.oxforddictionaries.com/api/v1/entries/en/' + word.toLowerCase() + '/synonyms';
        } else if(type === 'ANTONYM') {
            return 'https://od-api.oxforddictionaries.com/api/v1/entries/en/' + word.toLowerCase() + '/antonyms';
        }
    }
};
