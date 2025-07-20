# OrangeHRM Playwright Automation Project Setup

## 🚀 Quick Start

### 1. Clone the project
```bash
git clone <your-repo-url>
cd OrangeHRM-Playwright-automation
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install browsers
```bash
npx playwright install
```

### 4. Create .env file
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

### 5. Run tests
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

## 🎯 Design Patterns Demonstration

### Singleton Pattern
```bash
npm test -- --grep "should demonstrate singleton pattern"
```

### Factory Method Pattern
```bash
npm test -- --grep "should demonstrate factory method pattern"
```

### Strategy Pattern
```bash
npm test -- --grep "should demonstrate strategy pattern"
```

### Facade Pattern
```bash
npm test -- --grep "should demonstrate facade pattern"
```

### All patterns together
```bash
npm test -- --grep "should demonstrate all patterns working together"
```

## 📁 Project Structure

```
OrangeHRM-Playwright-automation/
├── src/
│   ├── config/
│   │   └── environment.ts          # Singleton Pattern
│   ├── patterns/
│   │   ├── factory/
│   │   │   └── browser-factory.ts  # Factory Method + Enum Factory
│   │   ├── strategy/
│   │   │   └── authentication-strategy.ts  # Strategy Pattern
│   │   └── facade/
│   │       └── application-facade.ts        # Facade Pattern
│   └── pages/
│       ├── base-page.ts            # Base Page Object
│       ├── login-page.ts           # Login Page Object
│       ├── dashboard-page.ts       # Dashboard Page Object
│       └── ...                     # Other Page Objects
├── tests/
│   ├── login.spec.ts               # Authentication tests
│   ├── dashboard.spec.ts           # Dashboard tests
│   ├── admin.spec.ts               # Admin module tests
│   └── patterns-demo.spec.ts       # Design patterns demonstration
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── README.md
└── SETUP.md
```

## 🔧 Main Commands

### Running Tests
```bash
# All tests
npm test

# Specific test
npm test -- --grep "test name"

# Tests with UI
npm run test:ui

# Tests in debug mode
npm run test:debug

# Tests in headed mode
npm run test:headed
```

### Code Generation
```bash
# Generate code for website
npm run codegen
```

### Reports
```bash
# Show HTML report
npm run test:report
```

## 🎨 Design Patterns in Action

### 1. Singleton Pattern
Used for environment configuration:
```typescript
const env = EnvironmentConfig.getInstance();
console.log(env.baseUrl); // https://opensource-demo.orangehrmlive.com
```

### 2. Factory Method + Enum Factory
Creating different browser types:
```typescript
const chromiumFactory = BrowserFactoryCreator.getFactory(BrowserType.CHROMIUM);
const firefoxFactory = BrowserFactoryCreator.getFactory(BrowserType.FIREFOX);
```

### 3. Strategy Pattern
Dynamic authentication strategy switching:
```typescript
const authContext = new AuthenticationContext(new StandardAuthenticationStrategy());
authContext.setStrategy(new SSOAuthenticationStrategy());
```

### 4. Facade Pattern
Simplifying application interaction:
```typescript
const app = new ApplicationFacade(page);
await app.login(credentials);
await app.addEmployee(employeeData);
```

### 5. Page Object Model
Encapsulating page logic:
```typescript
await app.login.verifyLoginPageLoaded();
await app.dashboard.verifyDashboardLoaded();
```

## 🐛 Troubleshooting

### Selector Errors
If tests fail due to incorrect selectors:
1. Open the website in browser
2. Use DevTools to check selectors
3. Update selectors in corresponding Page Objects

### Authentication Errors
If login issues occur:
1. Check the `.env` file
2. Ensure the website is accessible
3. Try different credentials

### Browser Errors
If browser issues occur:
```bash
npx playwright install --force
```

## 📊 Reports and Results

After running tests, reports are generated:
- **HTML Report**: `test-results/index.html`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/results.xml`

To view HTML report:
```bash
npm run test:report
```

## 🎯 Architecture Benefits

1. **Scalability**: Easy to add new tests and functionality
2. **Maintainability**: Clear structure and design principles
3. **Reusability**: Common components and utilities
4. **Flexibility**: Ability to change strategies and factories
5. **Readability**: Clear code with well-defined structure

## 📝 Notes

- This project uses the OrangeHRM demo version
- All data is reset every hour
- Some features may not be available in the demo version
- The project is designed to demonstrate design principles

## 🤝 Contributing

To contribute changes:
1. Create a new branch
2. Make changes
3. Create a Pull Request
4. Describe changes in the comment

## 📞 Support

If you have questions or issues:
1. Check the documentation
2. Run tests in debug mode
3. Create an Issue with problem description 