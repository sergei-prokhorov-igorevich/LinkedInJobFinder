import { TApp } from './TApp.ts';
import { TPersonalConfig } from './TPersonalConfig.ts';

type TConfig = {
  app: TApp;
  currentPersonConfig: TPersonalConfig;
};

export { TConfig };
