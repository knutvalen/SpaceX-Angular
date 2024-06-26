import { InjectionToken } from '@angular/core';
import { SpaceXApiInterface } from './space-x-api.interface';

export const INJECTION_TOKEN = new InjectionToken<SpaceXApiInterface>(
  'SpaceXApi',
);
