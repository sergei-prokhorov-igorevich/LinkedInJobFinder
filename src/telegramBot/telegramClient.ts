import { config, getActiveRegion } from '../other/configs/config.ts';
import { getStorage } from '../singleton/storage.ts';
import { telegramPost } from './telegramHttps.ts';
import { EOL } from 'node:os';

async function telegramSendResult() {
  const storage = await getStorage();
  const header = createHeader();

  const filtredJobs = storage.jobs[getActiveRegion().name]
    .filter((j) => j.date === config.app.runDate && j.keywords?.length > 0)
    .sort((a, b) => b.keywords.length - a.keywords.length);

  if (filtredJobs.length === 0) {
    await telegramPost('sendMessage', {
      chat_id: config.currentPersonConfig.telegramChatId,
      text: `${header}New jobs are not found\\.`,
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true,
    });
    return;
  }

  const chunkSize = 10;
  let jobNumber = 1;
  for (let i = 0; i < filtredJobs.length; i += chunkSize) {
    const chunkJobs = filtredJobs.slice(i, i + chunkSize);
    let text = chunkJobs
      .map((j) => {
        const title = encodeSymbols(j.title);
        const link = encodeSymbols(j.link);
        const keywords = encodeSymbols(j.keywords.reduce((total, keyword) => `${total}, ${keyword}`));

        return `${jobNumber++}\\. [${title}](${link}) \\[${keywords}\\]${EOL}`;
      })
      .reduce((total, val) => total + val);

    if (i === 0) {
      text = header + text;
    }

    await telegramPost('sendMessage', {
      chat_id: config.currentPersonConfig.telegramChatId,
      text: text,
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true,
    });
  }
}

function encodeSymbols(text: string) {
  return text
    .replace(/\_/gm, '\\_')
    .replace(/\*/gm, '\\*')
    .replace(/\[/gm, '\\[')
    .replace(/\]/gm, '\\]')
    .replace(/\(/gm, '\\(')
    .replace(/\)/gm, '\\)')
    .replace(/\~/gm, '\\~')
    .replace(/\`/gm, '\\`')
    .replace(/\>/gm, '\\>')
    .replace(/\#/gm, '\\#')
    .replace(/\+/gm, '\\+')
    .replace(/\-/gm, '\\-')
    .replace(/\=/gm, '\\=')
    .replace(/\|/gm, '\\|')
    .replace(/\{/gm, '\\{')
    .replace(/\}/gm, '\\}')
    .replace(/\./gm, '\\.')
    .replace(/\!/gm, '\\!');
}

async function telegramEncodeAndSendMessage(message: string) {
  await telegramSend(config.app.telegramAdminId, encodeSymbols(message));
}

async function telegramSend(chat_id: number, text: string) {
  await telegramPost('sendMessage', {
    chat_id: chat_id,
    text: text,
  });
}

function createHeader(): string {
  const keywordsStr = encodeSymbols(config.currentPersonConfig.keywords.reduce((prevVal, val) => `${prevVal}, ${val}`));
  const excludeWordsStr = encodeSymbols(
    config.currentPersonConfig.excludeWords.reduce((prevVal, val) => `${prevVal}, ${val}`)
  );
  const runDate = encodeSymbols(config.app.runDate);

  return `Run date: ${runDate}\\. Region: ${
    getActiveRegion().name
  }\\.${EOL}**\\- Keywords:** \\[${keywordsStr}\\]\\.${EOL}**\\- Exclude words:** \\[${excludeWordsStr}\\]\\.${EOL}${EOL}`;
}

export { telegramSendResult, telegramEncodeAndSendMessage };
