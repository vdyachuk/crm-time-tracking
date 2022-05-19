const authRouter = require('express').Router();

const { AuthController } = require('../controllers/auth');
const { validation } = require('../utils/validation');
const { authenticate } = require('../utils/authentication');
const {
    loginValidator,
    registrationValidator,
    resetPasswordValidator,
    confirmNewPasswordValidator,
    refreshTokenValidator,
    emailTokenValidator
} = require('../validations/auth');

authRouter.route('/login').post(validation(loginValidator), AuthController.login);
authRouter.route('/logout').post(validation(refreshTokenValidator), AuthController.logout);
authRouter.route('/refresh-tokens').post(validation(refreshTokenValidator), AuthController.refreshTokens);
authRouter.route('/logout-all-sessions').post(authenticate, AuthController.logoutAllSessions);

authRouter.route('/registration').post(validation(registrationValidator), AuthController.registraition);
authRouter.route('/confirm-registration').post(validation(emailTokenValidator), AuthController.confirmRegistration);

authRouter.route('/reset-password').post(validation(resetPasswordValidator), AuthController.resetPassword);
authRouter
    .route('/confirm-new-password')
    .post(validation(confirmNewPasswordValidator), AuthController.confirmNewPassword);

module.exports = authRouter;
