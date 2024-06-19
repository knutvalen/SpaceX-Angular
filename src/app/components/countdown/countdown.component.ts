import { Component, computed, effect, signal } from '@angular/core';
import { NextLaunchService } from '../../services/next-launch.service';

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
  private timeLeft = signal<number | undefined>(undefined);
  private timer?: NodeJS.Timeout;

  formattedCountdown = computed(() => {
    const timeLeft = this.timeLeft();
    if (timeLeft) {
      formatCountdown(timeLeft);
    }
  });

  constructor(private nextLaunchService: NextLaunchService) {
    effect((onCleanup) => {
      const timeLeft = this.timeLeft();
      if (timeLeft && timeLeft <= 0) {
        this.nextLaunchService
          .getTimeToNextLaunch()
          .then((diffTimeInSeconds) => {
            if (diffTimeInSeconds > 0) {
              this.timeLeft.set(diffTimeInSeconds);
              this.timer = setInterval(() => {
                this.timeLeft.update((_timeLeft) => {
                  if (_timeLeft && _timeLeft > 0) {
                    return _timeLeft - 1;
                  } else {
                    clearInterval(this.timer);
                    return 0;
                  }
                });
              }, 1000);
            }
          });
      }
      onCleanup(() => clearInterval(this.timer));
    });
  }
}
