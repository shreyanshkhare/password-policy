import { AbstractControl } from '@angular/forms';

export function ValidateEmail(control: AbstractControl) {
  const [key] = control.parent && Object.entries(
    control.parent.controls).find(([key, obj]) => obj.value === control.value) || [''];

    if (!control.value) {
      return;
  }

  const isValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
  return !isValid ? {[key]: true} : null;
}