import { Page, chromium } from 'playwright';

let page: Page;

async function createPage(link: string): Promise<Page> {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const newPage = await browser.contexts()[0].newPage();
  newPage.setDefaultTimeout(0);
  await newPage.goto(link);

  return (page = newPage);
}

async function closePage() {
  await page.close();
}

export { createPage, page, closePage };
