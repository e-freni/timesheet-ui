import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { DropDownOption } from 'app/components/menu-elements/dropdown/dropdown-option.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent {
  open: boolean = false;
  @Input() menuOptions: DropDownOption[] = [];
  @Input() menuTitle: string;

  @HostListener('click') changeDropdownState() {
    this.open = !this.open;
  }
}
