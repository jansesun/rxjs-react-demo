const addZero = function(num, len) {
  if(len === undefined) {
    len = 2;
  }
  num += '';
  return num.padStart(len, '0');
};
export default {
  className(obj) {
    const set = new Set();
    if(!Array.isArray(obj)) {
      obj = [obj];
    }
    obj.forEach((o) => {
      if(typeof o === 'string') {
        set.add(o);
      } else {
        Object.keys(o).forEach((key) => {
          if(o[key]) {
            set.add(key);
          }
        });
      }
    });
    return Array.from(set.values()).join(' ');
  },
  bindMethods(methods, obj) {
    methods.forEach((method) => {
      if(typeof obj[method] === 'function') {
        obj[method] = obj[method].bind(obj);
      }
    });
  },
  /**
   * Format date to a language sensitive representation
   * @param  {Any} date  Any value can be accepted by Date constructor
   * @param  {String} format valid date format string
   * @param  {Object} [option] options
   * @config  {String} [year='numeric'] The representation of the year. Possible values are 'numeric' as 2016, '2-digit' as 16
   * @config  {String} [month] The representation of the month. Possible values are 'numeric' as 1, '2-digit' as 01, 'short' as 'Jan', 'long' as 'January'
   * @config  {String} [date='2-digit'] The representation of the date. Possible values are 'numeric' as 1, '2-digit' as 01
   * @config  {String} [minutes='2-digit'] The representation of the minutes. Possible values are 'numeric' as 1, '2-digit' as 01
   * @config  {String} [seconds='2-digit'] The representation of the seconds. Possible values are 'numeric' as 1, '2-digit' as 01
   * @return {String}  a string to a language sensitive representation of the date
   * @example
   *    Feb 23, 2016 | 2:14 pm
   *    util.formatDate(date, 'MM dd, yyyy | hh:mm nn', {
   *      month: 'short'
   *    );
   */
  formatDate(date, format, option) {
    let longMonths, hour;
    option = Object.assign({
      date: '2-digit',
      minutes: '2-digit',
      seconds: '2-digit',
      lang: 'en'
    }, option);
    option.hour12 = format.toLowerCase().indexOf('nn') > -1;
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if(option.lang === 'pt') {
      longMonths = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    }
    const formatReg = /yyyy|MM|dd|hh|mm|nn|NN|ss|ww/g;
    date = new Date(date);
    const month = date.getMonth();
    hour = date.getHours();
    const meridiem = hour > 11 ? 'PM' : 'AM';
    if(option.hour12 && hour > 12) {
      hour %= 12;
    }
    const dateObj = {
      y: option.year === '2-digit' ? addZero(date.getFullYear() % 100) : date.getFullYear(),
      d: option.date === '2-digit' ? addZero(date.getDate()) : date.getDate(),
      h: option.hours === '2-digit' ? addZero(hour) : hour,
      m: option.minutes === '2-digit' ? addZero(date.getMinutes()) : date.getMinutes(),
      s: option.seconds === '2-digit' ? addZero(date.getSeconds()) : date.getSeconds(),
      w: date.getDay() || 7,
      N: meridiem,
      n: meridiem.toLowerCase()
    };
    if(option.month === 'short') {
      dateObj.M = shortMonths[month];
    } else if(option.month === 'long') {
      dateObj.M = longMonths[month];
    } else if(option.month === '2-digit') {
      dateObj.M = addZero(month + 1);
    } else {
      dateObj.M = month + 1;
    }
    return format.replace(formatReg, a => dateObj[a[0]]);
  }
};