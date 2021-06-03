const toCapital = (str) => str[0].toUpperCase() + str.slice(1);

const currencyFormat = (num) => {
  const formatter = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  return formatter.format(num);
};

const dateFormat = (date) => {
  const formatter = Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' });
  return formatter.format(date);
};

const dateTimeFormat = (dateTime) => {
  const formatter = Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' });
  return formatter.format(dateTime);
};

exports.toCapital = toCapital;
exports.currencyFormat = currencyFormat;
exports.dateFormat = dateFormat;
exports.dateTimeFormat = dateTimeFormat;
