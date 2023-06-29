import { page } from '../singleton/page.ts';

async function getPageCount(): Promise<number> {
  const locatorName = '//li[@data-test-pagination-page-btn]';

  // console.log('getPageCount_0');
  try {
    await page.waitForSelector(locatorName, { timeout: 5000 });
  } catch (e) {}
  // console.log('getPageCount_1');

  if (await page.isVisible(locatorName)) {
    // console.log('getPageCount_1_1');
    return await page.locator(locatorName).count();
  }

  // console.log('getPageCount_1_2');
  return 1;
}

async function clickNextPage() {
  await page
    .locator("//li[@data-test-pagination-page-btn][contains(@class, 'active')]/following-sibling::li[1]/button")
    .click();
}

export { getPageCount, clickNextPage };
