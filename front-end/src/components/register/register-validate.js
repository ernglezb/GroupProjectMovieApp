

const validate = function(user){
    const {userFirstName, userLastName, userEmail, userPassword} = user;

    const errors = {
            userFirstName: validateName(userFirstName, "First Name"),
            userLastName: validateName(userLastName, "Last Name"),
            userEmail: validateEmail(userEmail),
            userPassword: validatePassword(userPassword)

    };

    return errors;
}

const validateName = (name, fieldName) => {
    if (name.trim() === '') {
        return `${fieldName} is required`;
    }
    if (/[^a-zA-Z -]/.test(name)) {
        return 'Invalid characters';
    }
    if (name.trim().length <= 2) {
        return `${fieldName} needs to be at least three characters`;
    }
    return '';
}

const validateEmail = (email) => {
    if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email,
        )
    ) {
        return '';
    }
    if (email.trim() === '') {
        return "Email is required";
    }
    return "Please enter a valid email";
}

const validatePassword = (password) => {
    if(password.trim() === '')
        return "Password is required"
    
    if(password.trim().length <= 5)
        return "Password must contain at least 6 characters"
    
    return "";
}

export default validate;