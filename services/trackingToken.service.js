const puppeteer = require("puppeteer");
const TelegramService = require("./telegram.service");

const KRX_URL = "https://www.kryptodex.org/swap";

const crawlerPriceByPair = async (base, quote) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(KRX_URL);

  // select token base
  // console.log("\n1. select token base");
  await page.click("#swap-currency-input #pair");
  await page.click("#token-search-input");
  await page.keyboard.type(base);
  const xPathBase = `//div[text()='${base}']`;
  const [buttonInput] = await page.$x(xPathBase);
  if (buttonInput) await buttonInput.click();

  await page.waitForTimeout(200);

  // select token quote
  // console.log("\n2. select token quote");
  await page.click("#swap-currency-output #pair");
  await page.click("#token-search-input");
  await page.keyboard.type(quote);
  const xPathQuote = `//div[text()='${quote}']`;
  const [buttonOutput] = await page.$x(xPathQuote);
  if (buttonOutput) await buttonOutput.click();

  await page.waitForTimeout(300);

  // input price
  // console.log("\n3. input price");
  await page.click("#swap-currency-input .token-amount-input");
  await page.keyboard.type("100");

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
  const [base, quote] = req.params.pair.split("-").map((e) => e.toUpperCase());
  if (!base || !quote) return res.sendStatus(404);
  const data = await crawlerPriceByPair(base, quote);
  const telegramService = new TelegramService();
  const GROUP_ID = "-714416156";
  let lt = 100;
  let gt = 200;
  console.log("price", data);
  if (data < gt && data > lt) return;
  try {
    const data = await crawlerPriceByPair(base, quote);
    return telegramService.sendMessage({
      chat_id: GROUP_ID,
      text: `Matched with: lt = ${lt}, gt = ${gt}. ${base.toLowerCase()}-${quote.toLowerCase()}: ${data}`,
    });
  } catch (err) {
    console.error(new Date(), "Error in auto tracking");
  }
};

module.exports = {
  trackingTokenService,
  crawlerPriceByPair,
};
