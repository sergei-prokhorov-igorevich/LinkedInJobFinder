import { ELang } from '../../enums/ELang.ts';
import { anastasiiaTelegramChatId } from '../../telegramBot/secret.ts';
import { TPersonalConfig } from '../../types/TPersonalConfig.ts';

const anastasiiaConfig: TPersonalConfig = {
  regions: [
    {
      name: 'Russia',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r2592000&f_WT=1%2C2%2C3&geoId=101728296&keywords=python%20NOT%20EPAM&location=Russia',
    },
    {
      name: 'Kazakhstan',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r2592000&f_WT=2&geoId=106049128&keywords=python%20NOT%20EPAM&location=Kazakhstan',
    },
    {
      name: 'Georgia',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r2592000&f_WT=2%2C3&geoId=106315325&keywords=python%20NOT%20EPAM&location=Georgia',
    },
    {
      name: 'Cyprus',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r604800&f_WT=2&geoId=106774002&keywords=python%20NOT%20EPAM&location=Cyprus',
    },
    {
      name: 'Armenia',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r2592000&f_WT=2&geoId=103030111&keywords=python%20NOT%20EPAM&location=Armenia',
    },
    {
      name: 'Montenegro',
      link: 'https://www.linkedin.com/jobs/search/?f_TPR=r2592000&f_WT=2&geoId=100733275&keywords=python%20NOT%20EPAM&location=Montenegro',
    },
  ],
  keywords: ['python', 'django', 'fastapi', 'intern', 'junior', 'джун', 'интерн'],
  excludeWords: [
    'head',
    'senior',
    'architect',
    'архитектор',
    'продуктовый',
    'аналитик',
    'преподаватель',
    'scien',
    'technical',
    'php',
    'рнр',
    'analy',
    'appsec',
    'c++',
    'безопасн',
    'аудитор',
    'java',
    'тестированию',
    '1с',
    'solutions',
    '.net',
    'security',
    'ios',
  ],
  telegramChatId: anastasiiaTelegramChatId, // sergeiTelegramChatId
  lang: ELang.RU,
  storageFileName: 'anastasiiaStorage.json',
};

export { anastasiiaConfig };
