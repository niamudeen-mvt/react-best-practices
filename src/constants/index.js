export const REGEX = {
    EMAIL: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    PHONE: /^[6-9]\d{9}$/,
};

export const FORM_ERROR_MESSAGES = {
    REQUIRED: 'This field is required',
    EMAIL: {
        INVALID: 'Please provide a valid email address',
    },
    PASSWORD: {
        MIN_LENGTH: 'Please provide a password with at least 3 characters',
    },
    PHONE: {
        INVALID: 'Please provide a valid phone number',
    },
};

export const RESPONSE_MESSAGES = {
    SEVER_ERROR: 'Something went wrong. Please try again',
};
