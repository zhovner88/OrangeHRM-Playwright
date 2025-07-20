import { Page, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { DashboardPage } from '../../pages/dashboard-page';
import { AdminPage } from '../../pages/admin-page';
import { CommonPage } from '../../pages/common-page';

export interface LoginCredentials {
  username: string;
  password: string;
}

export class ApplicationFacade {
  private page: Page;
  
  // Page Objects
  private loginPage: LoginPage;
  private dashboardPage: DashboardPage;
  private adminPage: AdminPage;
  private commonPage: CommonPage;
  
  constructor(page: Page) {
    this.page = page;
    
    // Initialize page objects
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.adminPage = new AdminPage(page);
    this.commonPage = new CommonPage(page);
  }
  
  // Authentication Facade Methods
  async loginWithCredentials(credentials: LoginCredentials): Promise<void> {
    await this.commonPage.loginToApplication(credentials);
  }
  
  async logout(): Promise<void> {
    await this.commonPage.logoutFromApplication();
  }
  
  async isLoggedIn(): Promise<boolean> {
    return await this.commonPage.verifyUserIsLoggedIn();
  }
  
  // Navigation Facade Methods
  async navigateToDashboard(): Promise<void> {
    await this.dashboardPage.navigate();
  }
  
  async navigateToAdmin(): Promise<void> {
    await this.adminPage.navigate();
  }
  
  // Business Logic Facade Methods
  async addJobTitle(jobTitleData: any): Promise<void> {
    await this.navigateToAdmin();
    await this.adminPage.addJobTitle(jobTitleData);
  }
  
  async addWorkShift(workShiftData: any): Promise<void> {
    await this.navigateToAdmin();
    await this.adminPage.addWorkShift(workShiftData);
  }
  
  // Utility Facade Methods
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
  
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
  
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
  
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
  
  // Element visibility methods
  async expectElementToBeVisible(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }
  
  async expectElementToHaveText(selector: string, text: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
    const element = this.page.locator(selector);
    await expect(element).toHaveText(text);
  }
  
  // Getter methods for direct access to page objects if needed
  get login(): LoginPage { return this.loginPage; }
  get dashboard(): DashboardPage { return this.dashboardPage; }
  get admin(): AdminPage { return this.adminPage; }
  get common(): CommonPage { return this.commonPage; }
}