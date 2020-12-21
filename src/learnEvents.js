const {createEventAdapter} = require('@slack/events-api')
const {WebClient} = require('@slack/web-api')
const {createServer} = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const bot_token = 'xoxb-1403216044162-1570908041618-R1mLbCRChcRgg7hTz1Eltp5U';

const webClient = new WebClient(bot_token)


const signingSecret = 'd02c124db4a9ddecefa0d98b2cd09969'
const eventUrl = "https://117be3f33668.ngrok.io"
const slashCommand = "./node_modules/.bin/slack-verify --secret d02c124db4a9ddecefa0d98b2cd09969 [--path=/slack/events] [--port=3000]"

const port = 3000
const slackEvents = createEventAdapter(signingSecret)

const app = express()

app.use('/slack/events', (req, res, next)=>{
    console.log("Event!")
    next()
})
app.use('/slack/events', slackEvents.requestListener())

// app.use('', slackEvents.requestListener());
app.use(bodyParser)

slackEvents.on('app_mention', async (event) => {
    try {
        console.log("I got a mention in this channel", event.channel)
    } catch (e){
        console.log(e)
    }


})
const checkThread = async (thread)=>{
    let count = 0
    console.log(thread.length)
    for(let i=0;i<thread.length;i++){
        const msg = thread[i]
        if(msg.reply_count>0){
            count+=1
            console.log("This Message is a thread!!")
        }
    }
    console.log(count)
}
const getHistory = async (e)=>{
    try {
        const result = await webClient.conversations.history({
            channel: e.channel,
        });
        console.log("sent message")
        console.log(result)
        checkThread(result.messages)
    }
    catch (e) {
        console.log(e.data)
        console.log(e.message)
    }
}
slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    console.log(event)
    if(event.text==='!train'){
        console.log('fetching history')
        getHistory(event)
    }
});

app.listen(port, ()=>{
    console.log(`Listening to events on ${port}`)
})