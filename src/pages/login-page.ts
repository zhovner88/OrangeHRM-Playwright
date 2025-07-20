import { BasePage } from './base-page';
import { expect } from '@playwright/test';

export interface LoginCredentials {
  username: string;
  password: string;
}

export class LoginPage extends BasePage {
  // Page properties
  get pageUrl(): string {
    return `${this.baseUrl}/`;
  }
  
  get pageTitle(): string {
    return 'OrangeHRM';
  }
  
  // Selectors
  private readonly usernameInput = '[name="username"]';
  private readonly passwordInput = '[name="password"]';
  private readonly loginButton = '[type="submit"]';
  private readonly loginPanel = '.orangehrm-login-panel';
  private readonly errorMessage = '.oxd-alert-content-text';
  private readonly dashboardHeader = '.oxd-topbar-header-breadcrumb';
  
  // Login methods
  async login(credentials: LoginCredentials): Promise<void> {
    await this.fill(this.usernameInput, credentials.username);
    await this.fill(this.passwordInput, credentials.password);
    await this.click(this.loginButton);
  }
  
  async loginWithUsername(username: string, password: string): Promise<void> {
    await this.login({ username, password });
  }
  
  async enterUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username);
  }
  
  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }
  
  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }
  
  async clickForgotPassword(): Promise<void> {
    await this.page.getByText('Forgot your password?').click();
  }
  
  // Verification methods
  async verifyLoginPageLoaded(): Promise<void> {
    // await this.verifyPageLoaded();
    await this.page.getByRole('img', { name: 'company-branding' }).waitFor({ state: 'visible' });
  }
  
  async verifyLoginSuccessful(): Promise<void> {
    await this.expectElementToBeVisible(this.dashboardHeader);
    await this.page.getByRole('banner').getByRole('img', { name: 'profile picture' }).isVisible
  }
  
  async verifyLoginFailed(): Promise<void> {
    await this.expectElementToBeVisible(this.errorMessage);
  }
  
  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await this.expectElementToContainText(this.errorMessage, expectedMessage);
  }
  
  async verifyUsernameFieldEmpty(): Promise<void> {
    await this.expectElementToHaveValue(this.usernameInput, '');
  }
  
  async verifyPasswordFieldEmpty(): Promise<void> {
    await this.expectElementToHaveValue(this.passwordInput, '');
  }
  
  async verifyUsernameFieldFilled(username: string): Promise<void> {
    await this.expectElementToHaveValue(this.usernameInput, username);
  }
  
  async verifyPasswordFieldFilled(password: string): Promise<void> {
    await this.expectElementToHaveValue(this.passwordInput, password);
  }
  
  // State checking methods
  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.isElementEnabled(this.loginButton);
  }
  
  async isUsernameFieldVisible(): Promise<boolean> {
    return await this.isElementVisible(this.usernameInput);
  }
  
  async isPasswordFieldVisible(): Promise<boolean> {
    return await this.isElementVisible(this.passwordInput);
  }
  
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }
  
  // Getter methods
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }
  
  async getUsernameValue(): Promise<string> {
    return await this.getValue(this.usernameInput);
  }
  
  async getPasswordValue(): Promise<string> {
    return await this.getValue(this.passwordInput);
  }
  
  // Clear methods
  async clearUsername(): Promise<void> {
    await this.page.fill(this.usernameInput, '');
  }
  
  async clearPassword(): Promise<void> {
    await this.page.fill(this.passwordInput, '');
  }
  
  async clearAllFields(): Promise<void> {
    await this.clearUsername();
    await this.clearPassword();
  }
  
  // Keyboard interaction methods
  async pressTabInUsername(): Promise<void> {
    await this.page.press(this.usernameInput, 'Tab');
  }
  
  async pressTabInPassword(): Promise<void> {
    await this.page.press(this.passwordInput, 'Tab');
  }
  
  async pressEnterInUsername(): Promise<void> {
    await this.page.press(this.usernameInput, 'Enter');
  }
  
  async pressEnterInPassword(): Promise<void> {
    await this.page.press(this.passwordInput, 'Enter');
  }
  
  // Accessibility methods
  async verifyUsernameFieldAccessibility(): Promise<void> {
    const usernameField = this.page.locator(this.usernameInput);
    await expect(usernameField).toHaveAttribute('name', 'username');
    await expect(usernameField).toHaveAttribute('type', 'text');
  }
  
  async verifyPasswordFieldAccessibility(): Promise<void> {
    const passwordField = this.page.locator(this.passwordInput);
    await expect(passwordField).toHaveAttribute('name', 'password');
    await expect(passwordField).toHaveAttribute('type', 'password');
  }
  
  async verifyLoginButtonAccessibility(): Promise<void> {
    const loginButton = this.page.locator(this.loginButton);
    await expect(loginButton).toHaveAttribute('type', 'submit');
  }
} 