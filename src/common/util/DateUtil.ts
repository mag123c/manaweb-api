import moment from 'moment-timezone';
moment.tz.setDefault('Asia/Seoul');
export const now = () => {
  return moment.utc(moment().format('YYYY-MM-DDTHH:mm:ss')).toDate();
};

export const now2 = () => {
  return moment();
};

export function getDate(date?: Date) {
  return moment(date).format('YYYY-MM-DD');
}

export function getDateTime(date?: Date) {
  const format = 'YYYY-MM-DD HH:mm:ss';
  return moment(date).format(format);
}

export function getDateTimeMinute(date?: Date) {
  const format = 'YYYY-MM-DD HH:mm';
  return moment(date).format(format);
}

export function calDay(addDay: number, targetDate: Date = new Date()) {
  return moment(targetDate).add(addDay, 'days');
}

export function calMonth(addMonth: number, targetDate: Date = new Date()) {
  return moment(targetDate).add(addMonth, 'month');
}

export function calYear(addYear: number, targetDate: Date = new Date()) {
  return moment(targetDate).add(addYear, 'year');
}

export function isBefore(curDate: Date, targetDate: Date = new Date()) {
  return moment(targetDate).isBefore(targetDate);
}

export function isAfter(curDate: Date, targetDate: Date = new Date()) {
  return moment(curDate).isAfter(targetDate);
}

export function getUnixTimeAfetrDay() {
  return (new Date().setDate(new Date().getDate() + 1)) / 1000;
}