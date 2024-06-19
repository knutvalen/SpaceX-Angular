import { Injectable } from '@angular/core';
import { SpaceXApiService } from '../api/space-xapi.service';
import { PreviousLaunch } from '../models/PreviousLaunch';

@Injectable({
  providedIn: 'root',
})
export class HistoricLaunchesService {
  constructor(private api: SpaceXApiService) {}

  async getHistoricLaunches(limit: number): Promise<PreviousLaunch[]> {
    return this.api.getHistoricLaunches(limit);
  }
}
