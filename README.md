# **SWAG LAB Automation System**

#### Project Structure - test-automation-swag-lab
```
├───playwright-report
├───resources
├───src
│   ├───fixtures
│   ├───pages
│   ├───utils 
│   ├───setup
│   └───tests
│       ├───preparation
│       ├───regression
│       └───sanity             
├───.env.qa
├───.env.stg
├───.env.prod
├───package.json
├───package-lock.json
└───playwright.config.ts
```

## Informative Sections
#### Technologies
- Node.js
- TypeScript
- Playwright

#### Design Pattern
- Page Object Model

#### Report
- Playwright default HTML report
- Allure report

## Getting Started

### 1. Prerequisites
- Install [Visual Studio Code IDE](https://code.visualstudio.com/download)
- Install Node.js (LTS recommended, version used: [node-v22.12.0-x64.msi](https://nodejs.org/download/release/v22.12.0/))
- Ensure [Playwright](https://playwright.dev/docs/intro) browsers are installed:  
`npx playwright install`

### 2. Install Extension
From VSCode Extensions market:
> Playwright Test for VSCode

### 3. Install Dependencies
From the project root:
`npm install`

### 4. Select Environment
Set the target environment by copying/renaming one of the .env.* files to [playwright.config.ts](playwright.config.ts):

* [.env.qa](.env.qa)
* [.env.stg](.env.stg)
* [.env.prod](.env.prod)


### 5. Run Test Suites
Open terminal: Navigate to the top menu and select View > Terminal or Terminal > New Terminal.

Full Playwright test run (all configured projects):
`npm test`

Preparation before testcase execution:
`npm run slab:preparation`

Sanity suite:
`npm run slab:sanity`


### 6. Generate & View Allure Report
After a test run (*sequentially*):
```bash 
npm run allure:move
npm run allure:generate
npm run allure:open
```
This will open the Allure HTML report in your browser.


### 7. Additional

#### <u> Reload IDE </u>
1. Press **Ctrl+Shift+P**
2. Type **Reload Window**
3. choose **Developer: Reload Window**

#### <u> Skip specific testcase(s) </u>
There are two ways to achieve this

1. **Test.skip** (recommended)
```typescript
test('Example 1', async ({ }) => {
  test.skip(true, 'Temporarily disabled for investigation');
  // test body remains, but will be skipped
});
```
2. **test.fixme**
```typescript
test.fixme('Example 2', async ({ }) => {
  // Body
});
```

#### <u> Skip specific spec file(s) </u>
1. Go to [playwright.config.ts](playwright.config.ts)
2. Update **testIgnore** field for sanity or regression

#### <u> Share Allure Report </u>
**Prerequisites:** Install Node.js (LTS recommended, version used: [node-v22.12.0-x64.msi](https://nodejs.org/download/release/v22.12.0/))

After generating Allure report, the [allure-report](playwright-report/allure-report) folder will be found in the [playwright-report](playwright-report) folder.

1. Zip the folder and share the zipped folder
2. Extract the zipped folder
3. Open your terminal or command prompt and navigate to the root directory of the extracted location
4. Run the command `npx serve .`
5. Open the given URL in the browser to see the Allure report

#### <u> Useful shortcuts </u>
- Save all: `Ctrl + K` and then `s`
- Format code: `Shift + Alt + F`
- Block comment: `Shift + Alt + A`
- Search all: `Shift + Ctrl + F`
- Exit execution: `Ctrl + C`
- Open terminal: `` Ctrl + Shift + ` ``
- Clear terminal: `Ctrl + L`
