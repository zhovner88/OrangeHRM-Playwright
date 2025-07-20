import { test, expect } from '@playwright/test';
import { ApplicationFacade } from '../src/patterns/facade/application-facade';
import { TestHelpers } from '../src/utils/test-helpers';

test.describe('Simple Admin Tests', () => {
  let app: ApplicationFacade;
  
  test.beforeEach(async ({ page }) => {
    app = new ApplicationFacade(page);
    
    // Login before each test
    await app.common.loginToApplication();
    await app.navigateToAdmin();
  });
  
  test('should navigate to admin page', async ({ page }) => {
    // Verify admin page is loaded
    await app.admin.verifyAdminPageLoaded();
  });
  
  test('should navigate to job titles', async ({ page }) => {
    // Navigate to job titles
    await app.admin.navigateToJobTitles();
    
    // Verify job titles page is loaded
    await app.admin.verifyJobTitlesPageLoaded();
  });
  
  test('should add a job title', async ({ page }) => {
    // Navigate to job titles
    await app.admin.navigateToJobTitles();
    
    // Generate unique job title using helper
    const jobTitleName = TestHelpers.generateUniqueJobTitle();
    
    // Add job title
    const jobTitleData = {
      title: jobTitleName,
      description: 'Test Description'
    };
    
    await app.admin.addJobTitle(jobTitleData);
    
    // Verify job title was added
    await app.admin.waitForWorkShiftToBeAddedWithLocator(jobTitleName);

    // Remove job title
    await app.admin.removeJobTitle(jobTitleName);
    await app.admin.confirmRemovalOfJobTitle();
  });
  
  test('should navigate to work shifts', async ({ page }) => {
    // Navigate to work shifts
    await app.admin.navigateToWorkShifts();
    
    // Verify work shifts page is loaded
    await app.admin.verifyWorkShiftsPageLoaded();
  });
  
  test('should add a work shift', async ({ page }) => {
    // Navigate to work shifts
    await app.admin.navigateToWorkShifts();
    
    // Generate unique work shift name using helper
    const workShiftName = TestHelpers.generateUniqueWorkShiftName();
    
    // Add work shift
    const workShiftData = {
      name: workShiftName,
      hoursFrom: '09:00',
      hoursTo: '17:00'
    };
    
    await app.admin.addWorkShift(workShiftData);
    
    // Verify work shift was added
    await app.admin.waitForWorkShiftToBeAddedWithLocator(workShiftName);

    // Remove work shift
    await app.admin.removeWorkShift(workShiftName);
    await app.admin.confirmRemovalOfWorkShift();
  });
}); 