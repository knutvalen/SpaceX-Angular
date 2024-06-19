import { DatePrecision } from './DatePrecision';

export type NextLaunch = {
  dateUtc: Date;
  datePrecision: DatePrecision;
  webcast: string;
  name: string;
  flightNumber: number;
};
