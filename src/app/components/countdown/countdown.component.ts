import { Component, computed, OnInit, signal, WritableSignal } from "@angular/core";
import { SpaceXApiService } from "../../api/space-xapi.service";
import { NextLaunch } from "../../models/NextLaunch";

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
export class CountdownComponent implements OnInit {
  countdown = signal(0);
  formattedCountdown = computed(() => formatCountdown(this.countdown()))

  constructor(private api: SpaceXApiService) {}

  ngOnInit(): void {
    this.api.getNextLaunch().then(nextLaunch => {
      const nowTime = new Date().getTime();
      const nextLaunchTime = new Date(nextLaunch.dateUtc).getTime();
      const diffTimeInSeconds = Math.floor((nextLaunchTime - nowTime) / 1000);
      this.countdown.set(diffTimeInSeconds);
    })
  }
}
