import { TJob } from './TJob.ts';

type TJsonStorage = {
  jobs: { [key: string]: TJob[] };
};

export { TJsonStorage };
