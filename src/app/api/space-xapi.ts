import { NextLaunch } from '../models/NextLaunch';
import { PreviousLaunch } from '../models/PreviousLaunch';

export interface SpaceXApi {
  getNextLaunch(): Promise<NextLaunch>;
  getHistoricLaunches(limit: number): Promise<PreviousLaunch[]>;
}
