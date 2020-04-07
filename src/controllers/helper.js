function processLimit(input, defaultValue = 100, minValue = 1, maxValue = 1000) {
  let limit = parseInt(input) || defaultValue;
  limit = limit >= minValue ? limit : minValue;
  limit = limit <= maxValue ? limit : maxValue;
  return limit;
}

function processOffset(input, defaultValue = 0, minValue = 0) {
  let offset = parseInt(input) || defaultValue;
  offset = offset >= minValue ? offset : minValue;
  return offset;
}

module.exports = {
  processLimit,
  processOffset,
};
