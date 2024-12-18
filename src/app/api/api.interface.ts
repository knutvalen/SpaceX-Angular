import { NextLaunch } from '../models/NextLaunch';
import { PreviousLaunch } from '../models/PreviousLaunch';
import { LaunchDetails } from '../models/LaunchDetails';

export interface ApiInterface {
  getNextLaunch(): Promise<NextLaunch>;
  getHistoricLaunches(limit: number): Promise<PreviousLaunch[]>;
  getLaunchDetails(id: string): Promise<LaunchDetails>;
}
