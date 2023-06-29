import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { TJsonStorage } from '../types/TJsonStorage.ts';
import { config } from '../other/configs/config.ts';

let storage: TJsonStorage;

function getStoragePath() {
  return resolve(`storages/${config.currentPersonConfig.storageFileName}`);
}

async function createStorage() {
  const storagePath = getStoragePath();
  const buffer = await readFile(storagePath);
  const content = buffer.toString();
  return JSON.parse(content);
}

async function getStorage(): Promise<TJsonStorage> {
  return storage ? storage : (storage = await createStorage());
}

async function commitStorage() {
  const storagePath = getStoragePath();
  const data = JSON.stringify(storage, null, 2);
  await writeFile(storagePath, data);
}

export { getStorage, commitStorage };
