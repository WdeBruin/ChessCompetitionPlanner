import * as puppeteer from 'puppeteer';
import { Helpers } from '../lib/helpers';

const helper = new Helpers();
let browser: puppeteer.Browser = null;
let page: puppeteer.Page = null;

describe('Competition administration', () => {
  beforeAll(async () => {
  });

  afterAll(async () => {
    await helper.stopDb();
    await browser.close();
  });

  describe('competition flows', async () => {
    beforeAll(async () => {
      browser = await helper.launchBrowser();
      page = await helper.launchPage(browser);
    });

    it('should be able to add a competition', async () => {
      await helper.startDb();
      await page.goto('http://localhost:4200/competition');

      const selBtnNew = '[data-testid="btn_new"]';
      const selBtnSave = '[data-testid="btn_save"]';
      const selInName = '[data-testid="in_name"]';

      // add it
      await page.waitFor(selBtnNew);
      await helper.pause(page);
      await page.click(selBtnNew);
      await helper.pause(page);
      await page.waitFor(selInName);
      await page.waitFor(selBtnSave);
      await helper.pause(page);
      await page.type(selInName, 'Hello 2019');
      await helper.pause(page);
      await page.click(selBtnSave);

      // verify it is there
      const selDCompetition = '[data-testid="d_competition"]';
      // count them
      const selectall = await page.$$(selDCompetition);
      expect(selectall.length).toBe(1);

      await helper.pause(page);
    });

    // it('should be able to add a round 1 to a competition, navigate away and do round 2', async () => {

    // });


  });
});
