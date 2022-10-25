import {Component, Input} from '@angular/core';

@Component({
  selector: 'icon-add',
  templateUrl: './add.component.html'
})
export class AddComponent {

  @Input() height: number = 6
  @Input() width: number = 6

  get heightFromTailwindUnitsToPx() {
    return this.height * 4;
  }

  get widthFromTailwindUnitsToPx() {
    return this.height * 4;
  }
}
