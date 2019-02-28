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

    it('should be able to run a round in an empty competition', async () => {
      await helper.startDb(
        {
          'players' : {
            '-id900' : {
              'clubElo' : 900,
              'firstName' : 'Hello900',
              'key' : '-id900',
              'lastName' : 'World'
            },
            '-id800' : {
              'clubElo' : 800,
              'firstName' : 'Hello800',
              'key' : '-id800',
              'lastName' : 'World'
            },
            '-id700' : {
              'clubElo' : 700,
              'firstName' : 'Hello700',
              'key' : '-id700',
              'lastName' : 'World'
            },
            '-id600' : {
              'clubElo' : 600,
              'firstName' : 'Hello600',
              'key' : '-id600',
              'lastName' : 'World'
            },
          },
          'competitions': {
            '-compid1': {
              'isSelected' : false,
              'key' : '',
              'name' : 'Hello Competition',
              'roundCount' : 0
            }
          }
        });

        await page.goto('http://localhost:4200/competition');
        await helper.pause(page);

        // Open competition
        const selDCompetition = '[data-testid="d_competition"]';
        page.waitFor(selDCompetition);
        page.click(selDCompetition);
        // Click new round

    });

    it('should be able to run a round in an existing competition', async () => {

    });

    it('should be able to run a round, add player during player select', async () => {

    });

    it('should be able to run a round, add extra game with vrijgeloot player', async () => {

    });
  });
});
