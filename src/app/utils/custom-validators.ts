import { AbstractControl, FormArray, Validators } from '@angular/forms';

export const EMAIL_PATTERN_VALIDATOR = Validators.pattern('^[a-zA-Z0-9_]+.+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,5}$');

export function uniqueFormArray(control: AbstractControl): { [key: string]: any } | null {
  const formArray = control as FormArray;
  if (formArray.value.length < 2) {
    return null;
  }
  const valid = formArray.value.filter((item: any, index: any) => formArray.value.indexOf(item) != index).length == 0;
  return valid ? null : { error: 'Not unique values' };
}
