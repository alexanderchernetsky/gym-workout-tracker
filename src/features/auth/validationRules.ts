export const emailFieldValidationRules = {required: true, pattern: {value: /^\S+@\S+$/i, message: 'Invalid email address'}};

export const passwordFieldValidationRules = {
    required: true,
    minLength: {value: 5, message: 'Password must have at least 5 characters'},
    maxLength: {value: 30, message: 'Password must have maximum 30 characters'}
};

export const userNameValidationRules = {
    required: true,
    minLength: {value: 5, message: 'Username is too short'},
    maxLength: {value: 30, message: 'Username is too long'}
};
