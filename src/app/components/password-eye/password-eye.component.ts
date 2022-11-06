import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-password-eye',
  templateUrl: './password-eye.component.html',
})
export class PasswordEyeComponent {
  @Input() hidePassword: boolean;
  @Output() passwordStatus: EventEmitter<boolean> = new EventEmitter();

  emitShowPassword() {
    this.hidePassword = false;
    this.passwordStatus.emit(this.hidePassword);
  }

  emitHidePassword() {
    this.hidePassword = true;
    this.passwordStatus.emit(this.hidePassword);
  }
}
