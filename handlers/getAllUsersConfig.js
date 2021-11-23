const UsersConfig = require("../models/users-config");
const TelegramService = require("../services/telegram.service");

const getAllUsersConfig = async ({ chat }) => {
  const users = await UsersConfig.find({});
  const data = users.map(({ user, top, down, loop }) => ({
    name: (user.first_name || "") + "_" + (user.last_name || ""),
    top,
    down,
    loop,
  }));
  const telegramService = new TelegramService();
  await telegramService.sendMessage({
    chat_id: chat.id,
    text: JSON.stringify(data),
  });
};

module.exports = getAllUsersConfig;
