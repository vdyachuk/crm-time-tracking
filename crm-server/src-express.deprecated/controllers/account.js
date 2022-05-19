const bcrypt = require('bcrypt');

const { createJWT, verifyJWT } = require('../utils/jwt');
const { sendConfirmToken, emailType } = require('../utils/mailer');
const { UserService } = require('../services/user');
const { SessionService } = require('../services/session');

class AccountController {
    static async changePassword(req, res) {
        const { oldPassword, newPassword } = req.body;

        try {
            const user = await UserService.findById(req.currentUser.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    errors: 'User not found'
                });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                return res.status(403).json({
                    success: false,
                    errors: 'Wrong old password'
                });
            }

            user.password = await bcrypt.hash(newPassword, 10);

            await SessionService.removeAllSessionsByUser(user._id);
            await UserService.updateUser(user);

            return res.status(200).json({
                success: true,
                message: 'Password changed'
            });
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }

    static async changeEmail(req, res) {
        const { newEmail } = req.body;
        const currentUserId = req.currentUser.id;
        try {
            const existUser = await UserService.findByEmail(newEmail);

            if (existUser) {
                return res.status(422).json({
                    errors: 'email already exist'
                });
            }
            const user = await UserService.findById(currentUserId);
            const emailConfirmToken = createJWT(user, 3600);
            user.emailConfirmToken = emailConfirmToken;
            user.email = newEmail;
            await UserService.updateUser(user);
            sendConfirmToken(newEmail, user.name, emailConfirmToken, emailType.confirmNewEmail);

            return res.status(200).json({
                success: true
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ errors: 'server errror' });
        }
    }

    static async confirmEmail(req, res) {
        const { emailConfirmToken } = req.body;

        try {
            const tokenData = verifyJWT(emailConfirmToken);

            if (!tokenData) {
                return res.status(400).json({
                    errors: 'token incorrect or expired'
                });
            }

            const userId = tokenData?.userId;

            const user = await UserService.findById(userId);

            if (!user) {
                return res.status(404).json({
                    errors: 'user not found'
                });
            }

            const newEmail = user.newEmail;

            if (user.emailConfirmToken !== emailConfirmToken) {
                return res.status(400).json({
                    errors: 'WRONG EMAIL CONFIRM TOKEN'
                });
            }
            user.email = newEmail;
            user.emailConfirmToken = null;
            await UserService.updateUser(user);

            return res.status(200).json({
                success: true,
                userId: user.id,
                message: 'Email confirm'
            });
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }

    static async cancelEmailChanging(req, res) {
        const currentUser = req.currentUser.id;
        if (!currentUser) {
            return res.status(404).json({ success: false, errors: 'User not found' });
        }
        try {
            const user = await UserService.findById(req.currentUser.id);

            if (!user) {
                return res.status(404).json({
                    errors: 'user not found'
                });
            }
            user.newEmail = null;
            user.emailConfirmToken = null;

            return res.status(200).json({
                success: true,
                message: 'Email changing canceled!'
            });
        } catch (err) {
            return res.status(200).json({ errors: 'server errror' });
        }
    }

    static async resendConfirmNewEmailToken(req, res) {
        const { email } = req.body;
        try {
            const user = await UserService.findByEmail(email);

            if (!user) {
                return res.status(404).json({
                    errors: 'user not found'
                });
            }
            const resendEmailNewToken = createJWT(user, 3600);
            user.resendConfirmNewEmailToken = resendEmailNewToken;
            await UserService.updateUser(user);
            sendConfirmToken(email, user.name, resendEmailNewToken, emailType.confirmNewEmail);

            return res.status(200).json({
                success: true,
                message: 'Sent confirm new email token'
            });
        } catch (err) {
            res.status(500).json({ errors: 'server errror' });
        }
    }

    static async getAccount(req, res) {
        try {
            const user = await UserService.findById(req.currentUser.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    errors: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                user
            });
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }

    static async updateAccount(req, res) {
        const body = req.body;

        try {
            const user = await UserService.findById(req.currentUser.id);

            if (!user) {
                return res.status(404).json({
                    errors: 'User not found!'
                });
            }

            user.name = body.name;
            user.lastName = body.lastName;

            const updatedUser = await UserService.updateUser(user);

            const result = {
                success: true,
                user: updatedUser,
                message: 'Account updated!'
            };

            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ errors: 'server errror' });
        }
    }
}

module.exports = { AccountController };
