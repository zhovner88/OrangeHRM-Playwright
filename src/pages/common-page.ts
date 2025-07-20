import { BasePage } from './base-page';
import { LoginPage } from './login-page';
import { env } from '../config/environment';

export interface LoginCredentials {
  username: string;
  password: string;
}

export class CommonPage extends BasePage {
  private loginPage: LoginPage;

  constructor(page: any) {
    super(page);
    this.loginPage = new LoginPage(page);
  }

  // Required abstract method implementations
  get pageUrl(): string {
    return this.baseUrl;
  }
  
  get pageTitle(): string {
    return 'OrangeHRM';
  }

  // Common authentication methods
  async loginToApplication(credentials?: LoginCredentials): Promise<void> {
    const loginCreds = credentials || {
      username: env.username,
      password: env.password
    };
    
    await this.loginPage.navigate();
    await this.loginPage.verifyLoginPageLoaded();
    await this.loginPage.login(loginCreds);
    await this.loginPage.verifyLoginSuccessful();
  }

  async loginWithDefaultCredentials(): Promise<void> {
    await this.loginToApplication();
  }

  async loginWithCustomCredentials(username: string, password: string): Promise<void> {
    await this.loginToApplication({ username, password });
  }

  async logoutFromApplication(): Promise<void> {
    await this.page.goto(`${this.baseUrl}/auth/logout`);
  }

  async verifyUserIsLoggedIn(): Promise<boolean> {
    try {
      // Check if we're on dashboard or if user menu is visible
      await this.page.waitForSelector('.oxd-topbar-header-breadcrumb', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async verifyUserIsLoggedOut(): Promise<boolean> {
    try {
      // Check if we're on login page
      await this.page.waitForSelector('[name="username"]', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // Common navigation methods
  async navigateToHomePage(): Promise<void> {
    await this.page.goto(this.baseUrl);
  }

  async refreshCurrentPage(): Promise<void> {
    await this.page.reload();
  }

  async waitForPageToLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  // Common utility methods
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async getCurrentPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // Common verification methods
  async verifyPageContainsText(text: string): Promise<void> {
    await this.expectElementToContainText('body', text);
  }

  async verifyElementIsVisible(selector: string): Promise<void> {
    await this.expectElementToBeVisible(selector);
  }

  async verifyElementHasText(selector: string, text: string): Promise<void> {
    await this.expectElementToContainText(selector, text);
  }

  // Common interaction methods
  async clickElement(selector: string): Promise<void> {
    await this.click(selector);
  }

  async fillElement(selector: string, value: string): Promise<void> {
    await this.fill(selector, value);
  }

  async selectOption(selector: string, value: string): Promise<void> {
    await this.page.selectOption(selector, value);
  }

  // Common wait methods
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  async waitForElementToBeVisible(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async waitForElementToBeHidden(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  // Common state checking methods
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.isElementVisible(selector);
  }

  async isElementEnabled(selector: string): Promise<boolean> {
    return await this.isElementEnabled(selector);
  }

  async getElementText(selector: string): Promise<string> {
    return await this.getText(selector);
  }

  async getElementValue(selector: string): Promise<string> {
    return await this.getValue(selector);
  }
} 