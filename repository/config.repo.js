const ConfigModel = require("../models/configs");

const find = async (query = {}) => {
  return await ConfigModel.find(query).lean();
};

const findOneAndUpdate = async (filter, update) => {
  if (!filter || !update) return;
  return await PairConfig.findOneAndUpdate(filter, update).lean();
};

module.exports = {
  find,
  findOneAndUpdate,
};
