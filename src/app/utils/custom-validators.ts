import { AbstractControl, FormArray, FormGroup, Validators } from '@angular/forms';

export const EMAIL_PATTERN_VALIDATOR = Validators.pattern('^[a-zA-Z0-9_]+.+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,5}$');

export function uniqueFormArray(control: AbstractControl): { [key: string]: any } | null {
  const formArray = control as FormArray;
  if (formArray.value.length < 2) {
    return null;
  }
  const valid = formArray.value.filter((item: any, index: any) => formArray.value.indexOf(item) != index).length == 0;
  return valid ? null : { error: 'Not unique values' };
}

export function matchPasswordsValidator(control: AbstractControl) {
  const formGroup = control as FormGroup;
  if (!formGroup) {
    return null;
  }
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('passwordConfirmation');
  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }

  const password = passwordControl.value;
  const confirmPassword = confirmPasswordControl.value;
  if (password !== confirmPassword) {
    return { nonMatchingPasswords: true };
  }
  return null;
}
