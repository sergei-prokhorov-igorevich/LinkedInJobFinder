import { config } from '../other/configs/config.ts';
import { checkStep3 } from '../other/stepChecker.ts';
import { createPage, closePage, page } from '../singleton/page.ts';
import { parseJob } from './jobParser.ts';
import { getJobList } from './leftListParser.ts';
import { clickNextPage, getPageCount } from './paginationParser.ts';

async function parsePage(pageNumber: number) {
  console.log(`Start parse page #${pageNumber}`);
  const jobs = await getJobList();

  for (let i = 0; i < jobs.length; i++) {
    await parseJob(jobs[i], i, jobs.length);
  }

  console.log(`End parse page #${pageNumber}`);
}
async function parseAllPages(link: string) {
  await createPage(link);

  const pageCount = await getPageCount();
  const maxPageCount = getMaxPageCount(pageCount);
  console.log(`Work with ${maxPageCount} (of ${pageCount} total found) page(s).`);
  checkStep3(pageCount);

  for (let currentPageNumber = 1; currentPageNumber <= maxPageCount; currentPageNumber++) {
    await parsePage(currentPageNumber);

    if (currentPageNumber < maxPageCount) {
      await clickNextPage();
      await page.waitForTimeout(1000); // wait next page
    }
  }

  await closePage();
}

function getMaxPageCount(pageCount: number) {
  if (!config.app.maxPageCount || config.app.maxPageCount > pageCount) {
    return pageCount;
  }

  return config.app.maxPageCount;
}

export { parseAllPages };
