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

const dateFormatDash = (date) => {
  const formatter = Intl.DateTimeFormat('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return formatter.format(date).replace(/\//g, '-');
};

const dateTimeFormat = (dateTime) => {
  const formatter = Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' });
  return formatter.format(dateTime);
};

exports.toCapital = toCapital;
exports.currencyFormat = currencyFormat;
exports.dateFormat = dateFormat;
exports.dateFormatDash = dateFormatDash;
exports.dateTimeFormat = dateTimeFormat;
