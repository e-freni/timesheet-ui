import {Component, Input} from '@angular/core';

@Component({
  selector: 'icon-accident-at-work',
  templateUrl: './accident-at-work.component.html'
})
export class AccidentAtWorkComponent {

  @Input() height: number = 6
  @Input() width: number = 6

  get heightFromTailwindUnitsToPx() {
    return this.height * 4;
  }

  get widthFromTailwindUnitsToPx() {
    return this.height * 4;
  }
}
