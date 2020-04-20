const moment = require('moment');

const fbTimestampToDatetime = (input) => {
  if (!input || !input._seconds) {
    return null;
  }
  if (typeof input._seconds === 'string') {
    input._seconds = getDataFromJson(input._seconds);
  }
  const timestamp = input && input._seconds ? input._seconds.data : null;
  return timestamp ? moment.unix(timestamp).format('YYYY-MM-DD hh:mm:ss') : null;
};

const emptyOrNullToString = (input) => {
  if (typeof input === 'string') {
    input = getDataFromJson(input);
  }
  if (!input || input.type === 'null') {
    return '';
  }
  return input;
};

const emptyOrNullToNumber = (input) => {
  if (typeof input === 'string') {
    input = getDataFromJson(input);
  }
  if (!input || input.type === 'null') {
    return 0;
  }
  return input;
};

const getDataFromJson = (input) => {
  try {
    const data = JSON.parse(input);
    return data;
  } catch (e) {
    console.log(e);
    return input;
  }
};

const isJsonString = (input) => {
  try {
    JSON.parse(input);
  } catch (e) {
    return false;
  }
  return true;
};

module.exports = {
  fbTimestampToDatetime,
  emptyOrNullToString,
  emptyOrNullToNumber,
  isJsonString,
  getDataFromJson,
};
