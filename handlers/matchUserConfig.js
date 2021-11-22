const { LOOP_NOTIFICATION } = require("../constants/actions");
const UsersConfig = require("../models/users-config");
const TelegramService = require("../services/telegram.service");

const matchUserConfig = async (price) => {
  const users = await UsersConfig.find({}).lean();
  users.forEach(async ({ top, down, user, loop = 1 }) => {
    if (price >= top || price <= down) {
      const telegramService = new TelegramService();
      telegramService.sendMessage(
        {
          chat_id: user.id,
          text: `${price} | ${top} | ${down}.`,
        },
        loop
      );
    }
  });
};

module.exports = matchUserConfig;
