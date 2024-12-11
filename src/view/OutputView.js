import { Console } from '@woowacourse/mission-utils';
import { CONSTANT } from '../constants/constant.js';

export const OutputView = {
  printResult(result) {
    Console.print(result);
  },
  printCalendar(month, calendar) {
    for (let i = 0; i < calendar.length; i += 1) {
      const { day, man, type } = calendar[i];
      if (type === '휴일' && CONSTANT.TYPE_OF_DAY[day] === '평일') {
        OutputView.printResult(`${month}월 ${i + 1}일 ${day}(휴일) ${man}`);
      } else {
        OutputView.printResult(`${month}월 ${i + 1}일 ${day} ${man}`);
      }
    }
  },
};
