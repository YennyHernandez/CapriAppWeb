import {AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FormControlErrorEnum } from "src/app/constants/form-control-error.enum";
import { INVALID_PHONE_MSG } from "src/app/constants/form-message-error.const";
import { REGEX_CONST } from "src/app/constants/regex.cont";

export class customValidator{
    static phoneValidator(control: AbstractControl): ValidationErrors | null {   
            let {value} = control;
            if (!value) {
            return null;
            }
            value = value.trim();
            console.log(REGEX_CONST.PHONE_REGEX.test(value), "🌱🌱🌱🌱🌱")
            return REGEX_CONST.PHONE_REGEX.test(value)
            ? null
            : {[FormControlErrorEnum.INVALID_PHONE]: true, message: INVALID_PHONE_MSG};       
    };
  }