import { InputView } from './view/InputView.js';
import { OutputView } from './view/OutputView.js';
import { MESSAGE } from './constants/message.js';
import {
  validateMonthAndDay,
  validateWeekday,
  validateHoliday,
} from './validation/validateFunctions.js';
import Working from './model/Working.js';

class App {
  async run() {
    const monthAndDay = await this.getMonthAndDay();
    const { weekdayMan, holidayMan } = await this.getMans();
    const working = new Working(monthAndDay, weekdayMan, holidayMan);
    while (true) {
      const result = working.makeCalendar();
      if (result) {
        break;
      }
    }
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

  async getMans() {
    try {
      const weekdayMan = await this.getWeekday();
      const holidayMan = await this.getHoliday(weekdayMan);
      return { weekdayMan, holidayMan };
    } catch (error) {
      OutputView.printResult(error.message);
      return this.getMans();
    }
  }

  async getWeekday() {
    const input = await InputView.readUserInput(MESSAGE.ASK_WEEKDAY_MAN);
    validateWeekday(input);
    return input;
  }

  async getHoliday(weekdayMan) {
    const input = await InputView.readUserInput(MESSAGE.ASK_HOLIDAY_MAN);
    validateHoliday(input, weekdayMan);
    return input;
  }
}

export default App;
