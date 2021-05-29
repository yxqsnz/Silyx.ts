const humanSize = require('human-size');
module.exports.HumanSize = (bytes) => {
  return humanSize(bytes);
};
