import {
  Component,
  computed,
  effect,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { NextLaunchService } from '../../services/next-launch.service';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { SlinkyRotatorComponent } from '../slinky-rotator/slinky-rotator.component';

const formatCountdown = (timeInSeconds?: number): string | undefined => {
  if (!timeInSeconds) {
    return undefined;
  }
  const days = Math.floor(timeInSeconds / (60 * 60 * 24));
  const hours = Math.floor((timeInSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${days}d ${hours}t ${minutes}m ${seconds}s`;
};

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [NgIf, SlinkyRotatorComponent],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css',
})
export class CountdownComponent implements OnInit, OnDestroy {
  private timeLeft = signal<number | undefined>(undefined);
  private intervalId: any;
  private readonly isBrowser: boolean;
  formattedCountdown = computed(() => formatCountdown(this.timeLeft()));
  isLoading = signal(false);

  constructor(
    private nextLaunchService: NextLaunchService,
    @Inject(PLATFORM_ID) private platformId: any,
    private injector: Injector,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  startInterval(): void {
    this.clearInterval();
    this.intervalId = setInterval(
      () =>
        this.timeLeft.update((value) => {
          if (value) {
            return value - 1;
          } else {
            return 0;
          }
        }),
      1000,
    );
  }

  clearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  countdown(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const timeLeft = this.timeLeft();

        if (timeLeft && timeLeft > 0) {
          this.startInterval();
        } else {
          this.clearInterval();
        }
      });
    });
  }

  ngOnInit(): void {
    this.isLoading.set(true);
    this.nextLaunchService
      .getTimeToNextLaunch()
      .then((diffTimeInSeconds) => {
        if (diffTimeInSeconds > 0) {
          this.timeLeft.set(diffTimeInSeconds);
          this.isBrowser && this.countdown();
        }
        this.isLoading.set(false);
      })
      .catch(() => this.isLoading.set(false));
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }
}
