import { ELang } from '../enums/ELang.ts';
import { TRegion } from './TRegion.ts';

type TPersonalConfig = {
  regions: TRegion[];
  keywords: string[];
  excludeWords: string[];
  telegramChatId: number;
  lang: ELang;
  storageFileName: string;
};

export { TPersonalConfig };
