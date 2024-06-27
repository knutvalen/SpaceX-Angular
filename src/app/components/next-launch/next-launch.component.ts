import { Component, signal } from '@angular/core';
import { NextLaunchService } from '../../services/next-launch.service';
import { IconsModule } from '../../icons/icons.module';
import { LaunchService } from '../../services/launch.service';
import { NgIf } from '@angular/common';
import { Webcast } from '../../models/Webcast';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { BasicLoaderComponent } from '../basic-loader/basic-loader.component';

type NextLaunchViewModel = {
  id: string;
  name: string;
  date: string;
  webcast?: Webcast;
};

@Component({
  selector: 'app-next-launch',
  standalone: true,
  imports: [IconsModule, NgIf, ButtonComponent, BasicLoaderComponent],
  templateUrl: './next-launch.component.html',
  styleUrl: './next-launch.component.css',
})
export class NextLaunchComponent {
  viewModel = signal<NextLaunchViewModel | undefined>(undefined);
  isLoading = signal(false);

  constructor(
    private nextLaunchService: NextLaunchService,
    private launchService: LaunchService,
    private router: Router,
  ) {
    this.isLoading.set(true);
    this.nextLaunchService
      .getNextLaunch()
      .then((launch) => {
        const date = this.launchService.getLaunchDate(
          launch.netPrecision,
          launch.net,
        );

        this.viewModel.set({
          id: launch.id,
          date,
          name: launch.name,
          webcast: launch.webcast,
        });
        this.isLoading.set(false);
      })
      .catch(() => this.isLoading.set(false));
  }

  openDetails() {
    this.router.navigate(['/launch'], {
      queryParams: { id: this.viewModel()?.id },
    });
  }
}
