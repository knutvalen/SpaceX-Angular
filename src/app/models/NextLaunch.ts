import { DatePrecision } from './DatePrecision';
import { Webcast } from './Webcast';

export type NextLaunch = {
  id: string;
  name: string;
  net: Date;
  netPrecision: DatePrecision;
  webcast: Webcast;
};
