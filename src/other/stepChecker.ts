import { page } from '../singleton/page.ts';

async function checkStep1(actualCount: number): Promise<Promise<void>> {
  const expectedCount = await page.evaluate(
    () => document.querySelector('.scaffold-layout__list-container').childElementCount
  );

  if (actualCount !== expectedCount) {
    throw Error(`actualCount: ${actualCount}, expectedCount: ${expectedCount}`);
  }
}

function checkStep2(jobDetails: string): void {
  if (jobDetails.length < 30) {
    throw Error(`jobDetails.length: ${jobDetails.length}`);
  }
}

function checkStep3(pageCount: number): void {
  if (pageCount === 0) {
    throw Error('pageCount: 0');
  }
}

export { checkStep1, checkStep2, checkStep3 };
