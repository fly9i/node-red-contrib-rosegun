const {Translator} = require('../module/translator')

module.exports = (RED) => {
    /**
     * Devices node constructor.
     * 
     * @param {object} config The node configuration.
     */
    function TranslatorNode(config) {
        // Create the node
        RED.nodes.createNode(this, config);
        var translator = new Translator(config.token);
        var node = this;
        node.on('input', async function (msg) {
            var req = msg.payload;
            if (!req) {
                console.error("需要输入内容")
                msg.payload = "需要输入内容"
            } else {
                try {
                    var r = await translator.translate(req,msg.language);
                    msg.payload = r;
                } catch (e) {
                    msg.payload = e.message;
                    msg.stack = e.stack;
                    node.send([null,msg]);
                    return;
                }
            }
            node.send([msg,null]);

        });
    }

    // Register node
    RED.nodes.registerType('translate', TranslatorNode);
}
