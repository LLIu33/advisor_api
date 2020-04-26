const jsonToPeriods = (json) => {
  return json.periods
    ? json.periods.map((item) => {
        return jsonToPeriod(item);
      })
    : { periods: [] };
  function jsonToPeriod(json) {
    return {
      openDay: json.open.day,
      openTime: json.open.time,
      closeDay: json.close.day,
      closeTime: json.close.time,
      closed: json.closed || false,
    };
  }
};

const periodToJson = (period) => {
  return {
    open: {
      day: period.openDay,
      time: period.openTime,
    },
    close: {
      day: period.closeDay,
      time: period.closeTime,
    },
    closed: period.closed,
  };
};

const shortPeriodToJson = (period) => {
  return [period.openDay, period.openTime, period.closeDay, period.closeTime];
};

module.exports = {
  jsonToPeriods,
  periodToJson,
  shortPeriodToJson,
};
