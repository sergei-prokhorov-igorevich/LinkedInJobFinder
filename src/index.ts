import { telegramEncodeAndSendMessage, telegramSendResult } from './telegramBot/telegramClient.ts';
import { config, initConfig } from './other/configs/config.ts';
import { parseAllPages } from './parsers/pageParser.ts';
import { EPersonConfig } from './enums/EPersonConfig.ts';
import { commitStorage } from './singleton/storage.ts';
import { TConfigArgs } from './types/TConfigArgs.ts';

const consoleTimeLabel = 'Elapsed';
const initConfigData: TConfigArgs = { personConfig: EPersonConfig.ANASTASIIA };

(async () => {
  console.time(consoleTimeLabel);
  initConfig(initConfigData);

  for (const region of config.currentPersonConfig.regions) {
    console.log(`Parsing ${region.name} has started.`);
    region.active = true;

    try {
      await parseAllPages(region.link);
      await commitStorage();
      await telegramSendResult();
      console.log(`Parsing ${region.name} has completed.`);
    } catch (e) {
      console.error(`Parsing ${region.name} has error.`, e);
      await telegramEncodeAndSendMessage((e as Error).stack);
    } finally {
      region.active = false;
    }
  }

  console.timeEnd(consoleTimeLabel);
})();
