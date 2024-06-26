import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaunchService } from '../../services/launch.service';
import {
  LaunchDetails,
  LaunchServiceProvider,
  Mission,
} from '../../models/LaunchDetails';
import { isPlatformBrowser, NgForOf, NgIf } from '@angular/common';
import { SlinkyRotatorComponent } from '../slinky-rotator/slinky-rotator.component';
import { IconsModule } from '../../icons/icons.module';
import { Webcast } from '../../models/Webcast';

type ViewModel = {
  name: string;
  status: string;
  lastUpdated: string;
  date: string;
  launchServiceProvider: LaunchServiceProvider;
  webcasts: Webcast[];
  mission: Mission;
  patch?: string;
};

@Component({
  selector: 'app-launch-details',
  standalone: true,
  imports: [NgIf, SlinkyRotatorComponent, NgForOf, IconsModule],
  templateUrl: './launch-details.component.html',
  styleUrl: './launch-details.component.css',
})
export class LaunchDetailsComponent implements OnInit {
  isLoading = signal(false);
  viewModel = signal<ViewModel | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private launchService: LaunchService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.isLoading.set(true);
      this.loadLaunch(id);
    });
  }

  private loadLaunch(id: string) {
    this.launchService.getLaunchDetails(id).then((launch: LaunchDetails) => {
      const date = this.launchService.getLaunchDate(
        launch.netPrecision,
        launch.net,
      );

      const lastUpdated = launch.lastUpdated.toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });

      // TODO: webcast, mission, payload

      this.viewModel.set({
        date,
        name: launch.name,
        status: launch.status.name,
        launchServiceProvider: launch.launchServiceProvider,
        lastUpdated,
        webcasts: launch.webcasts,
        mission: launch.mission,
        patch: launch.patch,
      });

      this.isLoading.set(false);
    });
  }
}
