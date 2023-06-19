export function passwordValidation(password, firstName, lastName) {
    if (password < 8) {
        return false;
    }

    if (password && firstName && lastName && (password.includes(firstName) || password.includes(lastName))) {
        return false;
    }

    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        return false;
    }

    return true;
}

export function emailValidation(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && email.trim() === '' || regex.test(email);
}

export function nameValidation(name) {
    const regex = /^[A-Za-z]+$/;
    return regex.test(name);
}