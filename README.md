# OrangeHRM Playwright Automation Framework

Professional framework for UI test automation of the OrangeHRM web application using Playwright and modern design principles.

## 🎯 Project Goal

This project demonstrates a professional approach to test automation using:
- **Page Object Model (POM)**
- **Factory Method Pattern**
- **Singleton Pattern**
- **Facade Pattern**
- **Strategy Pattern**

## 🏗️ Project Architecture

```
OrangeHRM-Playwright-automation/
├── src/
│   ├── config/
│   │   └── environment.ts          # Singleton for configuration
│   ├── patterns/
│   │   ├── factory/
│   │   │   └── browser-factory.ts  # Factory Method + Enum Factory
│   │   ├── strategy/
│   │   │   └── authentication-strategy.ts  # Strategy Pattern
│   │   └── facade/
│   │       └── application-facade.ts        # Facade Pattern
│   └── pages/
│       ├── base-page.ts            # Base Page Object
│       ├── common-page.ts          # Common Page Object (shared methods)
│       ├── login-page.ts           # Login Page Object
│       ├── dashboard-page.ts       # Dashboard Page Object
│       └── admin-page.ts           # Admin Page Object
├── tests/
│   ├── admin.spec.ts               # Admin module tests
│   └── simple-admin.spec.ts        # Simple admin tests
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Design Principles

### 1. Singleton Pattern
**File:** `src/config/environment.ts`

Used for environment configuration, ensuring a single instance of settings:

```typescript
export class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  
  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }
}
```

### 2. Factory Method + Enum Factory
**File:** `src/patterns/factory/browser-factory.ts`

Creates different browser types through factory:

```typescript
export enum BrowserType {
  CHROMIUM = 'chromium',
  FIREFOX = 'firefox',
  WEBKIT = 'webkit'
}

export class BrowserFactoryCreator {
  private static factories: Map<BrowserType, BrowserFactory> = new Map([
    [BrowserType.CHROMIUM, new ChromiumFactory()],
    [BrowserType.FIREFOX, new FirefoxFactory()],
    [BrowserType.WEBKIT, new WebkitFactory()]
  ]);
}
```

### 3. Strategy Pattern
**File:** `src/patterns/strategy/authentication-strategy.ts`

Allows dynamic switching of authentication strategies:

```typescript
export interface AuthenticationStrategy {
  authenticate(page: Page, credentials: any): Promise<void>;
  isAuthenticated(page: Page): Promise<boolean>;
}

export class AuthenticationContext {
  private strategy: AuthenticationStrategy;
  
  setStrategy(strategy: AuthenticationStrategy): void {
    this.strategy = strategy;
  }
}
```

### 4. Facade Pattern
**File:** `src/patterns/facade/application-facade.ts`

Simplifies interaction with different application components:

```typescript
export class ApplicationFacade {
  async login(credentials: Credentials): Promise<void> {
    await this.authContext.authenticate(this.page, credentials);
  }
}
```

### 5. Page Object Model
**File:** `src/pages/base-page.ts`

Base class for all Page Objects with common methods:

```typescript
export abstract class BasePage {
  abstract get pageUrl(): string;
  abstract get pageTitle(): string;
  
  async navigate(): Promise<void> {
    await this.page.goto(this.pageUrl);
    await this.waitForPageLoad();
  }
}
```

### 6. Common Page Pattern
**File:** `src/pages/common-page.ts`

Shared page object for common operations across the application:

```typescript
export class CommonPage extends BasePage {
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
  
  async verifyUserIsLoggedIn(): Promise<boolean> {
    // Check if user is logged in
  }
  
  async logoutFromApplication(): Promise<void> {
    // Handle logout
  }
}
```

## 🚀 Installation and Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Install browsers
```bash
npm run install:browsers
```

### 3. Run tests
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests in headed mode
npm run test:headed
```

### 4. Generate code
```bash
npm run codegen
```

## 📋 Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
USERNAME=Admin
PASSWORD=admin123
HEADLESS=true
SLOW_MO=0
TIMEOUT=500
RETRIES=2
```

### Playwright Configuration
The `playwright.config.ts` file is configured for:
- Parallel test execution
- Multiple browser support (Chrome, Firefox, Safari)
- Mobile devices
- Report generation (HTML, JSON, JUnit)

## 🧪 Test Structure

### Login Tests (`tests/login.spec.ts`)
- Authentication testing
- Strategy Pattern demonstration
- Factory Pattern testing
- Singleton Pattern testing
- Facade Pattern testing

### Dashboard Tests (`tests/dashboard.spec.ts`)
- Module navigation
- Dashboard element verification
- Business logic through Facade
- Utility functions

### Admin Tests (`tests/admin.spec.ts`)
- Job Titles management
- Work Shifts management
- User management
- Factory Pattern integration

### Common Tests (`tests/common.spec.ts`)
- Authentication operations
- Navigation utilities
- Element interactions
- State checking methods

## 🔧 Main Features

### Application Facade
```typescript
// Login using common page
await app.common.loginToApplication();

// Login with custom credentials
await app.common.loginWithCustomCredentials('Admin', 'admin123');

// Add employee
await app.addEmployee(employeeData);

// Search employee
const result = await app.searchEmployee('John Doe');

// Apply for leave
await app.applyLeave(leaveData);

// Add job title
await app.addJobTitle(jobTitleData);
```

### Browser Factory
```typescript
// Create browser
const browser = await BrowserFactoryCreator.createBrowser(BrowserType.CHROMIUM);

// Create context
const context = await BrowserFactoryCreator.createContext(BrowserType.CHROMIUM, browser);

// Create page
const page = await BrowserFactoryCreator.createPage(BrowserType.CHROMIUM, context);
```

### Authentication Strategy
```typescript
// Standard authentication
const authContext = new AuthenticationContext(new StandardAuthenticationStrategy());

// SSO authentication
authContext.setStrategy(new SSOAuthenticationStrategy());

// LDAP authentication
authContext.setStrategy(new LDAPAuthenticationStrategy());
```

## 📊 Reports

The project generates reports in various formats:
- **HTML Report**: `test-results/index.html`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/results.xml`

To view HTML report:
```bash
npm run test:report
```

## 🎯 Architecture Benefits

1. **Scalability**: Easy to add new Page Objects and tests
2. **Maintainability**: Clear structure and design principles
3. **Reusability**: Common components and utilities
4. **Flexibility**: Ability to change strategies and factories
5. **Readability**: Clear code with well-defined structure

## 🛠️ Technologies

- **Playwright**: Browser automation
- **TypeScript**: Code typing and safety
- **Node.js**: Runtime environment
- **npm**: Dependency management

## 📝 License

MIT License

## 👨‍💻 Author

Created to demonstrate professional test automation skills using modern design principles.

---

**Note**: This project uses the OrangeHRM demo version for testing. All data is reset every hour. 