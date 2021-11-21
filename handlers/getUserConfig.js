const UsersConfig = require("../models/users-config");
const TelegramService = require("../services/telegram.service");

const getUserConfig = async ({ chat }) => {
  if (chat.type !== "private") return;
  const user = await UsersConfig.findOne({ "user.id": chat.id }).lean();
  const telegramService = new TelegramService();
  await telegramService.sendMessage({
    chat_id: chat.id,
    text: user
      ? JSON.stringify({ top: user.top, down: user.down })
      : "Not config yet",
  });
};

module.exports = getUserConfig;
