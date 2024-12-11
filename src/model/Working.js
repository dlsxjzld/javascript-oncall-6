import { CONSTANT } from '../constants/constant.js';

export default class Working {
  #dayForMonth = []; // 실제 달에 맞는 요일 순서

  #calendar = []; // 일정표

  constructor(monthAndDay, weekdayMan, holidayMan) {
    const [month, day] = monthAndDay.split(',');
    this.month = month;
    this.day = day;
    this.weekdayMan = weekdayMan.split(',');
    this.holidayMan = holidayMan.split(',');
    this.makeDayForMonth();
  }

  makeDayForMonth() {
    const shareIndex = CONSTANT.DAY.indexOf(this.day);
    for (let i = 0; i < 7; i += 1) {
      this.#dayForMonth.push(CONSTANT.DAY[(shareIndex + i) % 7]);
    }
  }
}
