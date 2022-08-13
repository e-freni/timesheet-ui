import {Component, Input} from '@angular/core';

@Component({
  selector: 'icon-rightarrow',
  templateUrl: './rightarrow.component.html',
})
export class RightarrowComponent {

  @Input() height: number = 6
  @Input() width: number = 6

  getClass() {
    return "h-" + this.height + " " + "w-" + this.width;
  }
}
