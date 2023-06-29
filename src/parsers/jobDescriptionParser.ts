import { config } from '../other/configs/config.ts';
import { checkStep2 } from '../other/stepChecker.ts';
import { page } from '../singleton/page.ts';
import { ELang } from '../enums/ELang.ts';

const notEnglishRegex = /[üéáàçóäæåø]/;
const russianRegex = /[а-яА-Я]/;

async function getKeywords() {
  const jobDetailsEl = await page.waitForSelector("//div[@id='job-details']/span");
  const jobDetails = await jobDetailsEl.textContent();

  checkStep2(jobDetails);

  if (config.currentPersonConfig.lang === ELang.RU && jobDetails.search(russianRegex) === -1) {
    return [];
  } else if (config.currentPersonConfig.lang === ELang.EN && jobDetails.search(notEnglishRegex) !== -1) {
    return [];
  }

  return matchKeywords(jobDetails);
}

function matchKeywords(jobDetails: string) {
  const jobDetailsLowerCase = jobDetails.toLowerCase();
  return config.currentPersonConfig.keywords.filter((kw: string) => jobDetailsLowerCase.indexOf(kw) !== -1);
}

export { getKeywords };
