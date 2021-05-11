const { NlpManager } = require("node-nlp");
const askdata = require("./Doc.json");
const answerdata = require("./Ans.json");
const nlp = new NlpManager({ languages: ["ko"], forceNER: true });

module.exports = {
  Init: async () => {
    try {
      for (let i = 0; i < askdata.length; i++) {
        nlp.addDocument("ko", askdata[i].text, askdata[i].intent);
      }

      for (let i = 0; i < answerdata.length; i++) {
        nlp.addAnswer("ko", answerdata[i].intent, answerdata[i].text);
      }
      await nlp.train();
      nlp.save();
    } catch (error) {}
  },
  Response: async (msg) => {
    try {
      const response = await nlp.process("ko", msg);

      return response;
    } catch (error) {
      return "아직 모르는 말이야";
    }
  },
};
