const ConfigRepo = require("../repository/config.repo");
const TelegramService = require("./telegram.service");
const { crawlerPriceByPair } = require("./trackingToken.service");
// /bnb-busd
const getPriceByPairService = async (req, res) => {
  res.sendStatus(200);
  const { message } = req.body;
  const { chat, text, from } = message;

  console.log({
    text,
    chat,
    from,
  });

  if (text[0] !== "/") return;
  const [base, quote] = text
    .slice(1)
    .split("-")
    .map((token) => token.toUpperCase());
  const telegramService = new TelegramService();
  if (!base || !quote) {
    return telegramService.sendMessage({
      chat_id: chat.id,
      text: "Wrong syntax. You need to enter text like this: /bnb-busd,/eth-usdt",
    });
  }

  try {
    telegramService.sendMessage({
      chat_id: chat.id,
      text: `Crawling...`,
    });
    const data = await crawlerPriceByPair(base, quote);
    return telegramService.sendMessage({
      chat_id: chat.id,
      text: `${base.toLowerCase()}-${quote.toLowerCase()}: ${data}`,
    });
  } catch (err) {
    console.error(new Date(), "Error in getPriceByPairService", err);
    return telegramService.sendMessage({
      chat_id: chat.id,
      text: `Sorry! Please typing again...`,
    });
  }
};

module.exports = getPriceByPairService;
