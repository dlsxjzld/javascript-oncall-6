import { CONSTANT } from '../constants/constant.js';

export default class Working {
  #dayForMonth = [];

  #calendar = [];

  constructor(monthAndDay, weekdayMan, holidayMan) {
    const [month, day] = monthAndDay.split(',');
    this.month = month;
    this.day = day;
    this.weekdayMan = weekdayMan.split(',');
    this.holidayMan = holidayMan.split(',');
    this.makeDayForMonth();
  }

  pushHolidayManToCalendar(type, index, date) {
    this.#calendar.push({
      day: this.#dayForMonth[(date - 1) % 7],
      man: this.holidayMan[index],
      type,
    });
  }

  pushWeekdayManToCalendar(type, index, date) {
    this.#calendar.push({
      day: this.#dayForMonth[(date - 1) % 7],
      man: this.weekdayMan[index],
      type,
    });
  }

  getNextIndex = (index, type) => {
    if (type === '휴일') {
      return (index + 1) % this.holidayMan.length;
    }
    return (index + 1) % this.weekdayMan.length;
  };

  makeCalendar() {
    let [indexForWeek, indexForHoliday] = [0, 0];
    for (let date = 1; date <= CONSTANT.DATE[this.month]; date += 1) {
      const { newIndexForWeek, newIndexForHoliday } = this.newMethod(
        date,
        indexForHoliday,
        indexForWeek,
      );
      [indexForWeek, indexForHoliday] = [newIndexForWeek, newIndexForHoliday];
      if (!this.checkCalendar(indexForHoliday, indexForWeek)) {
        return false;
      }
    }
    return true;
  }

  newMethod(date, indexForHoliday, indexForWeek) {
    const type = this.checkTypeOfDay(date);
    if (type === '휴일') {
      this.pushHolidayManToCalendar(type, indexForHoliday, date);
      const newIndexForHoliday = this.getNextIndex(indexForHoliday);
      return { newIndexForHoliday, newIndexForWeek: indexForWeek };
    }
    this.pushWeekdayManToCalendar(type, indexForWeek, date);
    const newIndexForWeek = this.getNextIndex(indexForWeek);
    return { newIndexForHoliday: indexForHoliday, newIndexForWeek };
  }

  checkCalendar(indexForHoliday, indexForWeek) {
    if (this.#calendar.length < 2) {
      return true;
    }

    const current = this.#calendar[this.#calendar.length - 1];
    const previous = this.#calendar[this.#calendar.length - 2];
    if (current.man !== previous.man) {
      return true;
    }

    this.changeManOrder(current, indexForHoliday, indexForWeek);
    this.#calendar = [];
    return false;
  }

  changeManOrder(current, indexForHoliday, indexForWeek) {
    if (current.type === '휴일') {
      this.changeHolidayManOrder(indexForHoliday, current);
    } else if (current.type === '평일') {
      this.changeWeekdayManOrder(indexForWeek, current);
    }
  }

  changeWeekdayManOrder(indexForWeek, current) {
    const nextMan = this.weekdayMan[indexForWeek % this.weekdayMan.length];
    const tmp = nextMan;
    this.weekdayMan[indexForWeek % this.weekdayMan.length] = current.man;
    this.weekdayMan[(indexForWeek - 1) % this.weekdayMan.length] = tmp;
  }

  changeHolidayManOrder(index, current) {
    const nextMan = this.holidayMan[index % this.holidayMan.length];
    const tmp = nextMan;
    this.holidayMan[index % this.holidayMan.length] = current.man;
    this.holidayMan[(index - 1) % this.holidayMan.length] = tmp;
  }

  getCalendar() {
    return this.#calendar;
  }

  getMonth() {
    return this.month;
  }

  checkTypeOfDay(date) {
    if (
      CONSTANT.HOLIDAY_IN_LAW[this.month] !== undefined &&
      CONSTANT.HOLIDAY_IN_LAW[this.month][date] !== undefined
    ) {
      return CONSTANT.HOLIDAY_IN_LAW[this.month][date];
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
