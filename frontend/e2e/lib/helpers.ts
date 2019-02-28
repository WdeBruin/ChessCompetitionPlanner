import * as puppeteer from 'puppeteer';

export class Helpers {
  private pauseInterval = 0;
  private headlessmode = true;

  private server;

  public async startDb(data = null) {
    const FirebaseServer = require('firebase-server');
    this.server = new FirebaseServer(5000, 'localhost', {
      data
    });
  }

  public async stopDb() {
    await this.server.close();
  }

  public async pause(page: puppeteer.Page) {
    await page.waitFor(this.pauseInterval);
  }

  public async launchBrowser() {
    return puppeteer.launch({ headless: this.headlessmode });
  }

  public async launchPage(browser: puppeteer.Browser) {
    const page = await browser.newPage();
    page.setViewport({ width: 375, height: 812 });

    return page;
  }
}
