import { Injectable } from '@angular/core';
import { PreviousLaunch } from '../models/PreviousLaunch';
import { NextLaunch } from '../models/NextLaunch';

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  constructor() {}

  getLaunchDate(launch: NextLaunch | PreviousLaunch): string {
    if (launch.netPrecision === 'Hour') {
      return launch.net.toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
      });
    }

    if (launch.netPrecision === 'Minute') {
      return launch.net.toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    }

    if (launch.netPrecision === 'Second') {
      return launch.net.toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
    }

    throw Error(`Unknown net precision: ${launch.netPrecision}`);
  }
}
