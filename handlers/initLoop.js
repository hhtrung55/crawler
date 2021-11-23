const axios = require("axios");
const { sleep } = require("../utils");
const { SECOND_TO_MS } = require("../constants");

const initLoop = async () => {
  while (true) {
    await sleep(20 * SECOND_TO_MS);
    try {
      await axios.get(`http://localhost:${process.env.PORT}/realtime/krx-usdc`);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = initLoop;
