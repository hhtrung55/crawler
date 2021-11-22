const UsersConfig = require("../models/users-config");
const TelegramService = require("../services/telegram.service");

const updateLoopNotification = async ({ chat, text }) => {
  if (chat.type !== "private") return;
  const [, loop] = text.split(" ").map((e) => e.trim());
  let message = "Wrong syntax";
  if (parseInt(loop) > 0) {
    await UsersConfig.findOneAndUpdate(
      { "user.id": chat.id },
      {
        loop,
        user: chat,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    ).lean();
    message = `Loop = ${loop} updated`;
  }
  const telegramService = new TelegramService();
  await telegramService.sendMessage({
    chat_id: chat.id,
    text: message,
  });
};

module.exports = updateLoopNotification;
