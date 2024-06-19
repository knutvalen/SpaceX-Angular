import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChevronDown, ChevronUp, ExternalLink } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  ExternalLink,
  ChevronDown,
  ChevronUp,
};

@NgModule({
  declarations: [],
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
