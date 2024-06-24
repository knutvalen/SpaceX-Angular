import { DatePrecision } from './DatePrecision';
import { Webcast } from './Webcast';

export type Status = {
  description: string;
  name: string;
};

export type LaunchServiceProvider = {
  description?: string;
  logo: string;
  name: string;
  url?: string;
};

export type Mission = {
  description?: string;
  name: string;
  orbit: string;
  type: string;
};

export type LaunchDetails = {
  id: string;
  lastUpdated: Date;
  launchServiceProvider: LaunchServiceProvider;
  mission: Mission;
  name: string;
  net: Date;
  netPrecision: DatePrecision;
  patch?: string;
  status: Status;
  webcasts: Webcast[];
};
