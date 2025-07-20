import { Page } from '@playwright/test';

export interface AuthenticationStrategy {
  authenticate(page: Page, credentials: any): Promise<void>;
  isAuthenticated(page: Page): Promise<boolean>;
}

export interface Credentials {
  username: string;
  password: string;
}

export class StandardAuthenticationStrategy implements AuthenticationStrategy {
  async authenticate(page: Page, credentials: Credentials): Promise<void> {
    // Navigate to login page with full URL
    await page.goto('https://opensource-demo.orangehrmlive.com');
    
    // Wait for login form to be ready
    await page.waitForSelector('[name="username"]', { timeout: 500 });
    await page.waitForSelector('[name="password"]', { timeout: 500 });
    
    // Fill credentials
    await page.fill('[name="username"]', credentials.username);
    await page.fill('[name="password"]', credentials.password);
    
    // Click login button
    await page.click('[type="submit"]');
    
    // Wait for navigation to dashboard with longer timeout
    await page.waitForURL('**/index.php/dashboard/index', { timeout: 500 });
    
    // Additional wait for dashboard to be fully loaded
    await page.locator('.oxd-layout-container').waitFor({ timeout: 500 });
  }
  
  async isAuthenticated(page: Page): Promise<boolean> {
    try {
      await page.waitForSelector('[data-testid="user-dropdown"]', { timeout: 500 });
      return true;
    } catch {
      return false;
    }
  }
}

export class SSOAuthenticationStrategy implements AuthenticationStrategy {
  async authenticate(page: Page, credentials: any): Promise<void> {
    await page.goto('/auth/sso');
    // SSO specific authentication logic
    await page.fill('[name="sso-username"]', credentials.username);
    await page.fill('[name="sso-password"]', credentials.password);
    await page.click('[type="submit"]');
    // await page.waitForURL('**/dashboard');
    await page.waitForURL('**/index.php/dashboard/index', { timeout: 500 });
  }
  
  async isAuthenticated(page: Page): Promise<boolean> {
    try {
      await page.waitForSelector('[data-testid="sso-user-info"]', { timeout: 500 });
      return true;
    } catch {
      return false;
    }
  }
}

export class LDAPAuthenticationStrategy implements AuthenticationStrategy {
  async authenticate(page: Page, credentials: any): Promise<void> {
    await page.goto('/auth/ldap');
    await page.fill('[name="ldap-username"]', credentials.username);
    await page.fill('[name="ldap-password"]', credentials.password);
    await page.click('[type="submit"]');
    // await page.waitForURL('**/dashboard');
    await page.waitForURL('**/index.php/dashboard/index', { timeout: 5000 });
  }
  
  async isAuthenticated(page: Page): Promise<boolean> {
    try {
      await page.waitForSelector('[data-testid="ldap-user-info"]', { timeout: 500 });
      return true;
    } catch {
      return false;
    }
  }
}

export class AuthenticationContext {
  private strategy: AuthenticationStrategy;
  
  constructor(strategy: AuthenticationStrategy) {
    this.strategy = strategy;
  }
  
  setStrategy(strategy: AuthenticationStrategy): void {
    this.strategy = strategy;
  }
  
  async authenticate(page: Page, credentials: any): Promise<void> {
    await this.strategy.authenticate(page, credentials);
  }
  
  async isAuthenticated(page: Page): Promise<boolean> {
    return this.strategy.isAuthenticated(page);
  }
} 