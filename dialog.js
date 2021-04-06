const data = require("./기초대화.json");
const brain = require("brain.js");

const neural_network = new brain.recurrent.LSTM();

const sampleData = data.map((k) => ({
  input: k.Q,
  output: k.A,
}));

//can t use brain because training time is too long

module.exports = {
  reply: async (msg) => {
    for (let i = 0; i < data.length; i++) {
      if (msg.indexOf(data[i].Q) != -1) {
        return data[i].A;
      }
    }
    return "죄송해요. 아직 배우지 못한 말이라서 이해를 못하겠어요";
  },
  init: () => {
    console.log("training...");
    try {
      const train = neural_network.train(sampleData, {
        iterations: 5000,
        log: true,
        logPeriod: 5,
        learningRate: 0.3,
      });
      if (train) console.log("taining ok");
    } catch (error) {
      console.log(error);
    }
  },
  intelligencereply: async (msg) => {
    let output = await neural_network.run(msg);
    return output;
  },
};
