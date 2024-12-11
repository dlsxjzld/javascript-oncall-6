import { Console } from '@woowacourse/mission-utils';

export const InputView = {
  async readUserInput(message) {
    const input = await Console.readLineAsync(message);
    return input;
  },
};
