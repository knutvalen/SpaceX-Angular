import { Component, computed, effect, signal } from '@angular/core';
import { SpaceXApiService } from '../../api/space-xapi.service';

const formatCountdown = (timeInSeconds: number): string => {
  const days = Math.floor(timeInSeconds / (60 * 60 * 24));
  const hours = Math.floor((timeInSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${days}d ${hours}t ${minutes}m ${seconds}s`;
};

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css',
})
export class CountdownComponent {
  private timeLeft = signal(0);
  private timer: any = null;
  formattedCountdown = computed(() => formatCountdown(this.timeLeft()));

  constructor(private api: SpaceXApiService) {
    effect((onCleanup) => {
      if (this.timeLeft() <= 0) {
        this.api.getNextLaunch().then((nextLaunch) => {
          const nowTime = new Date().getTime();
          const nextLaunchTime = new Date(nextLaunch.dateUtc).getTime();
          const diffTimeInSeconds = Math.floor(
            (nextLaunchTime - nowTime) / 1000,
          );
          this.timeLeft.set(diffTimeInSeconds);
          this.timer = setInterval(() => {
            this.timeLeft.update((time) => {
              if (time > 0) {
                return time - 1;
              } else {
                clearInterval(this.timer);
                return 0;
              }
            });
          }, 1000);
        });
      }
      onCleanup(() => clearInterval(this.timer));
    });
  }
}
