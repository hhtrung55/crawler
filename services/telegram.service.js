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

  sendMessage = async ({ chat_id, text }) => {
    return await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id,
      text,
    });
  };
}

module.exports = TelegramService;
