import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent {
  readonly appName = 'SpaceX Developments';
  readonly lastUpdated = new Date(2024, 9, 25).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  readonly mailAddress = 'knut.valen@gmail.com';
}
