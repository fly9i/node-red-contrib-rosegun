const fetch = require('node-fetch');
let endpoint = "https://api.cognitive.microsofttranslator.com";

class Translator {
    key = "";
    constructor(key) {
        this.key = key;
    }

    async translate(text,target) {
        let url = `${endpoint}/translate?api-version=3.0&to=${target?target:'zh'}`
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Content-type': 'application/json'
            },

            body: JSON.stringify([{
                'text': text
            }])
        });
        let result = await res.json();
        return result[0].translations.text;
    }
}

module.exports = {Translator}
