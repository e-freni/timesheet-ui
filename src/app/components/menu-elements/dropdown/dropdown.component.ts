import {Component, HostListener, Input} from '@angular/core';
import {DropDownOption} from "app/components/menu-elements/dropdown/dropdown-option.model";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  open: boolean = false;
  @Input() menuOptions: DropDownOption[] = []
  @Input() menuTitle: string


  @HostListener("click") changeDropdownState() {
    this.open = !this.open;
  }

}
