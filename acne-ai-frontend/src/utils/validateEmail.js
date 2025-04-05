import validator from "validator"

export const validateEmail = (email) => {
    if (!email) return false
    email = email.trim()
    return validator.isEmail(email)
}