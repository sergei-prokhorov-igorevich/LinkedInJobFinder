import { EPersonConfig } from '../../enums/EPersonConfig.ts';
import { sergeiTelegramChatId, telegramBotAuthToken } from '../../telegramBot/secret.ts';
import { TApp } from '../../types/TApp.ts';
import { TConfig } from '../../types/TConfig.ts';
import { TConfigArgs } from '../../types/TConfigArgs.ts';
import { toISOLocal } from '../dateUtils.ts';
import { anastasiiaConfig } from './anastasiiaConfig.ts';
import { sergeiConfig } from './sergeiConfig.ts';

let config: TConfig;

function initConfig(args: TConfigArgs): void {
  const app: TApp = {
    runDate: toISOLocal(new Date()),
    telegramBotAuthToken: telegramBotAuthToken,
    telegramAdminId: sergeiTelegramChatId,
    maxPageCount: args.maxPageCount,
  };

  config = {
    app: app,
    currentPersonConfig: args.personConfig === EPersonConfig.SERGEI ? sergeiConfig : anastasiiaConfig,
  };
}

function getActiveRegion() {
  return config.currentPersonConfig.regions.find((r) => r.active);
}

export { initConfig, config, getActiveRegion };
