const express = require("express");

const trackingTokenService = require("./services/trackingToken.service");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send(":)");
});

// tracking follow pair :token-usdc
app.get("/tracking", trackingTokenService);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
