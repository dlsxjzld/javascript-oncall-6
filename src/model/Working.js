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

  // TODO: 한달 근무표 만들기
  makeCalendar() {
    // TODO: 시작 일수는 1일, 종료 일수는 CONSTANT.DATE[month], 시작 요일은 day
    const startDate = 1;
    const endDate = CONSTANT.DATE[this.month];
    let indexForWeek = 0;
    let indexForHoliday = 0;
    for (let date = startDate; date <= endDate; date += 1) {
      // TODO: 요일이 법정 공휴일, 휴일, 평일인지 확인

      const type = this.checkTypeOfDay(date); // 휴일 or 평일

      // TODO: 휴일 or 평일에 따라 index 움직이면서 순서 짜기
      if (type === '휴일') {
        this.#calendar.push({
          day: this.#dayForMonth[(date - 1) % 7],
          man: this.holidayMan[indexForHoliday],
          type,
        });
        indexForHoliday = (indexForHoliday + 1) % this.holidayMan.length;
      } else if (type === '평일') {
        this.#calendar.push({
          day: this.#dayForMonth[(date - 1) % 7],
          man: this.weekdayMan[indexForWeek],
          type,
        });
        indexForWeek = (indexForWeek + 1) % this.weekdayMan.length;
      }
    }
    return true;
  }

  checkTypeOfDay(date) {
    if (
      CONSTANT.HOLIDAY_IN_LAW[this.month] !== undefined &&
      CONSTANT.HOLIDAY_IN_LAW[this.month][date] !== undefined
    ) {
      return CONSTANT.HOLIDAY_IN_LAW[this.month][date]; // 휴일
    }

    return CONSTANT.TYPE_OF_DAY[this.#dayForMonth[(date - 1) % 7]];
  }

  makeDayForMonth() {
    const shareIndex = CONSTANT.DAY.indexOf(this.day);
    for (let i = 0; i < 7; i += 1) {
      this.#dayForMonth.push(CONSTANT.DAY[(shareIndex + i) % 7]);
    }
  }
}
