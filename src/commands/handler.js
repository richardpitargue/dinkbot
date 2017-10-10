import config from '../../config';

export default function(message) {
    if(message.author.bot) return; // ignore messages sent by bots
    if(!message.content.startsWith(config.PREFIX)) return; //ignore messages that does not begin with the prefix
    
    const args = message.content.trim().split('/ +/g');
    const command = args.shift().slice(config.PREFIX.length);

    if(command === 'ping') {
        message.channel.send('pong!');
    }
}
