import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-today',
  templateUrl: './today.component.html',
})
export class TodayComponent {
  @Input() height: number = 6;
  @Input() width: number = 6;

  get heightFromTailwindUnitsToPx() {
    return this.height * 4;
  }

  get widthFromTailwindUnitsToPx() {
    return this.height * 4;
  }
}
