import {AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FormControlErrorEnum } from "src/app/constants/form-control-error.enum";
import { INVALID_EMAIL_MSG, INVALID_FULL_NAME_MSG, INVALID_PHONE_MSG, INVALID_REQUIRED_FIELD_MSG, INVALID_TRANSFER_MSG } from "src/app/constants/form-message-error.const";
import { REGEX_CONST } from "src/app/constants/regex.cont";

export class customValidator{
    /* static requiredValidator(control: AbstractControl): ValidationErrors | null {   
        let {value} = control;
        if (!value) {
        return null;
        }
        value = value.trim();
        console.log(control?.invalid && (control?.dirty || control?.touched), "😬😬")
        return (control?.invalid && (control?.dirty || control?.touched))
        ? null
        : {[FormControlErrorEnum.INVALID_REQUIRED_FIELD]: true, message: INVALID_REQUIRED_FIELD_MSG};       
}; */
static requiredValidator(control: AbstractControl): ValidationErrors | null {   
    let { value } = control;
    if (!control.touched && !control.dirty) {
        return null;  // No retornamos ningún error hasta que el usuario lo toque y lo modifique
    }
    value = value?.trim();
    return (!value || value === '') 
        ? { [FormControlErrorEnum.INVALID_REQUIRED_FIELD]: true, message: INVALID_REQUIRED_FIELD_MSG }
        : null;
};
    static phoneValidator(control: AbstractControl): ValidationErrors | null {   
            let {value} = control;
            if (!value) {
            return null;
            }
            value = value.trim();
            console.log("💕", REGEX_CONST.PHONE_REGEX.test(value))
            return REGEX_CONST.PHONE_REGEX.test(value)
            ? null
            : {[FormControlErrorEnum.INVALID_PHONE]: true, message: INVALID_PHONE_MSG};       
    };

    static fullNameValidator(control: AbstractControl): ValidationErrors | null {   
        let {value} = control;
        if (!value) {
        return null;
        }
        value = value.trim();
        return REGEX_CONST.FULL_NAME_REGEX.test(value)
        ? null
        : {[FormControlErrorEnum.INVALID_FULL_NAME]: true, message: INVALID_FULL_NAME_MSG};       
    };
    static emailValidator(control: AbstractControl): ValidationErrors | null {   
        let {value} = control;
        if (!value) {
        return null;
        }
        value = value.trim();
        return REGEX_CONST.EMAIL_REGEX.test(value)
        ? null
        : {[FormControlErrorEnum.INVALID_EMAIL]: true, message: INVALID_EMAIL_MSG};       
    };
    static transferValidator(control: AbstractControl): ValidationErrors | null {   
        let {value} = control;
        if (!value) {
        return null;
        }
        value = value.trim();
        return REGEX_CONST.TRANSFER_REGEX.test(value)
        ? null
        : {[FormControlErrorEnum.INVALID_TRANSFER]: true, message: INVALID_TRANSFER_MSG};       
    };
}