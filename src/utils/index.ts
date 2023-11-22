import { format } from 'date-fns';

export function randomId() {
  return Math.random().toString(36).substring(2, 9);
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function dateFormat(date: Date | string) {
  const _date = new Date(date);
  return format(_date, 'HH:mm - dd/MM/yyyy');
}

export function dateFormatTwo(date: Date | string) {
  const _date = new Date(date);
  return format(_date, 'HH:mm') + '\n' + format(_date, 'dd/MM/yyyy');
}

export function dayFormat(date: Date | string) {
  const _date = new Date(date);
  return format(_date, 'dd/MM/yyyy');
}
