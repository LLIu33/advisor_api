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

function processFilter(input) {
  const result = [];
  for (const filter in input) {
    switch (filter) {
      case 'cost':
        result[filter] = +input[filter];
        break;
      case 'isNewlyOpened':
      case 'isPublic':
      case 'isTrending':
        result[filter] = input[filter] === 'true' || input[filter] === '1';
        break;
      case 'creatorId':
        result[filter] = input[filter];
        break;
    }
  }
  return result;
}

module.exports = {
  processLimit,
  processOffset,
  processFilter,
};
