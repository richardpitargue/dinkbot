import config from '../../config';

import define from './dictionary/define';

export default function(message) {
    if(message.author.bot) return; // ignore messages sent by bots
    if(!message.content.startsWith(config.PREFIX)) return; //ignore messages that does not begin with the prefix

    const args = message.content.trim().split(' ');
    const command = args.shift().slice(config.PREFIX.length);

    if(command === 'ping') {
        message.channel.send('pong!');
    } else
    if(command === 'define'){
        if(args.length > 1) {
            message.channel.send('I will only provide definitions for the first word you provided, which is ' + args[0]);
        }

        define(args[0], message);
    }
}
