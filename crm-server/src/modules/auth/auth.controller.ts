import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login() {
    // TODO login
  }

  @Post('logout')
  async logout() {
    // TODO logout
  }

  @Post('refresh-tokens')
  async refreshTokens() {
    // TODO refreshTokens
  }

  @Post('logout-all-sessions')
  async logoutAllSessions() {
    // TODO logout-all-sessions
  }

  @Post('register')
  async register() {
    // TODO registration
  }

  @Post('confirm-registration')
  async confirmRegistration() {
    // TODO confirm-registration
  }

  @Post('reset-password')
  async resetPassword() {
    // TODO reset-password
  }

  @Post('confirm-new-password')
  async confirmNewPassword() {
    // TODO confirm-new-password
  }
}
