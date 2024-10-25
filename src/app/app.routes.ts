import { Routes } from '@angular/router';
import { LaunchDetailsComponent } from './components/launch-details/launch-details.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'launch', component: LaunchDetailsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];
