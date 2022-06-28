import 'dotenv/config';

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getAppSecret() {
    return this.getValue('APP_SECRET', true);
  }

  public getJwtExpired() {
    return this.getValue('JWT_EXPIRED', true);
  }
}

const configService = new ConfigService(process.env).ensureValues(['PORT', 'APP_SECRET', 'JWT_EXPIRED']);

export { configService };
