import {Component, Input} from '@angular/core';

@Component({
  selector: 'icon-edit-data',
  templateUrl: './edit-data.component.html'
})
export class EditDataComponent {

  @Input() height: number = 6
  @Input() width: number = 6

  get heightFromTailwindUnitsToPx() {
    return this.height * 4;
  }

  get widthFromTailwindUnitsToPx() {
    return this.height * 4;
  }
}
