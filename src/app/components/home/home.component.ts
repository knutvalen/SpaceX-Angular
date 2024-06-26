import { Component, HostBinding } from '@angular/core';
import { CountdownComponent } from '../countdown/countdown.component';
import { PreviousLaunchesComponent } from '../previous-launches/previous-launches.component';
import { NextLaunchComponent } from '../next-launch/next-launch.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountdownComponent, PreviousLaunchesComponent, NextLaunchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
