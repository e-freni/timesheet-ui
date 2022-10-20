import {Component, Input} from '@angular/core';

@Component({
  selector: 'icon-analytics',
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent {

  @Input() height: number = 6
  @Input() width: number = 6

  get heightFromTailwindUnitsToPx() {
    return this.height * 4;
  }

  get widthFromTailwindUnitsToPx() {
    return this.height * 4;
  }
}
