import { ELang } from '../../enums/ELang.ts';
import { anastasiiaTelegramChatId } from '../../telegramBot/secret.ts';
import { TPersonalConfig } from '../../types/TPersonalConfig.ts';

export const anastasiiaPMConfig: TPersonalConfig = {
  regions: [
    {
      name: 'Russia',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r2592000&f_WT=1%2C2%2C3&geoId=101728296&keywords=project%20manager%20NOT%20EPAM&location=Russia',
    },
    {
      name: 'Kazakhstan',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r2592000&f_WT=2&geoId=106049128&keywords=project%20manager%20NOT%20EPAM&location=Kazakhstan',
    },
    {
      name: 'Georgia',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r2592000&f_WT=2%2C3&geoId=106315325&keywords=project%20manager%20NOT%20EPAM&location=Georgia',
    },
    {
      name: 'Cyprus',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r604800&f_WT=2&geoId=106774002&keywords=project%20manager%20NOT%20EPAM&location=Cyprus',
    },
    {
      name: 'Armenia',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r2592000&f_WT=2&geoId=103030111&keywords=project%20manager%20NOT%20EPAM&location=Armenia',
    },
    {
      name: 'Montenegro',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r2592000&f_WT=2&geoId=100733275&keywords=project%20manager%20NOT%20EPAM&location=Montenegro',
    },
  ],
  keywords: ['project manager', 'intern', 'junior', 'джун', 'интерн'],
  excludeWords: [
    'преподаватель',
  ],
  telegramChatId: anastasiiaTelegramChatId, // sergeiTelegramChatId
  lang: ELang.RU,
  storageFileName: 'anastasiiaPMStorage.json',
};
