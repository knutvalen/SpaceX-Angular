import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountdownComponent } from './components/countdown/countdown.component';
import { NextLaunchComponent } from './components/next-launch/next-launch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountdownComponent, NextLaunchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
