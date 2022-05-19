import { AbstractControl } from "@angular/forms";

export function inputOneOrAbove(control: AbstractControl): { [key: string]: boolean } | null {

  let employment: number;

  // checks if input value is below 1
  // if it is, returns error
  if (control.value <= 0) {
    return { inputTooLow: true };
  }

  return null;
}
