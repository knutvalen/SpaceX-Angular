import { Component, effect, signal } from '@angular/core';
import { NextLaunchService } from '../../services/next-launch.service';
import { IconsModule } from '../../icons/icons.module';

type NextLaunchViewModel = {
  name: string;
  flightNumber: string;
  date: string;
  webcast: URL;
};

@Component({
  selector: 'app-next-launch',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './next-launch.component.html',
  styleUrl: './next-launch.component.css',
})
export class NextLaunchComponent {
  viewModel = signal<NextLaunchViewModel | undefined>(undefined);

  constructor(private nextLaunchService: NextLaunchService) {
    effect(() => {
      this.nextLaunchService.getNextLaunch().then((nextLaunch) => {
        let date = '';
        const month = nextLaunch.dateUtc.getUTCMonth();

        if (nextLaunch.datePrecision === 'quarter') {
          date = date + 'Q';

          if (month >= 0 && month <= 2) {
            date = date + '1';
          }
          if (month >= 3 && month <= 5) {
            date = date + '2';
          }
          if (month >= 6 && month <= 8) {
            date = date + '3';
          }
          if (month >= 9 && month <= 11) {
            date = date + '4';
          }

          date =
            date +
            ' ' +
            nextLaunch.dateUtc.toLocaleDateString('en', {
              year: 'numeric',
            });
        }

        if (nextLaunch.datePrecision === 'half') {
          if (month >= 0 && month <= 5) {
            date = date + 'First';
          }
          if (month >= 6 && month <= 11) {
            date = date + 'Second';
          }

          date =
            date +
            ' half of ' +
            nextLaunch.dateUtc.toLocaleDateString('en', {
              year: 'numeric',
            });
        }

        if (nextLaunch.datePrecision === 'year') {
          date = nextLaunch.dateUtc.toLocaleDateString('en', {
            year: 'numeric',
          });
        }

        if (nextLaunch.datePrecision === 'month') {
          date = nextLaunch.dateUtc.toLocaleDateString('en', {
            year: 'numeric',
            month: 'long',
          });
        }

        if (nextLaunch.datePrecision === 'day') {
          date = nextLaunch.dateUtc.toLocaleDateString('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        }

        if (nextLaunch.datePrecision === 'hour') {
          date = nextLaunch.dateUtc.toLocaleDateString('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
          });
        }

        const webcast = new URL(nextLaunch.webcast);

        const name = nextLaunch.name;
        const flightNumber = nextLaunch.flightNumber.toString();

        this.viewModel.set({ date, webcast, name, flightNumber });
      });
    });
  }
}
