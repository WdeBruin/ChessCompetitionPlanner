import * as puppeteer from 'puppeteer';
const headlessmode = false;

describe('Read mode', () => {
    it('should be able to login and view all parts', async () => {
        const browser = await puppeteer.launch({headless: headlessmode});
        const page = await browser.newPage();

        await page.goto('http://localhost:4200');

        await page.waitForSelector('[data-testid="btnLogin"]');
        await page.click('[data-testid="btnLogin"]');

        await browser.close();
    });
})
