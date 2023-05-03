const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailFieldValidationRules = {
    required: true,
    pattern: {value: emailRegex, message: 'Invalid email address'}
};

const whiteSpacesRegex = /^(?!\s*$).+$/;

export const passwordFieldValidationRules = {
    required: true,
    minLength: {value: 5, message: 'Password must have at least 5 characters'},
    maxLength: {value: 30, message: 'Password must have maximum 30 characters'},
    pattern: {value: whiteSpacesRegex, message: 'Password should not contain only whitespaces'}
};

const usernameFieldRegex = /^[a-zA-Z0-9._]+$/;

export const userNameValidationRules = {
    required: true,
    minLength: {value: 5, message: 'Username is too short'},
    maxLength: {value: 30, message: 'Username is too long'},
    pattern: {value: usernameFieldRegex, message: 'Username can only contain alphanumeric characters, dots, underscores'}
};
