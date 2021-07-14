import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('card validation (puppeteer)', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8888';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test.each([
    ['4939344763173176', 'visa'],
    ['5333468245447699', 'mastercard'],
    ['347469319299185', 'amex'],
    ['6011621390591920', 'discover'],
    ['3544094226330868', 'jcb'],
    ['36053449243713', 'dinersclub'],
    ['2204376782288637', 'mir'],
  ])('luhnAlgorithm pass, identifyIssuer pass', async (number, issuer) => {
    await page.goto(baseUrl);
    const form = await page.$('.card-check');
    const input = await form.$('.card-check__card-number');
    const submitButton = await form.$('.card-check__submit-button');
    await input.type(number);
    submitButton.click();
    await page.waitForSelector('.card-check-status.valid-card');
    await page.waitForSelector(`.${issuer}.active`);
  });
});
