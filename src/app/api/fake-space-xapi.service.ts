import { Injectable } from '@angular/core';
import { SpaceXApi } from './space-xapi';
import { NextLaunch } from '../models/NextLaunch';

@Injectable({
  providedIn: 'root',
})
export class FakeSpaceXApiService implements SpaceXApi {
  constructor() {}

  async getNextLaunch(): Promise<NextLaunch> {
    const fakeResponse: Response = await new Promise((resolve) => {
      const response: Response = new Response(
        JSON.stringify({
          flight_number: 188,
          name: 'USSF-44',
          date_precision: 'hour',
          date_utc: '2024-06-21T13:41:00.000Z',
          links: {
            webcast: 'https://youtu.be/pY628jRd6gM',
          },
        }),
      );
      resolve(response);
    });

    const data = await new Promise((resolve) => setTimeout(resolve, 200))
      .then(() => fakeResponse)
      .then((response) => response.json());

    return {
      name: data.name,
      webcast: data.links.webcast,
      netPrecision: data.date_precision,
      net: new Date(data.date_utc),
    };
  }

  async getHistoricLaunches(): Promise<any> {}
}
