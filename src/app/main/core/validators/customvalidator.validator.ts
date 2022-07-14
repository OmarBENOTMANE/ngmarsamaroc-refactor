import { FormGroup, AbstractControl } from "@angular/forms";

// To compare fields
export function CompareFields(
    controlName: string,
    matchingControlName: string
){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        //const matchingControl = formGroup.controls[matchingControlName];
    
        /*if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
          return;
        }*/
    
        if (control.value == matchingControlName) {
          control.setErrors({ mustMatch: true });
        } else {
          control.setErrors(null);
        }
      };
}