import { Injectable } from '@angular/core';
import { NextLaunch } from '../models/NextLaunch';
import { SpaceXApi } from './space-xapi';
import { PreviousLaunch } from '../models/PreviousLaunch';
import { Webcast } from '../models/Webcast';

const base =
  process.env['NODE_ENV'] === 'development'
    ? 'https://lldev.thespacedevs.com'
    : 'https://ll.thespacedevs.com';
const version = '2.2.0';

@Injectable({
  providedIn: 'root',
})
export class SpaceXApiService implements SpaceXApi {
  constructor() {}

  async getNextLaunch(): Promise<NextLaunch> {
    const query = new URLSearchParams({
      mode: 'detailed',
      limit: '1',
    });

    const response = await fetch(`${base}/${version}/launch/upcoming?${query}`);

    const data = await response.json();
    const result = data.results.at(0);

    const vidURL = result.vidURLs.at(0);
    const webcast: Webcast | undefined = vidURL
      ? { source: vidURL.source, url: vidURL.url }
      : undefined;

    return {
      name: result.name,
      webcast: webcast,
      netPrecision: result.net_precision.name,
      net: new Date(result.net),
    };
  }

  async getHistoricLaunches(limit: number): Promise<PreviousLaunch[]> {
    const query = new URLSearchParams({
      mode: 'normal',
      limit: limit.toString(),
    });

    const response = await fetch(`${base}/${version}/launch/previous?${query}`);

    const data = await response.json();

    return data.results.map((launch: any) => ({
      name: launch.name,
      net: new Date(launch.net),
      netPrecision: launch.net_precision.name,
    }));
  }
}
