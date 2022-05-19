const { checkSchema } = require('express-validator');

const createProjectValidator = checkSchema({
    name: {
        in: ['body'],
        isString: true,
        isLength: {
            options: { min: 3, max: 50 },
            errorMessage: 'Length of the value should be within 3 and 50 symbols'
        }
    },
});

module.exports = { createProjectValidator };
