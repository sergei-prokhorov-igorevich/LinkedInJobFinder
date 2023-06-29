import { ElementHandle, Locator, Page, chromium } from 'playwright';
import { getStorage } from '../singleton/storage.ts';
import { page } from '../singleton/page.ts';
import { checkStep1 } from '../other/stepChecker.ts';
import { getActiveRegion } from '../other/configs/config.ts';

async function getJobList() {
  // console.log('getJobList_1');
  if (await page.isVisible("//div[contains(@class, 'jobs-search-no-results-banner')]/h1")) {
    console.log('Page is empty');
    return [];
  }

  // console.log('getJobList_2');
  await scrollLeftList(9999);
  // console.log('getJobList_3');

  await page.waitForSelector("//footer[contains(@class, 'global-footer-compact')]"); //just wait

  // console.log('getJobList_4');
  const result = await page.locator('li.jobs-search-results__list-item').all();
  // console.log('getJobList_5', result);

  await checkStep1(result.length);
  return result;
}

async function getTitle(jobTitleCard: Locator) {
  try {
    await jobTitleCard.scrollIntoViewIfNeeded();
  } catch (e) {
    console.log('Error: getTitle_scrollIntoViewIfNeeded', e);
    await page.waitForTimeout(2000);
    await jobTitleCard.scrollIntoViewIfNeeded();
  }
  await jobTitleCard.highlight();

  const titleEl = jobTitleCard.locator("//a[contains(@class, 'job-card-list__title')]");
  return await titleEl.innerText();
}

async function alreadyHasJobId(jobId: string) {
  const storage = await getStorage();
  return storage.jobs[getActiveRegion().name]?.map((j) => j.id).includes(jobId) || false;
}

async function scrollLeftList(pixels: number) {
  await page.evaluate((pixels) => {
    const listEl = document.querySelector('.jobs-search-results-list');
    listEl.scrollTo(0, listEl.scrollTop + pixels);
  }, pixels);
}

export { getJobList, getTitle, alreadyHasJobId };
