import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-dark-mode-switch',
  templateUrl: './dark-mode-switch.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DarkModeSwitchComponent implements OnInit {
  @Input() checked: boolean;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.updateTheme();
  }

  changeTheme() {
    const theme = this.localStorageService.retrieve('ui_theme');

    if (theme === 'dark') {
      this.localStorageService.store('ui_theme', 'light');
      this.checked = false;
    } else {
      this.localStorageService.store('ui_theme', 'dark');
      this.checked = true;
    }
    this.updateTheme();
  }

  private updateTheme() {
    const theme = this.localStorageService.retrieve('ui_theme');

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      this.checked = true;
    } else {
      document.documentElement.classList.remove('dark');
      this.checked = false;
    }
  }
}
