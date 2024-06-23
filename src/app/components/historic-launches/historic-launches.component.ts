import { Component, OnInit, signal } from '@angular/core';
import { HistoricLaunchesService } from '../../services/historic-launches.service';
import { NgForOf, NgIf } from '@angular/common';
import { LaunchService } from '../../services/launch.service';
import { ButtonComponent } from '../button/button.component';
import { SlinkyRotatorComponent } from '../slinky-rotator/slinky-rotator.component';
import { IconsModule } from '../../icons/icons.module';

type LaunchViewModel = {
  name: string;
  date: string;
};

@Component({
  selector: 'app-historic-launches',
  standalone: true,
  imports: [
    NgForOf,
    ButtonComponent,
    NgIf,
    SlinkyRotatorComponent,
    IconsModule,
  ],
  templateUrl: './historic-launches.component.html',
  styleUrl: './historic-launches.component.css',
})
export class HistoricLaunchesComponent implements OnInit {
  viewModel = signal<LaunchViewModel[] | undefined>(undefined);
  isLoading = signal(false);
  private limit: number;
  private readonly initialLimit: number = 10;
  isAscendingOrder = false;

  constructor(
    private historicLaunchesService: HistoricLaunchesService,
    private launchService: LaunchService,
  ) {
    this.limit = this.initialLimit;
  }

  protected loadMore() {
    this.isLoading.set(true);
    this.limit = this.limit + this.initialLimit;
    this.loadLaunches();
  }

  private loadLaunches() {
    this.historicLaunchesService
      .getHistoricLaunches(this.limit)
      .then((launches) => {
        let viewModel = launches.map((launch) => ({
          name: launch.name,
          date: this.launchService.getLaunchDate(launch),
        }));

        this.isAscendingOrder && viewModel.reverse();
        this.viewModel.set(viewModel);
        this.isLoading.set(false);
      })
      .catch(() => this.isLoading.set(false));
  }

  protected toggleOrder() {
    this.isLoading.set(true);
    this.isAscendingOrder = !this.isAscendingOrder;
    this.loadLaunches();
  }

  ngOnInit(): void {
    this.isLoading.set(true);
    this.loadLaunches();
  }
}
