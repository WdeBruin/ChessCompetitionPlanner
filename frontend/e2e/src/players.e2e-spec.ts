import * as puppeteer from 'puppeteer';
import { Helpers } from '../lib/helpers';
const headlessmode = false;

// firebase-server -p 5000 -s whatever
const helper = new Helpers();
describe('Players administration', () => {
    beforeAll(() => {
        helper.startDb();
    });

    it('should be able to add players', async () => {
        const browser = await puppeteer.launch({ headless: headlessmode });
        const page = await browser.newPage();
        page.setViewport({ width: 480, height: 1200 });

        await helper.addPlayers(page, 100);
        await browser.close();
    });
});
