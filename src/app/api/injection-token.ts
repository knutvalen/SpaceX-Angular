import { InjectionToken } from '@angular/core';
import { ApiInterface } from './api.interface';

export const INJECTION_TOKEN = new InjectionToken<ApiInterface>('API');
