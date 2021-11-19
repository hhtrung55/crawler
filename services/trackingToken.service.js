const puppeteer = require("puppeteer");

const KRX_URL = "https://www.kryptodex.org/swap";

const trackingTokenService = (req, res) => {
  res.send("ok");
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(KRX_URL);

    // select token base
    console.log("\n1. select token base");
    await page.click("#swap-currency-input #pair");
    await page.$eval("#token-search-input", (el) => (el.value = "BNB"));
    const [buttonInput] = await page.$x("//div[text()='BNB']");
    if (buttonInput) await buttonInput.click();

    await page.waitForTimeout(1000);

    // select token quote
    console.log("\n2. select token quote");
    await page.click("#swap-currency-output #pair");
    await page.$eval("#token-search-input", (el) => (el.value = "BUSD"));
    const [buttonOutput] = await page.$x("//div[text()='BUSD']");
    console.log(typeof buttonOutput);
    if (buttonOutput) await buttonOutput.click();

    await page.waitForTimeout(1000);

    // input price
    console.log("\n3. input price");
    await page.$eval(".token-amount-input", (el) => (el.value = 1));

    await page.waitForTimeout(4000);
    await browser.close();

    console.log("\n4. completed");
  })();
};

module.exports = trackingTokenService;
