import { Inject, Injectable } from '@angular/core';
import { PreviousLaunch } from '../models/PreviousLaunch';
import { ApiInterface } from '../api/api.interface';
import { INJECTION_TOKEN } from '../api/injection-token';

@Injectable({
  providedIn: 'root',
})
export class HistoricLaunchesService {
  constructor(@Inject(INJECTION_TOKEN) private api: ApiInterface) {}

  async getHistoricLaunches(limit: number): Promise<PreviousLaunch[]> {
    return this.api.getHistoricLaunches(limit);
  }
}
