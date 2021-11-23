const secretToken = process.env.TOKEN;

const TELEGRAM_API = `https://api.telegram.org/bot${secretToken}`;
const URI = `/webhook/${secretToken}`;
const WEBHOOK_URL = process.env.SERVER_URL + URI;

const SECOND_TO_MS = 1000;

module.exports = {
  TELEGRAM_API,
  URI,
  WEBHOOK_URL,
  SECOND_TO_MS,
};
