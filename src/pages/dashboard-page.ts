import { BasePage } from './base-page';

export class DashboardPage extends BasePage {
  // Page properties
  get pageUrl(): string {
    return `${this.baseUrl}/web/index.php/dashboard/index`;
  }
  
  get pageTitle(): string {
    return 'OrangeHRM';
  }
  
  // Selectors
  private readonly dashboardHeader = '.oxd-topbar-header-breadcrumb';
  private readonly userDropdown = '[class="oxd-userdropdown-tab"]'
  private readonly mainMenu = '.oxd-main-menu';
  private readonly searchInput = '.oxd-main-menu-search';

  
  // Dashboard content selectors
  private readonly welcomeMessage = '.oxd-text--h6';
  
  // Navigation methods
  async navigateToAdmin(): Promise<void> {
    await this.page.getByRole('link', { name: 'Admin' }).click();
  }
  
  async navigateToLeave(): Promise<void> {
    await this.page.getByRole('link', { name: 'Leave' }).click();
  }
  
  async navigateToTime(): Promise<void> {
    await this.page.getByRole('link', { name: 'Time' }).click();
  }
  
  async navigateToRecruitment(): Promise<void> {
    await this.page.getByRole('link', { name: 'Recruitment' }).click();
  }
  
  async navigateToMyInfo(): Promise<void> {
    await this.page.getByRole('link', { name: 'My Info' }).click();
  }
  
  async navigateToPerformance(): Promise<void> {
    await this.page.getByRole('link', { name: 'Performance' }).click();
  }
  
  async navigateToDirectory(): Promise<void> {
    await this.page.getByRole('link', { name: 'Directory' }).click();
  }
  
  async navigateToMaintenance(): Promise<void> {
    await this.page.getByRole('link', { name: 'Maintenance' }).click();
  }
  
  async navigateToClaim(): Promise<void> {
    await this.page.getByRole('link', { name: 'Claim' }).click();
  }
  
  async navigateToBuzz(): Promise<void> {
    await this.page.getByRole('link', { name: 'Buzz' }).click();
  }
  
  // User actions
  async logout(): Promise<void> {
    await this.click(this.userDropdown);
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
  }
  
  async openUserDropdown(): Promise<void> {
    await this.click(this.userDropdown);
  }
  
  // Search functionality
  async searchInMenu(searchTerm: string): Promise<void> {
    await this.fill(this.searchInput, searchTerm);
  }
  
  async clearSearch(): Promise<void> {
    await this.page.fill(this.searchInput, '');
  }
  
  // Verification methods
  async verifyDashboardLoaded(): Promise<void> {
    await this.verifyPageLoaded();
    await this.expectElementToBeVisible(this.dashboardHeader);
    await this.expectElementToBeVisible(this.mainMenu);
    await this.expectElementToBeVisible(this.welcomeMessage);
  }
  
    async verifyAllMenuItemsVisible(): Promise<void> {
      await this.isAdminMenuVisible();
      await this.isPimMenuVisible();
      await this.isLeaveMenuVisible();
      await this.isTimeMenuVisible();
      await this.isRecruitmentMenuVisible();
      await this.isMyInfoMenuVisible();
      await this.isPerformanceMenuVisible();
    }
  
  async verifyDashboardCardsVisible(): Promise<void> {
    await this.isDashboardMenuVisible();
    await this.isBuzzMenuVisible();
    await this.isClaimMenuVisible();
    await this.isDirectoryMenuVisible();
    await this.isMaintenanceMenuVisible();
    await this.isPerformanceMenuVisible();
  }
  
  async isAdminMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Admin' }).isVisible();
  }

  async isPimMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'PIM' }).isVisible();
  }

  async isLeaveMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Leave' }).isVisible();
  }

  async isTimeMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Time' }).isVisible();
  }

  async isRecruitmentMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Recruitment' }).isVisible();
  }

  async isMyInfoMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'My Info' }).isVisible();
  }

  async isPerformanceMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Performance' }).isVisible();
  }

  async isDashboardMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Dashboard' }).isVisible();
  }
  
  async isDirectoryMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Directory' }).isVisible();
  }

  async isMaintenanceMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Maintenance' }).isVisible();
  }

  async isClaimMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Claim' }).isVisible();
  }

  async isBuzzMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Buzz' }).isVisible();
  }
  
  // Refresh dashboard
  async refreshDashboard(): Promise<void> {
    await this.reload();
  }
} 