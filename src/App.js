import { InputView } from './view/InputView.js';
import { OutputView } from './view/OutputView.js';
import { MESSAGE } from './constants/message.js';
import { validateMonthAndDay } from './validation/validateFunctions.js';

class App {
  async run() {
    const monthAndDay = await this.getMonthAndDay();
    console.log(monthAndDay);
  }

  async getMonthAndDay() {
    try {
      const input = await InputView.readUserInput(MESSAGE.ASK_MONTH_DAY);
      validateMonthAndDay(input);
      return input;
    } catch (error) {
      OutputView.printResult(error.message);
      return this.getMonthAndDay();
    }
  }
}

export default App;
