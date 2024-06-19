import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalLink } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  ExternalLink,
};

@NgModule({
  declarations: [],
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
