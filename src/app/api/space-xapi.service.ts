import { Injectable } from "@angular/core";
import { NextLaunch } from "../models/NextLaunch";

@Injectable({
  providedIn: 'root'
})
export class SpaceXApiService {

  constructor() { }

  async getNextLaunch(): Promise<NextLaunch> {
    const response = await fetch('https://api.spacexdata.com/latest/launches/next');
    const data = await response.json();
    return {
      datePrecision: data.date_precision,
      dateUtc: data.date_utc,
    };
  }
}
