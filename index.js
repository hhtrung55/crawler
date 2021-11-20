const express = require("express");
require("dotenv").config();

const { trackingTokenService } = require("./services/trackingToken.service");
const getPriceByPairService = require("./services/getPriceByPair.service");
const TelegramService = require("./services/telegram.service");

const { URI } = require("./constants");

const app = express();

app.use(express.json());

app.get("/ping", function (req, res) {
  res.send(":)");
});
app.get("/tracking/:pair", trackingTokenService);

// telegram
app.post(URI, getPriceByPairService);

new TelegramService().init();

app.listen(process.env.PORT, () => {
  console.log(`Crawler-krx listening at http://localhost:${process.env.PORT}`);
});
