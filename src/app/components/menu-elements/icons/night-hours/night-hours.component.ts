import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-night-hours',
  templateUrl: './night-hours.component.html',
})
export class NightHoursComponent {
  @Input() height: number = 6;
  @Input() width: number = 6;

  get heightFromTailwindUnitsToPx() {
    return this.height * 4;
  }

  get widthFromTailwindUnitsToPx() {
    return this.height * 4;
  }
}
