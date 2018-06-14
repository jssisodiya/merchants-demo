import _findIndex from 'lodash/findIndex';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';

class Utils {
  static getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  static isInArray(arr, value) {
    return _findIndex(arr, v => v === value) > -1 ? true : false;
  }
  static formatNumber(number = 0, format = 'comma') {
    switch (format) {
      case 'short':
        if (number >= 1000000) {
          return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+';
        }
        if (number >= 1000) {
          return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K+';
        }
        return number;
      case 'comma':
        var parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
      default:
        return parseInt(number, 10).toLocaleString();
    }
  }
  static formatDatetime(date, showTime = false) {
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    if (!date) return '';
    var d = new Date(date);

    let _date = d.getDate();
    if (_date < 10) {
      _date = `0${_date}`;
    }

    let str = `${_date}-${months[d.getMonth()]}-${d.getFullYear()}`;

    if (showTime) {
      let hrs = d.getHours();
      let mins = d.getMinutes();
      if (hrs < 10) {
        hrs = `0${hrs}`;
      }
      if (mins < 10) {
        mins = `0${mins}`;
      }
      str += ` ${hrs}:${mins}`;
    }
    return str;
  }
  static mergeQueryParams(queries) {
    if (!_isEmpty(queries)) {
      let queryArr = [];
      _map(queries, (value, key) => {
        queryArr.push(`${key}=${value}`);
      });
      return queryArr.join('&');
    } else return '';
  }
}
export default Utils;
