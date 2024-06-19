import { Injectable } from '@angular/core';
import { NextLaunch } from '../models/NextLaunch';
import { SpaceXApiService } from '../api/space-xapi.service';

@Injectable({
  providedIn: 'root',
})
export class NextLaunchService {
  constructor(private api: SpaceXApiService) {}

  async getNextLaunch(): Promise<NextLaunch> {
    return await this.api.getNextLaunch();
  }

  async getTimeToNextLaunch(): Promise<number> {
    const nextLaunch = await this.getNextLaunch();
    const nowTime = new Date().getTime();
    const nextLaunchTime = new Date(nextLaunch.dateUtc).getTime();
    return Math.floor((nextLaunchTime - nowTime) / 1000);
  }
}
