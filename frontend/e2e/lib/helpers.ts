import * as puppeteer from 'puppeteer';
import { Player } from 'src/app/store/player';

export class Helpers {
  public async startDb() {
    const FirebaseServer = require('firebase-server');
    new FirebaseServer(5000, 'localhost', {
    });
  }

  public async addPlayers(page: puppeteer.Page, pauseInterval: number) {
    const pause = () => page.waitFor(pauseInterval);

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

    await pause();

    // add them
    for (let i = 0; i < players.length; i++) {
      await page.waitFor(selVoornaam);
      await page.waitFor(selAchternaam);
      await page.waitFor(selElo);

      await page.type(selVoornaam, players[i].firstName);
      await pause();
      await page.type(selAchternaam, players[i].lastName);
      await pause();
      await page.click(selElo);
      await pause();
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.type(selElo, players[i].clubElo.toString());

      await page.click(selSave);
      await pause();
    }
  }
}
