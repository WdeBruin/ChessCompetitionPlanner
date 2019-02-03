import * as puppeteer from 'puppeteer';
import { Player } from 'src/app/store';
const headlessmode = false;

// firebase-server -p 5000 -s whatever

describe('Players administration', () => {
    beforeAll(() => {
        const FirebaseServer = require('firebase-server');

        new FirebaseServer(5000, 'localhost', {
            
        });
    });

    it('should be able to add players', async () => {
        const browser = await puppeteer.launch({ headless: headlessmode });
        const page = await browser.newPage();
        const pause = () => page.waitFor(1000);

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

        for (let i = 0; i < players.length; i++) {
            await page.waitFor(selVoornaam);
            await page.type(selVoornaam, players[i].firstName);

            await pause();

            await page.waitFor(selAchternaam);
            await page.type(selAchternaam, players[i].lastName);

            await pause();

            await page.waitFor(selElo);
            await page.click(selElo);
            await pause();
            await page.keyboard.press('Backspace');
            await page.keyboard.press('Backspace');
            await page.keyboard.press('Backspace');
            await page.type(selElo, players[i].clubElo.toString());

            await pause();

            await page.click(selSave);
            await pause();
        }
        console.log('out loop');
        await page.waitFor(10000);
        await browser.close();
    });
});
