import { Injectable } from '@angular/core';
import { NextLaunch } from '../models/NextLaunch';

@Injectable({
  providedIn: 'root',
})
export class SpaceXApiService {
  constructor() {}

  async getNextLaunch(): Promise<NextLaunch> {
    // const response = await fetch(
    //   'https://api.spacexdata.com/latest/launches/next',
    // );

    const fakeResponse: Response = await new Promise((resolve) => {
      const response: Response = new Response(
        JSON.stringify({
          flight_number: 188,
          name: 'USSF-44',
          date_precision: 'hour',
          date_utc: '2022-11-01T13:41:00.000Z',
          links: {
            webcast: 'https://youtu.be/pY628jRd6gM',
          },
        }),
      );
      resolve(response);
    });

    // const data = await response.json();
    const data = await new Promise((resolve) => setTimeout(resolve, 200))
      .then(() => fakeResponse)
      .then((response) => response.json());

    return {
      flightNumber: data.flight_number,
      name: data.name,
      webcast: data.links.webcast,
      datePrecision: data.date_precision,
      dateUtc: new Date(data.date_utc),
    };
  }
}
