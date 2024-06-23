import { Component, effect, signal } from '@angular/core';
import { NextLaunchService } from '../../services/next-launch.service';
import { IconsModule } from '../../icons/icons.module';
import { LaunchService } from '../../services/launch.service';
import { NgIf } from '@angular/common';
import { SlinkyRotatorComponent } from '../slinky-rotator/slinky-rotator.component';

type NextLaunchViewModel = {
  name: string;
  date: string;
  webcastSource?: string;
  webcastUrl?: string;
};

@Component({
  selector: 'app-next-launch',
  standalone: true,
  imports: [IconsModule, NgIf, SlinkyRotatorComponent],
  templateUrl: './next-launch.component.html',
  styleUrl: './next-launch.component.css',
})
export class NextLaunchComponent {
  viewModel = signal<NextLaunchViewModel | undefined>(undefined);
  isLoading = signal(false);

  constructor(
    private nextLaunchService: NextLaunchService,
    private launchService: LaunchService,
  ) {
    this.isLoading.set(true);
    this.nextLaunchService
      .getNextLaunch()
      .then((launch) => {
        const date = this.launchService.getLaunchDate(launch);
        const name = launch.name;
        const webcastSource = launch.webcast?.source;
        const webcastUrl = launch.webcast?.url;
        this.viewModel.set({ date, name, webcastSource, webcastUrl });
        this.isLoading.set(false);
      })
      .catch(() => this.isLoading.set(false));
  }
}
