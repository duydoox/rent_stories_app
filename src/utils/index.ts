import { format } from 'date-fns';

export function randomId() {
  return Math.random().toString(36).substring(2, 9);
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function dateFormat(date: Date) {
  return format(date, 'HH:mm - dd/MM/yyyy');
}

export function dayFormat(date: Date) {
  return format(date, 'dd/MM/yyyy');
}
