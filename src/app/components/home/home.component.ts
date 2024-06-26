import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CountdownComponent } from '../countdown/countdown.component';
import { PreviousLaunchesComponent } from '../previous-launches/previous-launches.component';
import { NextLaunchComponent } from '../next-launch/next-launch.component';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CountdownComponent,
    PreviousLaunchesComponent,
    NextLaunchComponent,
    NgIf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  protected readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
