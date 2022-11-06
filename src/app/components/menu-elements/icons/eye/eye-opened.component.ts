import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-eye-opened',
  templateUrl: './eye-opened.component.html',
})
export class EyeOpenedComponent {
  @Input() height: number = 6;
  @Input() width: number = 6;

  get heightFromTailwindUnitsToPx() {
    return this.height * 4;
  }

  get widthFromTailwindUnitsToPx() {
    return this.height * 4;
  }
}
