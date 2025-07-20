import dotenv from 'dotenv';

dotenv.config();

export class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  
  private constructor() {}
  
  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }
  
  get baseUrl(): string {
    return process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com';
  }
  
  get username(): string {
    return process.env.USERNAME || 'Admin';
  }
  
  get password(): string {
    return process.env.PASSWORD || 'admin123';
  }
  
  get headless(): boolean {
    return process.env.HEADLESS === 'true';
  }
  
  get slowMo(): number {
    return parseInt(process.env.SLOW_MO || '0');
  }
  
  get timeout(): number {
    return parseInt(process.env.TIMEOUT || '500');
  }
  
  get retries(): number {
    return parseInt(process.env.RETRIES || '2');
  }
}

export const env = EnvironmentConfig.getInstance(); 