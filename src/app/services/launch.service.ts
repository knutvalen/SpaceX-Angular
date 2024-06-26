import { Inject, Injectable } from '@angular/core';
import { LaunchDetails } from '../models/LaunchDetails';
import { DatePrecision } from '../models/DatePrecision';
import { SpaceXApiInterface } from '../api/space-x-api.interface';
import { INJECTION_TOKEN } from '../api/injection-token';

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  constructor(@Inject(INJECTION_TOKEN) private api: SpaceXApiInterface) {}

  async getLaunchDetails(id: string): Promise<LaunchDetails> {
    return await this.api.getLaunchDetails(id);
  }

  getLaunchDate(netPrecision: DatePrecision, net: Date): string {
    if (netPrecision === 'Hour') {
      return net.toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
      });
    }

    if (netPrecision === 'Minute') {
      return net.toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    }

    if (netPrecision === 'Second') {
      return net.toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
    }

    throw Error(`Unknown net precision: ${netPrecision}`);
  }
}
