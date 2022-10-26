import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinning-circle',
  templateUrl: './spinning-circle.component.html',
})
export class SpinningCircleComponent {
  @Input() color: string;
}
