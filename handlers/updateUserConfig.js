const UsersConfig = require("../models/users-config");
const TelegramService = require("../services/telegram.service");

const updateUserConfig = async ({ chat, text }) => {
  if (chat.type !== "private") return;
  const [prefix, top, down] = text.split(" ").map((e) => e.trim());
  let message = "Please type syntax like this: /update TOP_PRICE DOWN_PRICE";
  if (top && down) {
    await UsersConfig.findOneAndUpdate(
      { "user.id": chat.id },
      {
        top,
        down,
        user: chat,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    ).lean();
    message = `top = ${top}, down = ${down} updated`;
  }
  const telegramService = new TelegramService();
  await telegramService.sendMessage({
    chat_id: chat.id,
    text: message,
  });
};

module.exports = updateUserConfig;
