const {
  GET_PRICE_CONFIG,
  UPDATE_PRICE_CONFIG,
} = require("../constants/actions");
const getUserConfig = require("../handlers/getUserConfig");
const updateUserConfig = require("../handlers/updateUserConfig");
const getPriceByPairService = require("../services/getPriceByPair.service");

const webhookTelegram = (req, res) => {
  res.sendStatus(200);
  const { message } = req.body;
  const { chat, text, from } = message;

  console.log("webhook", message);

  if (text[0] !== "/") return;
  if (text === GET_PRICE_CONFIG) {
    getUserConfig(message);
  } else if (text.includes(UPDATE_PRICE_CONFIG)) {
    updateUserConfig(message);
  } else {
    getPriceByPairService(message);
  }
};

module.exports = webhookTelegram;

// user {
//     text: '/krx-usdc',
//     chat: {
//       id: 1128193526,
//       first_name: 'Trung',
//       last_name: 'Hoang',
//       username: 'hhtrung55',
//       type: 'private'
//     },
//     from: {
//       id: 1128193526,
//       is_bot: false,
//       first_name: 'Trung',
//       last_name: 'Hoang',
//       username: 'hhtrung55',
//       language_code: 'en'
//     }
//   }

// group {
//     text: '/krx-usdc',
//     chat: {
//       id: -680679758,
//       title: 'KRXUSDC',
//       type: 'group',
//       all_members_are_administrators: true
//     },
//     from: {
//       id: 1128193526,
//       is_bot: false,
//       first_name: 'Trung',
//       last_name: 'Hoang',
//       username: 'hhtrung55',
//       language_code: 'en'
//     }
//   }