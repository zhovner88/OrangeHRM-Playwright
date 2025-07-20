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

  // Alternative locator strategies examples
  async navigateToAdminAlternative(): Promise<void> {
    // Method 1: Using role-based locator (most reliable)
    await this.clickByRole('link', 'Admin');
    
    // Method 2: Using text-based locator
    // await this.clickByText('Admin', true);
    
    // Method 3: Using filtered locator
    // await this.clickByFilteredLocator('.oxd-main-menu-item', { hasText: 'Admin' });
    
    // Method 4: Using XPath (when CSS fails)
    // await this.clickByXPath('//a[contains(text(), "Admin")]');
  }

  async searchInMenuAlternative(searchTerm: string): Promise<void> {
    // Method 1: Using placeholder
    await this.fillByPlaceholder('Search', searchTerm);
    
    // Method 2: Using role-based locator
    // await this.fillByRole('textbox', searchTerm, 'Search');
    
    // Method 3: Using test ID (if available)
    // await this.fillByTestId('menu-search-input', searchTerm);
  }

  async logoutAlternative(): Promise<void> {
    // Method 1: Using role-based locator
    await this.clickByRole('button', 'User dropdown');
    await this.clickByRole('menuitem', 'Logout');
    
    // Method 2: Using text-based locator
    // await this.clickByText('User dropdown');
    // await this.clickByText('Logout');
    
    // Method 3: Using relative locator
    // await this.clickByRelativeLocator('.oxd-userdropdown-tab', 'button');
    // await this.clickByText('Logout');
  }

  async verifyMenuItemsAlternative(): Promise<void> {
    // Method 1: Using role-based visibility checks
    await this.isVisibleByRole('link', 'Admin');
    await this.isVisibleByRole('link', 'PIM');
    await this.isVisibleByRole('link', 'Leave');
    
    // Method 2: Using text-based visibility checks
    // await this.isVisibleByText('Admin', true);
    // await this.isVisibleByText('PIM', true);
    // await this.isVisibleByText('Leave', true);
    
    // Method 3: Using test ID visibility checks (if available)
    // await this.isVisibleByTestId('admin-menu-item');
    // await this.isVisibleByTestId('pim-menu-item');
    // await this.isVisibleByTestId('leave-menu-item');
  }

  // Complex locator examples
  async clickSpecificUserInTable(userName: string): Promise<void> {
    // Method 1: Using filtered locator
    await this.clickByFilteredLocator('.oxd-table-row', { hasText: userName });
    
    // Method 2: Using relative locator
    // await this.clickByRelativeLocator(`.oxd-table-row:has-text("${userName}")`, 'button');
    
    // Method 3: Using XPath with text matching
    // await this.clickByXPath(`//tr[contains(., "${userName}")]//button`);
  }

  async fillFormFieldByLabel(fieldLabel: string, value: string): Promise<void> {
    // Method 1: Using label-based locator
    await this.fillByLabel(fieldLabel, value);
    
    // Method 2: Using role-based locator with name
    // await this.fillByRole('textbox', value, fieldLabel);
    
    // Method 3: Using relative locator to find input near label
    // await this.clickByRelativeLocator(`label:has-text("${fieldLabel}")`, 'input');
    // await this.page.keyboard.type(value);
  }
} 