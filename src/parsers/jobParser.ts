import { getStorage } from '../singleton/storage.ts';
import { page } from '../singleton/page.ts';
import { alreadyHasJobId, getTitle } from './leftListParser.ts';
import { Locator } from 'playwright';
import { config, getActiveRegion } from '../other/configs/config.ts';
import { getKeywords } from './jobDescriptionParser.ts';
import { TJob } from '../types/TJob.ts';

async function parseJob(jobTitleCard: Locator, index: number, totalJobsCount: number) {
  // console.log('parseJob_0');
  const jobId = await jobTitleCard.getAttribute('data-occludable-job-id');

  // console.log('parseJob_1');
  if (await alreadyHasJobId(jobId)) {
    console.log(`Success skip job ${index + 1} / ${totalJobsCount}`);
    return;
  }

  let result: TJob = {
    date: config.app.runDate,
    id: jobId,
  };

  // console.log('parseJob_2');
  const title = await getTitle(jobTitleCard);
  // console.log('parseJob_3');

  if (hasExcludeWords(title)) {
    // console.log('parseJob_4');
    await saveResult(result, index, totalJobsCount);
    return;
  }

  await page.waitForTimeout(500); // resolve problem with 429 status code

  // console.log('parseJob_5');
  await jobTitleCard.click();
  // console.log('parseJob_6');

  const keywords = await getKeywords();
  // console.log('parseJob_7');
  if (keywords.length !== 0) {
    result = {
      ...result,
      title: title,
      link: page.url(),
      keywords: keywords,
    };
  }

  // console.log('parseJob_8');
  await saveResult(result, index, totalJobsCount);
}

function hasExcludeWords(title: string): boolean {
  const jobTitleLowerCase = title.toLowerCase();
  return Boolean(config.currentPersonConfig.excludeWords.find((ew: string) => jobTitleLowerCase.indexOf(ew) !== -1));
}

async function saveResult(result: TJob, index: number, totalJobsCount: number) {
  const storage = await getStorage();
  const regionName = getActiveRegion().name;

  if (storage.jobs[regionName]) {
    storage.jobs[regionName].push(result);
  } else {
    storage.jobs[regionName] = [result];
  }

  console.log(`Success parse job ${index + 1} / ${totalJobsCount}`);
}

export { parseJob };
