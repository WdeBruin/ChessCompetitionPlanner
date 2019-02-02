import * as puppeteer from 'puppeteer';
const headlessmode = false;

// firebase-server -p 5000 -s whatever

describe('Read mode', () => {
    it('should be able to login and view all parts', async () => {
        const browser = await puppeteer.launch({ headless: headlessmode });
        const page = await browser.newPage();

        await page.goto('http://localhost:4200/players');

        await page.waitFor(10000);
        await browser.close();
    });
});
