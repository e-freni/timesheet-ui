import {Component, Input} from '@angular/core';

@Component({
  selector: 'icon-funeral-leave',
  templateUrl: './funeral-leave.component.html'
})
export class FuneralLeaveComponent {

  @Input() height: number = 6
  @Input() width: number = 6

  get heightFromTailwindUnitsToPx() {
    return this.height * 4;
  }

  get widthFromTailwindUnitsToPx() {
    return this.height * 4;
  }
}
