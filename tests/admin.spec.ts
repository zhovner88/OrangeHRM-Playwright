import { test, expect } from '@playwright/test';
import { ApplicationFacade } from '../src/patterns/facade/application-facade';
import { BrowserFactoryCreator, BrowserType } from '../src/patterns/factory/browser-factory';
import { env } from '../src/config/environment';

test.describe('Admin Module Tests', () => {
  let app: ApplicationFacade;
  
  test.beforeEach(async ({ page }) => {
    app = new ApplicationFacade(page);
    
    // Login before each test using common page
    await app.common.loginToApplication();
    await app.navigateToAdmin();
  });
  
  test.describe('Admin Navigation', () => {

    test('should navigate to User Management', async ({ page }) => {
      // --- WHEN ---
      await app.admin.navigateToUserManagement();
      
      // --- THEN ---
      await app.admin.verifyUserManagementPageLoaded();
    });
    
    test('should navigate to Job Titles', async ({ page }) => {
      // -- WHEN --
      await app.admin.navigateToJobTitles();
      
      // -- THEN --
      await app.admin.verifyJobTitlesPageLoaded();
    });
    
    test('should navigate to Work Shifts', async ({ page }) => {
      // -- WHEN --
      await app.admin.navigateToWorkShifts();
      
      // -- THEN --
      await app.admin.verifyWorkShiftsPageLoaded();
    });
    
    test('should navigate to General Information', async ({ page }) => {
      // -- WHEN --
      await app.admin.navigateToGeneralInformation();
      
      // -- THEN --
      await app.admin.veirifyGeneralInformationPageLoaded();
    });
    
  });
});