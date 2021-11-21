const UsersConfig = require("../models/users-config");
const TelegramService = require("../services/telegram.service");

const matchUserConfig = async (price) => {
  const users = await UsersConfig.find({}).lean();
  users.forEach(({ top, down, user }) => {
    if (price >= top || price <= down) {
      const telegramService = new TelegramService();
      return telegramService.sendMessage({
        chat_id: user.id,
        text: `PRICE: ${price}, MATCHED: price >= ${top} or price <= ${down}.`,
      });
    }
  });
};

module.exports = matchUserConfig;
