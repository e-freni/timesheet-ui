import {Component, Input} from '@angular/core';

@Component({
  selector: 'icon-leftarrow',
  templateUrl: './leftarrow.component.html'
})
export class LeftarrowComponent {

  @Input() height: number = 6
  @Input() width: number = 6

}
