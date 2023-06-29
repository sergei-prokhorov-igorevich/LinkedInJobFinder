import axios, { AxiosError } from 'axios';
import { config } from '../other/configs/config.ts';

async function telegramPost(method: string, data?: Object) {
  try {
    const response = await axios.post(`https://api.telegram.org/bot${config.app.telegramBotAuthToken}/${method}`, data);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw Error(`${e.code}: req: '${data['text']}' res: '${JSON.stringify(e.response.data, null, 2)}'`);
    }
  }
}

export { telegramPost };
