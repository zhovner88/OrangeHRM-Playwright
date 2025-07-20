import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';

export enum BrowserType {
  CHROMIUM = 'chromium',
  FIREFOX = 'firefox',
  WEBKIT = 'webkit'
}

export interface BrowserConfig {
  headless?: boolean;
  slowMo?: number;
  args?: string[];
}

export abstract class BrowserFactory {
  abstract createBrowser(config?: BrowserConfig): Promise<Browser>;
  abstract createContext(browser: Browser, config?: BrowserConfig): Promise<BrowserContext>;
  abstract createPage(context: BrowserContext): Promise<Page>;
}

export class ChromiumFactory extends BrowserFactory {
  async createBrowser(config?: BrowserConfig): Promise<Browser> {
    return chromium.launch({
      headless: config?.headless ?? true,
      slowMo: config?.slowMo ?? 0,
      args: config?.args ?? []
    });
  }
  
  async createContext(browser: Browser, config?: BrowserConfig): Promise<BrowserContext> {
    return browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true
    });
  }
  
  async createPage(context: BrowserContext): Promise<Page> {
    return context.newPage();
  }
}

export class FirefoxFactory extends BrowserFactory {
  async createBrowser(config?: BrowserConfig): Promise<Browser> {
    return firefox.launch({
      headless: config?.headless ?? true,
      slowMo: config?.slowMo ?? 0
    });
  }
  
  async createContext(browser: Browser, config?: BrowserConfig): Promise<BrowserContext> {
    return browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true
    });
  }
  
  async createPage(context: BrowserContext): Promise<Page> {
    return context.newPage();
  }
}

export class WebkitFactory extends BrowserFactory {
  async createBrowser(config?: BrowserConfig): Promise<Browser> {
    return webkit.launch({
      headless: config?.headless ?? true,
      slowMo: config?.slowMo ?? 0
    });
  }
  
  async createContext(browser: Browser, config?: BrowserConfig): Promise<BrowserContext> {
    return browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true
    });
  }
  
  async createPage(context: BrowserContext): Promise<Page> {
    return context.newPage();
  }
}

export class BrowserFactoryCreator {
  private static factories: Map<BrowserType, BrowserFactory> = new Map([
    [BrowserType.CHROMIUM, new ChromiumFactory()],
    [BrowserType.FIREFOX, new FirefoxFactory()],
    [BrowserType.WEBKIT, new WebkitFactory()]
  ]);
  
  static getFactory(browserType: BrowserType): BrowserFactory {
    const factory = this.factories.get(browserType);
    if (!factory) {
      throw new Error(`Unsupported browser type: ${browserType}`);
    }
    return factory;
  }
  
  static async createBrowser(browserType: BrowserType, config?: BrowserConfig): Promise<Browser> {
    const factory = this.getFactory(browserType);
    return factory.createBrowser(config);
  }
  
  static async createContext(browserType: BrowserType, browser: Browser, config?: BrowserConfig): Promise<BrowserContext> {
    const factory = this.getFactory(browserType);
    return factory.createContext(browser, config);
  }
  
  static async createPage(browserType: BrowserType, context: BrowserContext): Promise<Page> {
    const factory = this.getFactory(browserType);
    return factory.createPage(context);
  }
} 