import { Inject, Injectable } from '@angular/core';
import { NextLaunch } from '../models/NextLaunch';
import { ApiInterface } from '../api/api.interface';
import { INJECTION_TOKEN } from '../api/injection-token';

@Injectable({
  providedIn: 'root',
})
export class NextLaunchService {
  constructor(@Inject(INJECTION_TOKEN) private api: ApiInterface) {}

  async getNextLaunch(): Promise<NextLaunch> {
    return await this.api.getNextLaunch();
  }

  async getTimeToNextLaunch(): Promise<number> {
    const nextLaunch = await this.getNextLaunch();
    const nowTime = new Date().getTime();
    const nextLaunchTime = new Date(nextLaunch.net).getTime();
    return Math.floor((nextLaunchTime - nowTime) / 1000);
  }
}
