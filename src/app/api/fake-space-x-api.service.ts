import { Injectable } from '@angular/core';
import { SpaceXApiInterface } from './space-x-api.interface';
import { NextLaunch } from '../models/NextLaunch';
import { LaunchDetails } from '../models/LaunchDetails';
import { PreviousLaunch } from '../models/PreviousLaunch';

@Injectable({
  providedIn: 'root',
})
export class FakeSpaceXApiService implements SpaceXApiInterface {
  delay: number;

  constructor() {
    this.delay = 1500;
  }

  async getNextLaunch(): Promise<NextLaunch> {
    const fakeResponse: Response = await new Promise((resolve) => {
      const response: Response = new Response(
        JSON.stringify({
          id: 'ad53f165-a118-43a6-ad46-6021accdaabd',
          name: 'Falcon Heavy | GOES-U',
          net: '2024-06-25T21:16:00Z',
          net_precision: {
            name: 'Second',
          },
          vidURLs: [
            {
              publisher: 'NASA',
              url: 'https://www.youtube.com/watch?v=F4HH_fL7QVk',
              type: {
                name: 'Official Webcast',
              },
            },
          ],
        }),
      );

      resolve(response);
    });

    const data = await new Promise((resolve) => setTimeout(resolve, this.delay))
      .then(() => fakeResponse)
      .then((response) => response.json());

    return {
      id: data.id,
      name: data.name,
      webcast: data.vidURLs.at(0),
      netPrecision: data.net_precision.name,
      net: new Date(data.net),
    };
  }

  async getHistoricLaunches(limit: number): Promise<PreviousLaunch[]> {
    const fakeResponse: Response = await new Promise((resolve) => {
      const response: Response = new Response(
        JSON.stringify({
          results: [
            {
              id: 'ad53f165-a118-43a6-ad46-6021accdaabd',
              name: 'Falcon Heavy | GOES-U',
              net: '2024-06-25T21:16:00Z',
              net_precision: {
                name: 'Second',
              },
            },
            {
              id: '53b0220d-25b1-47d7-9d68-956063c54d86',
              name: 'Falcon 9 Block 5 | Starlink Group 9-2',
              net: '2024-06-24T03:47:00Z',
              net_precision: {
                name: 'Second',
              },
            },
            {
              id: '63a205d7-ea27-4fd0-9fb7-f09f744433a3',
              name: 'Falcon 9 Block 5 | Starlink Group 10-2',
              net: '2024-06-23T17:15:00Z',
              net_precision: {
                name: 'Second',
              },
            },
            {
              id: 'e59f9e0b-fed2-4b12-a21b-ceda262bca5e',
              name: 'Falcon 9 Block 5 | Astra 1P/SES-24',
              net: '2024-06-20T21:35:00Z',
              net_precision: {
                name: 'Second',
              },
            },
            {
              id: '86600b01-7621-4106-9ae1-d7510328c29a',
              name: 'Falcon 9 Block 5 | Starlink Group 9-1',
              net: '2024-06-19T03:40:00Z',
              net_precision: {
                name: 'Second',
              },
            },
            {
              id: '32f98a5d-b605-4e18-9b92-9dbd59f0681f',
              name: 'Falcon 9 Block 5 | Starlink Group 8-8',
              net: '2024-06-08T12:58:00Z',
              net_precision: {
                name: 'Second',
              },
            },
            {
              id: 'cdc8274b-932e-48d6-9e8d-691969da4ad0',
              name: 'Falcon 9 Block 5 | Starlink Group 10-1',
              net: '2024-06-08T01:56:00Z',
              net_precision: {
                name: 'Second',
              },
            },
            {
              id: '2b1b756f-7207-4781-a874-aed61b38463d',
              name: 'Starship | Integrated Flight Test 4',
              net: '2024-06-06T12:50:00Z',
              net_precision: {
                name: 'Second',
              },
            },
            {
              id: '587cba9a-2a6c-46c9-9b06-630a1bf86fe3',
              name: 'Falcon 9 Block 5 | Starlink Group 8-5',
              net: '2024-06-05T02:16:00Z',
              net_precision: {
                name: 'Second',
              },
            },
            {
              id: 'cefe475a-fe70-4e46-9075-9c44c856975b',
              name: 'Falcon 9 Block 5 | Starlink Group 6-64',
              net: '2024-06-01T02:37:00Z',
              net_precision: {
                name: 'Second',
              },
            },
          ],
        }),
      );

      resolve(response);
    });

    const data = await new Promise((resolve) => setTimeout(resolve, this.delay))
      .then(() => fakeResponse)
      .then((response) => response.json());

    return data.results.map((launch: any) => ({
      name: launch.name,
      net: new Date(launch.net),
      netPrecision: launch.net_precision.name,
      id: launch.id,
    }));
  }

  async getLaunchDetails(id: string): Promise<LaunchDetails> {
    const fakeResponse: Response = await new Promise((resolve) => {
      const response: Response = new Response(
        JSON.stringify({
          id: '2b1b756f-7207-4781-a874-aed61b38463d',
          last_updated: '2024-06-21T05:16:09Z',
          launch_service_provider: {
            description:
              'Space Exploration Technologies Corp., known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California. It was founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars. SpaceX operates from many pads, on the East Coast of the US they operate from SLC-40 at Cape Canaveral Space Force Station and historic LC-39A at Kennedy Space Center. They also operate from SLC-4E at Vandenberg Space Force Base, California, usually for polar launches. Another launch site is being developed at Boca Chica, Texas.',
            info_url: 'http://www.spacex.com/',
            logo_url:
              'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/spacex_logo_20220826094919.png',
            name: 'SpaceX',
          },
          mission: {
            name: 'Integrated Flight Test 4',
            description:
              'Fourth test flight of the two-stage Starship launch vehicle.',
            type: 'Test Flight',
            orbit: { name: 'Suborbital' },
          },
          mission_patches: [
            {
              image_url:
                'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/mission_patch_images/starship2520if_mission_patch_20230414221655.png',
            },
          ],
          name: 'Starship | Integrated Flight Test 4',
          net: '2024-06-06T12:50:00Z',
          net_precision: {
            name: 'Minute',
          },
          status: {
            name: 'Launch Successful',
          },
          vidURLs: [
            {
              publisher: 'NASA',
              url: 'https://www.youtube.com/watch?v=F4HH_fL7QVk',
              type: {
                name: 'Official Webcast',
              },
            },
            {
              publisher: 'NASA',
              url: 'https://www.youtube.com/watch?v=F4HH_fL7QVk',
              type: {
                name: 'Official Webcast',
              },
            },
            {
              publisher: 'NASA',
              url: 'https://www.youtube.com/watch?v=F4HH_fL7QVk',
              type: {
                name: 'Official Webcast',
              },
            },
            {
              publisher: 'NASA',
              url: 'https://www.youtube.com/watch?v=F4HH_fL7QVk',
              type: {
                name: 'Official Webcast',
              },
            },
          ],
        }),
      );
      resolve(response);
    });

    const data = await new Promise((resolve) => setTimeout(resolve, this.delay))
      .then(() => fakeResponse)
      .then((response) => response.json());

    return {
      id: data.id,
      lastUpdated: new Date(data.last_updated),
      launchServiceProvider: {
        description: data.launch_service_provider.description,
        logo: data.launch_service_provider.logo_url,
        name: data.launch_service_provider.name,
        url: data.launch_service_provider.info_url,
      },
      mission: {
        description: data.mission.description,
        name: data.mission.name,
        orbit: data.mission.orbit.name,
        type: data.mission.type,
      },
      name: data.name,
      net: new Date(data.net),
      netPrecision: data.net_precision.name,
      patch: data.mission_patches.at(0)?.image_url,
      status: { name: data.status.name, description: data.status.description },
      webcasts: data.vidURLs,
    };
  }
}
