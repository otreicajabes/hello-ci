const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('E2E Home Page Test', () => {
  let driver;
  const SELENIUM_URL = process.env.SELENIUM_URL || 'http://localhost:4444/wd/hub';
  const APP_URL = process.env.APP_URL || 'http://localhost:3000';

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .usingServer(SELENIUM_URL)
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('asserts that <h1> displays "Welcome to CI/CD"', async () => {
    await driver.get(APP_URL);

    const headingElement = await driver.wait(
      until.elementLocated(By.tagName('h1')),
      10000
    );

    const headingText = await headingElement.getText();
    expect(headingText).toBe('Welcome to CI/CD');
  }, 30000);
});