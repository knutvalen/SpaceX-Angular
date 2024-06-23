import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountdownComponent } from './components/countdown/countdown.component';
import { NextLaunchComponent } from './components/next-launch/next-launch.component';
import { HistoricLaunchesComponent } from './components/historic-launches/historic-launches.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CountdownComponent,
    NextLaunchComponent,
    HistoricLaunchesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
