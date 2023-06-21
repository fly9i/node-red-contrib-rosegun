const {Chatgpt} = require('../chatgpt')

module.exports = (RED) => {
    /**
     * Devices node constructor.
     * 
     * @param {object} config The node configuration.
     */
    function ChatgptNode(config) {
        // Create the node
        RED.nodes.createNode(this, config);
        var chatgpt = new Chatgpt(config.token,config.model,config.apiBaseUrl);
        var node = this;
        node.on('input', async function (msg) {
            var req = msg.payload;
            if (!req) {
                console.error("需要输入内容")
                msg.payload = "需要输入内容"
            } else {
                try {
                    var r = await chatgpt.get({req,conversationId:msg.conversationId,parentMessageId:msg.parentMessageId,onProgress(res){
                        let  a = msg;
                        a.payload = res.text;
                        a.chatgptResponse = res;
                        node.send([null,a])
                    }})
                    msg.payload = r.text
                    msg.origin = r;
                } catch (e) {
                    msg.payload = e.message;
                    msg.stack = e.stack;
                }
            }
            node.send([msg,null]);

        });
    }

    // Register node
    RED.nodes.registerType('chatgpt', ChatgptNode);
}
