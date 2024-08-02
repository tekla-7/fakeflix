import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export const passwordvalidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const name = control.get('password');
  const alterEgo = control.get('confirmpassword');

  return name && alterEgo && name.value !== alterEgo.value
    ? { noMatch: true }
    : null;
};

