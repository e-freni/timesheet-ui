import {Component, Input} from '@angular/core';

@Component({
  selector: 'icon-time',
  templateUrl: './time.component.html',
})
export class TimeComponent {

  @Input() height: number = 6
  @Input() width: number = 6

  getClass() {
    return "h-" + this.height + " " + "w-" + this.width;
  }
}
