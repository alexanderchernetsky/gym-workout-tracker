export const weightFieldValidationRules = {
    required: {
        value: true,
        message: 'This is a required field'
    },
    min: {
        value: 1,
        message: "Your weight can't be less than 1 kg"
    },
    max: {
        value: 400,
        message: "Your weight can't be more than 400 kg"
    }
};

export const progressIndicatorsFieldValidationRules = {
    required: {
        value: true,
        message: 'This is a required field'
    },
    minLength: {
        value: 5,
        message: 'Your progress description is too short'
    },
    maxLength: {
        value: 1000,
        message: 'Your progress description is too long'
    }
};

export const dateFieldValidationRules = {
    required: {
        value: true,
        message: 'This is a required field'
    }
};

export const validateImageField = (value: any, id: string): boolean | string => {
    // we have to use custom validation
    if (id) {
        // we always have a picture in edit mode, at least old one
        return true;
    } else {
        // create mode
        if (value) {
            return true;
        } else {
            return 'Image is required';
        }
    }
};
