const puppeteer = require("puppeteer");
const matchUserConfig = require("../handlers/matchUserConfig");

const TelegramService = require("./telegram.service");
const DECIMAL = 3;

const KRX_URL = "https://www.kryptodex.org/swap";
const GROUP_REALTIME = "-680679758";

const crawlerPriceByPair = async (base, quote) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(KRX_URL);

  // select token base
  // console.log("\n1. select token base");
  await page.click("#swap-currency-input #pair");
  await page.click("#token-search-input");
  await page.keyboard.type(base, { delay: 200 });

  await page.waitForTimeout(300);
  await page.keyboard.down("Enter");
  await page.waitForTimeout(300);

  // select token quote
  // console.log("\n2. select token quote");
  await page.click("#swap-currency-output #pair");
  await page.click("#token-search-input");
  await page.keyboard.type(quote, { delay: 200 });

  await page.waitForTimeout(300);
  await page.keyboard.down("Enter");
  await page.waitForTimeout(300);

  // input price
  // console.log("\n3. input price");
  await page.click("#swap-currency-input .token-amount-input");
  await page.keyboard.type("1", { delay: 200 });

  // get price
  // console.log("\n4. get price");
  await page.waitForTimeout(400);

  const priceOutput = await page.$eval(
    "#swap-currency-output .token-amount-input",
    (el) => el.value
  );

  const output = {
    base,
    quote,
    priceOutput,
    date: new Date(),
  };

  // console.log("\n5. completed", output);

  browser.close();
  return priceOutput;
};

const trackingTokenService = async (req, res) => {
  console.log(`Auto tracking at ${new Date().toString()}`);
  res.send("ok");
  const [base, quote] = req.params.pair.split("-").map((e) => e.toUpperCase());
  if (!base || !quote) return res.sendStatus(404);
  const data = await crawlerPriceByPair(base, quote);
  const telegramService = new TelegramService();
  const GROUP_ID = "-714416156";
  let lt = 1.2;
  let gt = 1.6;
  console.log("price", data);
  if (!Number(data)) return;
  if (data < gt && data > lt) return;
  try {
    const data = await crawlerPriceByPair(base, quote);
    return telegramService.sendMessage({
      chat_id: GROUP_ID,
      text: `${base}${quote} matched lt: ${lt}, gt${gt}: ${data}`,
    });
  } catch (err) {
    console.error(new Date(), "Error in auto tracking");
  }
};

let latestPrice = 0;

const trackingTokenRealtimeService = async (req, res) => {
  res.send("ok");
  const [base, quote] = req.params.pair.split("-").map((e) => e.toUpperCase());
  if (!base || !quote) return res.send("404");
  try {
    const data = await crawlerPriceByPair(base, quote);
    const currentPrice = parseFloat(data).toFixed(DECIMAL) || 0;
    if (currentPrice === latestPrice || !data) return;
    console.log("GROUP_REALTIME PRICE", currentPrice, new Date().toString());

    latestPrice = currentPrice;

    matchUserConfig(currentPrice);

    const telegramService = new TelegramService();
    return telegramService.sendMessage({
      chat_id: GROUP_REALTIME,
      text: currentPrice,
    });
  } catch (err) {
    console.error(new Date(), "Error in auto tracking");
  }
};

module.exports = {
  trackingTokenService,
  crawlerPriceByPair,
  trackingTokenRealtimeService,
};
