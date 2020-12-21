'use strict';

const {WebClient} = require("@slack/web-api")

const bot_token = 'xoxb-1403216044162-1570908041618-rZULeU350D1Iha1JpGLml6VT';

const webClient = new WebClient(bot_token)

const sendMessage = async (message, conversationId)=> {
    try {
        const result = await webClient.chat.postMessage({
            text: message,
            channel: conversationId,
        });
        console.log("sent message")
    }
    catch (e) {
        console.log(e.data)
        console.log(e.message)
    }
}