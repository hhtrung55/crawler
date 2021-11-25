const axios = require("axios");
const { WEBHOOK_URL, TELEGRAM_API, URI } = require("../constants");

class TelegramService {
  init = async () => {
    try {
      const res = await axios.get(
        `${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`
      );
      console.log({
        WEBHOOK_URL,
        TELEGRAM_API,
      });
      console.log(res.data);
    } catch (err) {
      console.error("Error in init webhook");
    }
  };

  sleep = (ms = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  };

  sendMessage = async ({ chat_id, text }, loop = 1) => {
    if (!loop || loop <= 1) {
      return await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id,
        text,
      });
    }

    for (let i = 1; i <= loop; i++) {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id,
        text: `REMIND ${i}/${loop}: ${text}`,
      });
      await this.sleep(1500);
    }
  };
}

module.exports = TelegramService;
