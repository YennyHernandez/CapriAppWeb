import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FormControlErrorEnum } from "src/app/constants/form-control-error.enum";
import { INVALID_EMAIL_MSG, INVALID_FULL_NAME_MSG, INVALID_PHONE_MSG, INVALID_REQUIRED_FIELD_MSG, INVALID_TRANSFER_MSG } from "src/app/constants/form-message-error.const";
import { REGEX_CONST } from "src/app/constants/regex.cont";

export class customValidator {

    static requiredValidator(control: AbstractControl): ValidationErrors | null {
        let { value } = control;
        value = value?.trim();
    
        // Considerar inválido si el campo está vacío
        const isInvalid = !value || value === '';
    
        // Si es inválido, devolver el error
        return isInvalid ? { [FormControlErrorEnum.INVALID_REQUIRED_FIELD]: true, message: INVALID_REQUIRED_FIELD_MSG } : null;
    }    
    static phoneValidator(control: AbstractControl): ValidationErrors | null {
        let { value } = control;
        if (!value) {
            return null;
        }
        value = value.trim();
        console.log("💕", REGEX_CONST.PHONE_REGEX.test(value))
        return REGEX_CONST.PHONE_REGEX.test(value)
            ? null
            : { [FormControlErrorEnum.INVALID_PHONE]: true, message: INVALID_PHONE_MSG };
    };

    static fullNameValidator(control: AbstractControl): ValidationErrors | null {
        let { value } = control;
        if (!value) {
            return null;
        }
        value = value.trim();
        return REGEX_CONST.FULL_NAME_REGEX.test(value)
            ? null
            : { [FormControlErrorEnum.INVALID_FULL_NAME]: true, message: INVALID_FULL_NAME_MSG };
    };
    static emailValidator(control: AbstractControl): ValidationErrors | null {
        let { value } = control;
        if (!value) {
            return null;
        }
        value = value.trim();
        return REGEX_CONST.EMAIL_REGEX.test(value)
            ? null
            : { [FormControlErrorEnum.INVALID_EMAIL]: true, message: INVALID_EMAIL_MSG };
    };
    static transferValidator(control: AbstractControl): ValidationErrors | null {
        let { value } = control;
        console.log("realzando validacion tranfer")
        if (!value) {
            return null;
        }
        value = value.trim();
        
        return REGEX_CONST.TRANSFER_REGEX.test(value)
            ? null
            : { [FormControlErrorEnum.INVALID_TRANSFER]: true, message: INVALID_TRANSFER_MSG };
    };
}