import { EPersonConfig } from '../../enums/EPersonConfig.ts';
import { sergeiTelegramChatId, telegramBotAuthToken } from '../../telegramBot/secret.ts';
import { TApp } from '../../types/TApp.ts';
import { TConfig } from '../../types/TConfig.ts';
import { TConfigArgs } from '../../types/TConfigArgs.ts';
import { toISOLocal } from '../dateUtils.ts';
import { anastasiiaPMConfig } from './anastasiiaPMConfig.ts';
import { anastasiiaPythonConfig } from './anastasiiaPythonConfig.ts';
import { sergeiConfig } from './sergeiConfig.ts';

let config: TConfig;

function mapConfig(personConfig){
  switch(personConfig) {
    case EPersonConfig.Sergei: return sergeiConfig;
    case EPersonConfig.AnastasiaPython: return anastasiiaPythonConfig;
    case EPersonConfig.AnastasiaPM: return anastasiiaPMConfig;
  }
}

function initConfig(args: TConfigArgs): void {
  const app: TApp = {
    runDate: toISOLocal(new Date()),
    telegramBotAuthToken: telegramBotAuthToken,
    telegramAdminId: sergeiTelegramChatId,
    maxPageCount: args.maxPageCount,
  };

  config = {
    app: app,
    currentPersonConfig: mapConfig(args.personConfig),
  };
}

function getActiveRegion() {
  return config.currentPersonConfig.regions.find((r) => r.active);
}

export { initConfig, config, getActiveRegion };
