import rp from 'request-promise';

async function define(word) {
    const result = await rp(generate_options(word));

    if(result.result_type === 'no_results') {
        throw new Error('Congrats! You found a word that Urban Dictionary cannot define. Are you proud of yourself?');
    }

    return {
        'definition': result.list[0].definition,
        'permalink': result.list[0].permalink,
        'example': result.list[0].example,
        'thumbsUp': result.list[0].thumbs_up,
        'thumbsDown': result.list[0].thumbs_down
    };
}

function generate_options(word) {
    return {
        uri: 'http://api.urbandictionary.com/v0/define?term=' + word.toLowerCase(),
        headers: {
            'User-Agent': 'Request-Promise',
        },
        json: true
    };
}

export default define;
