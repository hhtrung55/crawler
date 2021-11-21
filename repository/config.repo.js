const UsersConfig = require("../models/users-config");

const find = async (query = {}) => {
  return await UsersConfig.find(query).lean();
};

const findOneAndUpdate = async (filter, update) => {
  if (!filter || !update) return;
  return await UsersConfig.findOneAndUpdate(filter, update).lean();
};

module.exports = {
  find,
  findOneAndUpdate,
};
