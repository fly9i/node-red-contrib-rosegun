// globalThis.fetch = require('node-fetch');
(async () => {
    if (typeof fetch !== "function") {
        globalThis.fetch = require('node-fetch')
    }

    // import { BingChat } from 'bing-chat'

    let chatgpt = await import('chatgpt');
    globalThis.chatgpt = chatgpt;

})();

const systemMessage = '';
class Chatgpt {
    apikey = ""
    api = null
    model = ""
    apiBaseUrl = ""
    constructor(apikey, model, apiBaseUrl) {
        this.apiKey = apikey;
        this.model = model;
        this.apiBaseUrl = apiBaseUrl;
        let options = {
            apiKey: apikey,
            completionParams: {
                model: model,
            }
        }
        if (apiBaseUrl) {
            options.apiBaseUrl = apiBaseUrl;
        }
        this.api = new globalThis.chatgpt.ChatGPTAPI(options)

    }

    get = async ({ req, conversationId, parentMessageId, onProgress }) => {
        return await this.api.sendMessage(req, { conversationId, parentMessageId, systemMessage, onProgress })
    }
}

module.exports = { Chatgpt }