import { BasePage } from './base-page';
import { expect, Locator } from '@playwright/test';

export interface JobTitleData {
  title: string;
  description: string;
  specification?: string;
  note?: string;
}

export interface WorkShiftData {
  name: string;
  hoursFrom: string;
  hoursTo: string;
  availableEmployees?: string[];
}

export class AdminPage extends BasePage {

  // Page properties
  get pageUrl(): string {
    return `${this.baseUrl}/web/index.php/admin/viewSystemUsers`;
  }

  get pageTitle(): string {
    return 'OrangeHRM';
  }

  // Header and navigation
  private get adminHeader(): Locator {
    return this.page.getByRole('heading', { name: '/ User Management' })
  }

  private get adminMenu(): Locator {
    return this.page.getByRole('link', { name: 'Admin' })
  }

  // User Management locators
  private get userManagementMenu(): Locator {
    return this.page.getByRole('listitem').filter({ hasText: 'User Management' })
  }

  private get usersSubmenu(): Locator {
    return this.page.getByRole('listitem').filter({ hasText: /^Users$/ })
  }

  private get addUserButton(): Locator {
    return this.page.getByRole('button', { name: ' Add' })
  }

  private get searchUserInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Search' });
  }

  private get searchUserButton(): Locator {
    return this.page.getByRole('button', { name: /Search/i });
  }

  private get userTable(): Locator {
    return this.page.locator('.orangehrm-container');
  }

  // Job locators
  private get jobMenu(): Locator {
    return this.page.getByRole('listitem').filter({ hasText: 'Job' });
  }

  private get jobTitlesSubmenu(): Locator {
    return this.page.getByRole('listitem').filter({ hasText: /^Job Titles$/ });
  }

  private get addJobTitleButton(): Locator {
    return this.page.getByRole('button', { name: /Add/i });
  }

  private get jobTitleInput(): Locator {
    return this.page.getByRole('textbox').nth(1)
  }

  private get jobDescriptionInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Type description here' })
  }

  private get jobSpecificationInput(): Locator {
    return this.page.getByLabel(/Job Specification/i);
  }

  private get jobNoteInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Add note' })
  }

  private get clickSaveJobTitleButton(): Locator {
    return this.page.getByRole('button', { name: 'Save' })
  }

  private get clickCancelJobTitleButton(): Locator {
    return this.page.getByRole('button', { name: 'Cancel' })
  }

  private get clickOkButton(): Locator {
    return this.page.getByRole('button', { name: ' Yes, Delete' })
  }

  private get jobTitlesTable(): Locator {
    return this.page.locator('.orangehrm-container');
  }

  // Work Shifts locators
  private get workShiftsSubmenu(): Locator {
    return this.page.getByRole('listitem').filter({ hasText: /^Work Shifts$/ })
  }

  private get addWorkShiftButton(): Locator {
    return this.page.getByRole('button', { name: /Add/i })
  }

  private get workShiftNameInput(): Locator {
    return this.page.getByRole('textbox').nth(1)
  }

  private get hoursFromInput(): Locator {
    return this.page.getByRole('textbox', { name: 'hh:mm' }).first()
  }

  private get hoursToInput(): Locator {
    return this.page.getByRole('textbox', { name: 'hh:mm' }).nth(1)
  }

  private get hourstAMInput(): Locator {
    return this.page.locator('input[name="am"]')
  }

  private get hourstPMInput(): Locator {
    return this.page.locator('input[name="pm"]')
  }

  private get saveWorkShiftButton(): Locator {
    return this.page.getByRole('button', { name: /Save/i });
  }

  private get workShiftsTable(): Locator {
    return this.page.locator('.oxd-table');
  }

  private get generalInformaitonTitle(): Locator {
    return this.page.getByRole('heading', { name: 'General Information' })
  }

  // Organization locators
  private get organizationMenu(): Locator {
    return this.page.getByRole('listitem').filter({ hasText: 'Organization' })
  }

  private get generalInformationSubmenu(): Locator {
    return this.page.getByRole('menuitem', { name: 'General Information' })
  }

  private get locationsSubmenu(): Locator {
    return this.page.getByRole('menuitem', { name: 'Locations' })
  }

  private get structureSubmenu(): Locator {
    return this.page.getByRole('menuitem', { name: 'Structure' })
  }

  // Qualifications locators
  private get qualificationsMenu(): Locator {
    return this.page.getByRole('listitem').filter({ hasText: 'Qualifications' })
  }

  // Nationalities locators
  private get nationalitiesMenu(): Locator {
    return this.page.getByRole('listitem').filter({ hasText: 'Nationalities' })
  }

  // Corporate Branding locators
  private get corporateBrandingMenu(): Locator {
    return this.page.getByRole('listitem').filter({ hasText: 'Corporate Branding' })
  }

  // Configuration locators
  private get configurationMenu(): Locator {
    return this.page.getByRole('listitem').filter({ hasText: 'Configuration' })
  }

  // Navigation methods
  async navigateToUserManagement(): Promise<void> {
    await this.userManagementMenu.click();
    await this.usersSubmenu.click();
  }

  async navigateToJobTitles(): Promise<void> {
    await this.jobMenu.click();
    await this.jobTitlesSubmenu.click();
  }

  async navigateToWorkShifts(): Promise<void> {
    await this.jobMenu.click();
    await this.workShiftsSubmenu.click();
  }

  async navigateToGeneralInformation(): Promise<void> {
    await this.organizationMenu.click();
    await this.generalInformationSubmenu.click();
  }

  async navigateToLocations(): Promise<void> {
    await this.organizationMenu.click();
    await this.locationsSubmenu.click();
  }

  async navigateToStructure(): Promise<void> {
    await this.organizationMenu.click();
    await this.structureSubmenu.click();
  }

  async navigateToQualifications(): Promise<void> {
    await this.qualificationsMenu.click();
  }

  async navigateToNationalities(): Promise<void> {
    await this.nationalitiesMenu.click();
  }

  async navigateToCorporateBranding(): Promise<void> {
    await this.corporateBrandingMenu.click();
  }

  async navigateToConfiguration(): Promise<void> {
    await this.configurationMenu.click();
  }

  // User Management methods
  async addUser(userData: any): Promise<void> {
    await this.navigateToUserManagement();
    await this.addUserButton.click();
    // Implementation for adding user
  }

  async searchUser(username: string): Promise<void> {
    await this.navigateToUserManagement();
    await this.searchUserInput.fill(username);
    await this.searchUserButton.click();
  }

  async deleteUser(username: string): Promise<void> {
    await this.searchUser(username);
    // Implementation for deleting user
  }

  // Job Title methods
  async addJobTitle(jobTitleData: JobTitleData): Promise<void> {
    await this.navigateToJobTitles();
    await this.addJobTitleButton.click();
    await this.jobTitleInput.fill(jobTitleData.title);
    await this.jobDescriptionInput.fill(jobTitleData.description);

    if (jobTitleData.specification) {
      await this.jobSpecificationInput.fill(jobTitleData.specification);
    }

    if (jobTitleData.note) {
      await this.jobNoteInput.fill(jobTitleData.note);
    }

    await this.clickSaveJobTitleButton.click();
  }

  async searchJobTitle(title: string): Promise<void> {
    await this.navigateToJobTitles();
    // Implementation for searching job title
  }

  async deleteJobTitle(title: string): Promise<void> {
    await this.searchJobTitle(title);
    // Implementation for deleting job title
  }

  async editJobTitle(oldTitle: string, newData: JobTitleData): Promise<void> {
    await this.searchJobTitle(oldTitle);
    // Implementation for editing job title
  }

  // Work Shift methods
  async addWorkShift(workShiftData: WorkShiftData): Promise<void> {
    await this.navigateToWorkShifts();
    await this.addWorkShiftButton.click();
    await this.workShiftNameInput.fill(workShiftData.name);
    // await this.hoursFromInput.fill(workShiftData.hoursFrom);
    // await this.hoursToInput.fill(workShiftData.hoursTo);
    await this.saveWorkShiftButton.click();
  }

  async searchWorkShift(name: string): Promise<void> {
    await this.navigateToWorkShifts();
    // Implementation for searching work shift
  }

  async deleteWorkShift(name: string): Promise<void> {
    await this.searchWorkShift(name);
    // Implementation for deleting work shift
  }

  async editWorkShift(oldName: string, newData: WorkShiftData): Promise<void> {
    await this.searchWorkShift(oldName);
    // Implementation for editing work shift
  }

  // Verification methods
  async verifyAdminPageLoaded(): Promise<void> {
    await this.verifyPageLoaded();
    await expect(this.adminHeader).toBeVisible();
  }

  async verifyAllAdminMenusVisible(): Promise<void> {
    await expect(this.userManagementMenu).toBeVisible();
    await expect(this.jobMenu).toBeVisible();
    await expect(this.organizationMenu).toBeVisible();
    await expect(this.qualificationsMenu).toBeVisible();
    await expect(this.nationalitiesMenu).toBeVisible();
    await expect(this.corporateBrandingMenu).toBeVisible();
    await expect(this.configurationMenu).toBeVisible();
  }

  async verifyJobTitlesPageLoaded(): Promise<void> {
    await expect(this.jobTitlesTable).toBeVisible();
    await expect(this.addJobTitleButton).toBeVisible();
  }

  async verifyWorkShiftsPageLoaded(): Promise<void> {
    await expect(this.workShiftsTable).toBeVisible();
    await expect(this.addWorkShiftButton).toBeVisible();
  }

  async veirifyGeneralInformationPageLoaded() {
    await expect(this.generalInformaitonTitle).toBeVisible();
  }

  async verifyUserManagementPageLoaded(): Promise<void> {
    await expect(this.userTable).toBeVisible();
    await expect(this.addUserButton).toBeVisible();
  }

  // State checking methods
  async isUserManagementMenuVisible(): Promise<boolean> {
    return await this.userManagementMenu.isVisible();
  }

  async isJobMenuVisible(): Promise<boolean> {
    return await this.jobMenu.isVisible();
  }

  async isOrganizationMenuVisible(): Promise<boolean> {
    return await this.organizationMenu.isVisible();
  }

  async isQualificationsMenuVisible(): Promise<boolean> {
    return await this.qualificationsMenu.isVisible();
  }

  async isNationalitiesMenuVisible(): Promise<boolean> {
    return await this.nationalitiesMenu.isVisible();
  }

  async isCorporateBrandingMenuVisible(): Promise<boolean> {
    return await this.corporateBrandingMenu.isVisible();
  }

  async isConfigurationMenuVisible(): Promise<boolean> {
    return await this.configurationMenu.isVisible();
  }

  // Getter methods
  async getAdminHeaderText(): Promise<string> {
    return await this.adminHeader.textContent() || '';
  }

  async getJobTitlesCount(): Promise<number> {
    const rows = this.jobTitlesTable.locator('tr');
    return await rows.count();
  }

  async getWorkShiftsCount(): Promise<number> {
    const rows = this.workShiftsTable.locator('tr');
    return await rows.count();
  }

  async getUsersCount(): Promise<number> {
    const rows = this.userTable.locator('tr');
    return await rows.count();
  }

  // Utility methods
  async refreshAdminPage(): Promise<void> {
    await this.reload();
  }

  async removeJobTitle(name: string): Promise<void> {
    // Wait for the job titles table to be visible first
    await this.jobTitlesTable.waitFor({ state: 'visible' });
    
    // Use Playwright's role-based locator to find the row containing the name
    const rowWithName = this.page.getByRole('row').filter({ hasText: name }).first();
    
    // Wait for the row to be visible
    await rowWithName.waitFor({ state: 'visible', timeout: 500 });
    
    // Find the first button within that row and click it
    const deleteButton = rowWithName.getByRole('button').first();
    await deleteButton.click();
  }

  async waitForWorkShiftToBeAddedWithLocator(name: string): Promise<void> {
    // Wait for the work shift table to be visible
    await this.workShiftsTable.waitFor({ state: 'visible' });
    
    // Use role-based locator to find the first row containing the name
    const rowWithName = this.page.getByRole('row').filter({ hasText: name }).first();
    
    // Wait for the row to be visible
    await rowWithName.waitFor({ state: 'visible', timeout: 10000 });
  }

  // Method to get all inner text from table rows using role locator
  async getAllTableRowText(): Promise<string[]> {
    const tableRows = this.page.getByRole('row');
    const rowTexts: string[] = [];
    
    const count = await tableRows.count();
    for (let i = 0; i < count; i++) {
      const rowText = await tableRows.nth(i).innerText();
      rowTexts.push(rowText);
    }
    
    return rowTexts;
  }

  // Method to find first occurrence of name in table using role locator
  async findFirstOccurrenceOfName(name: string): Promise<boolean> {
    const tableRows = this.page.getByRole('row');
    
    const count = await tableRows.count();
    for (let i = 0; i < count; i++) {
      const rowText = await tableRows.nth(i).innerText();
      if (rowText.includes(name)) {
        return true;
      }
    }
    
    return false;
  }

  async confirmRemovalOfJobTitle() {
    await this.clickOkButton.click();
  }

  async confirmRemovalOfWorkShift() {
    await this.clickOkButton.click();
  }

  async removeWorkShift(name: string): Promise<void> {
    // Wait for the work shifts table to be visible first
    await this.workShiftsTable.waitFor({ state: 'visible' });
    
    // Use Playwright's role-based locator to find the row containing the name
    const rowWithName = this.page.getByRole('row').filter({ hasText: name }).first();
    
    // Wait for the row to be visible
    await rowWithName.waitFor({ state: 'visible', timeout: 500 });
    
    // Find the first button within that row and click it
    const deleteButton = rowWithName.getByRole('button').first();
    await deleteButton.click();
  }
} 