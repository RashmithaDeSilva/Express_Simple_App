export const userValidetionSchema = {
    username: {
        notEmpty: { 
            errorMessage: {
                value: "USERNAME", 
                error: 'User name canot empty !'
            }
        },
        isString: {
            errorMessage: {
                value: "USERNAME", 
                error: 'User name not string !'
            }
        },
        isLength: {
            options: {
                min: 3,
                max: 10
            },
            errorMessage: {
                value: "USERNAME", 
                error: 'User name must be at least 3 - 10 characters !'
            }
        }
    }
};

export const userOptionelValidetionSchema = {
    username: {
        isString: {
            errorMessage: {
                value: "USERNAME", 
                error: 'User name not string !'
            }
        },
        isLength: {
            options: {
                min: 3,
                max: 10
            },
            errorMessage: {
                value: "USERNAME", 
                error: 'User name must be at least 3 - 10 characters !'
            }
        }
    }
};

export const passwordValidetionSchema = {
    password: {
        isString: {
            errorMessage: {
                value: "PASSWORD", 
                error: 'Password not string !'
            }
        },
        isLength: {
            options: {
                min: 3,
                max: 10
            },
            errorMessage: {
                value: "PASSWORD", 
                error: 'Password must be at least 3 - 10 characters !'
            }
        }
    }
};

export const contactnuberValidetionSchema = {
    contactnuber: {
        isInt: {
            errorMessage: {
                value: "CONTACTNUMBER", 
                error: 'Contactnuber not int !'
            }
        },
        isLength: {
            options: {
                min: 10,
                max: 11
            },
            errorMessage: {
                value: "CONTACTNUMBER", 
                error: 'Contactnuber ust be at least 10 - 11 numbers !'
            }
        }
    }
};

export const emailValidetionSchema = {
    email: {
        isString: {
            errorMessage: {
                value: "EMAIL", 
                error: 'Email not string !'
            }
        },
        isLength: {
            options: {
                min: 10,
                max: 50
            },
            errorMessage: {
                value: "EMAIL", 
                error: 'Email must be at least 10 - 50 characters !'
            }
        }
    }
};