export const REGEX_CONST = {
    FULL_NAME_REGEX : RegExp(/^([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$/i),
    EMAIL_REGEX: RegExp(/^([\w.\-_]+)?\w+@[\w-_]+(\.\w+)+$/),
    PHONE_REGEX: RegExp(/^((60([1245678]))|(3\d\d))\d{7}$/),
    TRANSFER_REGEX: RegExp (/^\d{10}$/),
}