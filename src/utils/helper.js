const moment = require('moment');

const fbTimestampToDatetime = (input) => {
  const timestamp = input && input._seconds ? input._seconds.data : null;
  return timestamp ? moment.unix(timestamp).format('YYYY-MM-DD hh:mm:ss') : null;
};

const emptyOrNullToString = (input) => {
  if (!input || (typeof input === 'object' && input.type === 'null')) {
    return '';
  }
  return input;
};

module.exports = {
  fbTimestampToDatetime,
  emptyOrNullToString,
};
