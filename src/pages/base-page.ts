import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  protected baseUrl: string;
  
  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'https://opensource-demo.orangehrmlive.com';
  }
  
  // Abstract methods that must be implemented by child classes
  abstract get pageUrl(): string;
  abstract get pageTitle(): string;
  
  // Navigation methods
  async navigate(): Promise<void> {
    await this.page.goto(this.pageUrl);
    await this.waitForPageLoad();
  }
  
  async waitForPageLoad(): Promise<void> {
    // Wait for DOM content to be loaded
    await this.page.waitForLoadState('domcontentloaded');
  }
  
  async waitForPageSteadyState(): Promise<void> {
    // Wait for network to be idle for a short period
    await this.page.waitForLoadState('networkidle', { timeout: 1000 });
    
    // Additional steady state check - wait for no ongoing animations or transitions
    await this.page.waitForFunction(() => {
      // Check if there are any ongoing animations or transitions
      const animatedElements = Array.from(document.querySelectorAll('[style*="animation"], [style*="transition"]'));
      for (const element of animatedElements) {
        const style = window.getComputedStyle(element);
        // Check if animation is running
        if (style.animationName !== 'none' && style.animationPlayState && style.animationPlayState === 'running') {
          return false;
        }
        // Check if transition is ongoing
        if (style.transitionProperty && style.transitionProperty !== 'none') {
          return false;
        }
      }
      
      // Check if page is ready (no loading indicators)
      const loadingIndicators = document.querySelectorAll('.oxd-loading-spinner, .loading, [data-testid*="loading"]');
      if (loadingIndicators.length > 0) {
        return false;
      }
      
      // Check if main content is visible
      const mainContent = document.querySelector('.oxd-main-menu, .oxd-topbar, .oxd-table');
      if (!mainContent) {
        return false;
      }
      
      return true;
    }, { timeout: 15000 });
  }
  
  async waitForElement(selector: string, timeout: number = 500): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }
  
  async waitForElementToBeVisible(selector: string, timeout: number = 500): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }
  
  async waitForElementToBeHidden(selector: string, timeout: number = 500): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }
  
  // Element interaction methods
  async click(selector: string): Promise<void> {
    await this.waitForElementToBeVisible(selector);
    await this.page.click(selector);
  }
  
  async fill(selector: string, value: string): Promise<void> {
    await this.waitForElementToBeVisible(selector);
    await this.page.fill(selector, value);
  }
  
  async type(selector: string, value: string): Promise<void> {
    await this.waitForElementToBeVisible(selector);
    await this.page.type(selector, value);
  }
  
  async selectOption(selector: string, value: string): Promise<void> {
    await this.waitForElementToBeVisible(selector);
    await this.page.selectOption(selector, value);
  }
  
  async check(selector: string): Promise<void> {
    await this.waitForElementToBeVisible(selector);
    await this.page.check(selector);
  }
  
  async uncheck(selector: string): Promise<void> {
    await this.waitForElementToBeVisible(selector);
    await this.page.uncheck(selector);
  }
  
  // Element state methods
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout: 500 });
      return true;
    } catch {
      return false;
    }
  }
  
  async isElementEnabled(selector: string): Promise<boolean> {
    return await this.page.isEnabled(selector);
  }
  
  async isElementChecked(selector: string): Promise<boolean> {
    return await this.page.isChecked(selector);
  }
  
  // Text and content methods
  async getText(selector: string): Promise<string> {
    await this.waitForElementToBeVisible(selector);
    return await this.page.textContent(selector) || '';
  }
  
  async getValue(selector: string): Promise<string> {
    await this.waitForElementToBeVisible(selector);
    return await this.page.inputValue(selector);
  }
  
  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    await this.waitForElementToBeVisible(selector);
    return await this.page.getAttribute(selector, attribute);
  }
  
  // Assertion methods
  async expectElementToBeVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
  }
  
  async expectElementToBeHidden(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeHidden();
  }
  
  async expectElementToHaveText(selector: string, text: string): Promise<void> {
    await expect(this.page.locator(selector)).toHaveText(text);
  }
  
  async expectElementToContainText(selector: string, text: string): Promise<void> {
    await expect(this.page.locator(selector)).toContainText(text);
  }
  
  async expectElementToHaveValue(selector: string, value: string): Promise<void> {
    await expect(this.page.locator(selector)).toHaveValue(value);
  }
  
  async expectElementToBeEnabled(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeEnabled();
  }
  
  async expectElementToBeDisabled(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeDisabled();
  }
  
  async expectElementToBeChecked(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeChecked();
  }
  
  async expectElementToBeUnchecked(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).not.toBeChecked();
  }
  
  // Page verification methods
  async verifyPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(this.pageTitle);
  }
  
  async verifyPageUrl(): Promise<void> {
    await expect(this.page).toHaveURL(this.pageUrl);
  }
  
  async verifyPageLoaded(): Promise<void> {
    await this.verifyPageTitle();
    await this.verifyPageUrl();
  }
  
  // Utility methods
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
  
  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
  
  async reload(): Promise<void> {
    await this.page.reload();
    await this.waitForPageLoad();
  }
  
  async goBack(): Promise<void> {
    await this.page.goBack();
    await this.waitForPageLoad();
  }
  
  async goForward(): Promise<void> {
    await this.page.goForward();
    await this.waitForPageLoad();
  }
} 