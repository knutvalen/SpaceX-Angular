export type _DatePrecision =
  | 'quarter' // quarter of a year
  | 'half' // half of a year
  | 'year' // a year
  | 'month'
  | 'day'
  | 'hour';

// export enum DatePrecision {
//   Second = 0,
//   Minute = 1,
//   Hour = 2,
// }

export type DatePrecision = 'Second' | 'Minute' | 'Hour';
