
//This require returns multiple object getters
const {RTMClient} = require('@slack/rtm-api');
const {WebClient} = require('@slack/web-api');

//console.log((require('@slack/rtm-api')))

const token = 'xoxb-1403216044162-1390209857287-3QcJY9CbAWKOksfAsOdpAIQ6';
const rtm = new RTMClient(token);
const web = new WebClient(token);

rtm.start().catch(console.error)

rtm.on('ready', () => {
    console.log('Rtm Client set up');
    sendMessage('#general', "I am online!");
});

rtm.on('slack_event', async (eventType, event) => {
    console.log(eventType);
    console.log(event);
    if(event && eventType==='message'){
        if(event.text==='!hello')
            botGreet(event.channel, event.user);
    }
    if(event && eventType === 'member_joined_channel'){
        botWelcome(event.channel, event.user);
    }
});

function botGreet(channel, user){
    sendMessage(channel, `Hello <@${user}> :smiley:`)

}

function botWelcome(channel, user){
    sendMessage(channel, `Knock Knock <@${user}> is here :eyes:`)

}

async function sendMessage(channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text: message,
    });
}