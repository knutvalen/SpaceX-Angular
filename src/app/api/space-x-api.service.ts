import { Injectable } from '@angular/core';
import { NextLaunch } from '../models/NextLaunch';
import { SpaceXApiInterface } from './space-x-api.interface';
import { PreviousLaunch } from '../models/PreviousLaunch';
import { LaunchDetails } from '../models/LaunchDetails';

const base =
  process.env['NODE_ENV'] === 'development'
    ? 'https://lldev.thespacedevs.com'
    : 'https://ll.thespacedevs.com';
const version = '2.2.0';

enum Mode {
  detailed = 'detailed',
  normal = 'normal',
}

enum LaunchServiceProvider {
  spaceX = 'SpaceX',
}

@Injectable({
  providedIn: 'root',
})
export class SpaceXApiService implements SpaceXApiInterface {
  constructor() {}

  async getNextLaunch(): Promise<NextLaunch> {
    const query = new URLSearchParams({
      lsp__name: LaunchServiceProvider.spaceX,
      related: String(true),
      mode: Mode.detailed,
      limit: '1',
    });

    const response = await fetch(`${base}/${version}/launch/upcoming?${query}`);

    const json = await response.json();
    const data = json.results.at(0);

    return {
      id: data.id,
      name: data.name,
      webcast: data.vidURLs.at(0),
      netPrecision: data.net_precision.name,
      net: new Date(data.net),
    };
  }

  async getHistoricLaunches(limit: number): Promise<PreviousLaunch[]> {
    const query = new URLSearchParams({
      lsp__name: LaunchServiceProvider.spaceX,
      related: String(true),
      mode: Mode.normal,
      limit: limit.toString(),
    });

    const response = await fetch(`${base}/${version}/launch/previous?${query}`);
    const data = await response.json();

    return data.results.map((launch: any) => {
      return {
        name: launch.name,
        net: new Date(launch.net),
        netPrecision: launch.net_precision.name,
        id: launch.id,
      };
    });
  }

  async getLaunchDetails(id: string): Promise<LaunchDetails> {
    const query = new URLSearchParams({
      mode: Mode.detailed,
    });

    const response = await fetch(`${base}/${version}/launch/${id}?${query}`);
    const data = await response.json();

    return {
      id: data.id,
      lastUpdated: new Date(data.last_updated),
      launchServiceProvider: {
        name: data.launch_service_provider.name,
        description: data.launch_service_provider.description,
        url: data.launch_service_provider.info_url,
        logo: data.launch_service_provider.logo_url,
      },
      name: data.name,
      net: new Date(data.net),
      netPrecision: data.net_precision.name,
      status: { name: data.status.name, description: data.status.description },
      webcasts: data.vidURLs,
      mission: {
        description: data.mission.description,
        name: data.mission.name,
        orbit: data.mission.orbit.name,
        type: data.mission.type,
      },
      patch: data.mission_patches.at(0)?.image_url,
    };
  }
}
