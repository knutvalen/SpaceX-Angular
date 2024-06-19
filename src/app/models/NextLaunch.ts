import { DatePrecision } from './DatePrecision';
import { Webcast } from './Webcast';

export type NextLaunch = {
  net: Date;
  netPrecision: DatePrecision;
  webcast?: Webcast;
  name: string;
};
