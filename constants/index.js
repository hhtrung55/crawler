const secretToken =
  process.env.MODE === "production" ? process.env.TOKEN : process.env.TOKEN_DEV;

const TELEGRAM_API = `https://api.telegram.org/bot${secretToken}`;
const URI = `/webhook/${secretToken}`;
const WEBHOOK_URL = process.env.SERVER_URL + URI;

module.exports = {
  TELEGRAM_API,
  URI,
  WEBHOOK_URL,
};
