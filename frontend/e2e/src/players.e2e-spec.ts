import * as puppeteer from 'puppeteer';
import { Player } from 'src/app/store/player/player.interface';
import { Helpers } from '../lib/helpers';

const helper = new Helpers();
let browser: puppeteer.Browser = null;
let page: puppeteer.Page = null;

describe('Players administration', () => {
  beforeAll(() => {
    helper.startDb();
  });

  afterAll(() => {
    helper.stopDb();
  });

  it('should be able to add players', async () => {
    browser = await helper.launchBrowser();
    page = await helper.launchPage(browser);

    const players: Player[] = [
      <Player>{
        firstName: 'Wouter',
        lastName: 'de Bruin',
        clubElo: 1819
      },
      <Player>{
        firstName: 'Jan',
        lastName: 'Timman',
        clubElo: 2480
      },
      <Player>{
        firstName: 'Gary',
        lastName: 'Kasparov',
        clubElo: 2780
      },
      <Player>{
        firstName: 'Hein',
        lastName: 'Donner',
        clubElo: 3285
      },
    ]

    // selectors
    const selVoornaam = '[data-testid="voornaam"]';
    const selAchternaam = '[data-testid="achternaam"]';
    const selElo = '[data-testid="elo"]';
    const selSave = '[data-testid="save"]';

    await page.goto('http://localhost:4200/players');

    await helper.pause(page);

    // add them
    for (let i = 0; i < players.length; i++) {
      await page.waitFor(selVoornaam);
      await page.waitFor(selAchternaam);
      await page.waitFor(selElo);

      await page.type(selVoornaam, players[i].firstName);
      await helper.pause(page);
      await page.type(selAchternaam, players[i].lastName);
      await helper.pause(page);
      await page.click(selElo);
      await helper.pause(page);
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.type(selElo, players[i].clubElo.toString());

      await page.click(selSave);
      await helper.pause(page);
    }

    await browser.close();
  });
});
