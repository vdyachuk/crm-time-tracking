export const emailValidator = {
    required: true,
    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/
}

export const passwordValidator = {
    required: true,
    minLength: 8
}

export const nameValidator = {
    required: true,
    minLength: 3,
    maxLenght: 50
}