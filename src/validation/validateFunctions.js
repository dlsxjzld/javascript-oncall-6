import { CONSTANT } from '../constants/constant.js';
import { ERROR_MESSAGE } from '../constants/message.js';

export const toThrowNewError = (condition, errorMessage) => {
  if (condition) {
    throw new Error(`[ERROR] ${errorMessage}\n`);
  }
};

const hasEmptySpace = (input) => [
  toThrowNewError(
    input.includes(' '),
    `${ERROR_MESSAGE.INVALID} 공백은 안됩니다.`,
  ),
];

const isEmptyString = (input) => {
  toThrowNewError(
    input === '',
    `${ERROR_MESSAGE.INVALID} 빈 문자열은 안됩니다.`,
  );
};

export const checkMonth = (input) => {
  const [month] = input.split(',');
  toThrowNewError(
    CONSTANT.MONTH.includes(month) === false,
    `${ERROR_MESSAGE.INVALID} 1~12월만 입력해주세요.`,
  );
};
export const checkDay = (input) => {
  const [, day] = input.split(',');
  toThrowNewError(
    CONSTANT.DAY.includes(day) === false,
    `${ERROR_MESSAGE.INVALID} (일, 월, 화, 수, 목, 금, 토)중에 하나만 입력해주세요.`,
  );
};
export const checkCount = (input) => {
  const charCount = input.split(',').filter(Boolean).length;
  const delimiterCount = input
    .split('')
    .filter((value) => value === ',').length;
  toThrowNewError(
    charCount !== 2 || delimiterCount !== 1,
    `${ERROR_MESSAGE.INVALID}`,
  );
};

export const validateMonthAndDay = (input) => {
  hasEmptySpace(input);
  isEmptyString(input);
  checkCount(input);
  checkMonth(input);
  checkDay(input);
};

const checkAllNickNameLength = (input) => {
  const mans = input.split(',');
  toThrowNewError(
    mans.some((man) => man.length > 5),
    `${ERROR_MESSAGE.INVALID} 닉네임은 5자를 넘기면 안됩니다.`,
  );
};

const duplicateMan = (input) => {
  const mans = input.split(',');
  const setMans = new Set(mans);
  toThrowNewError(
    mans.length !== setMans.size,
    `${ERROR_MESSAGE.INVALID} 중복 닉네임은 안됩니다.`,
  );
};

const checkManCountRange = (input) => {
  const mans = input.split(',');
  toThrowNewError(
    mans.length < 5 || mans.length > 35,
    `${ERROR_MESSAGE.INVALID} 5~35명만 가능합니다.`,
  );
};

const checkManCount = (input) => {
  const manCount = input.split(',').filter(Boolean).length;
  const delimiterCount = input
    .split('')
    .filter((value) => value === ',').length;
  toThrowNewError(
    manCount - 1 !== delimiterCount,
    `${ERROR_MESSAGE.INVALID} 구분자 개수가 맞지 않습니다.`,
  );
};

const checkSameMan = (input, weekdayMan) => {
  const holidayMans = input.split(',');
  const weekdayMans = weekdayMan.split(',');
  let cnt = 0;
  for (let idx = 0; idx < holidayMans.length; idx += 1) {
    if (weekdayMans.includes(holidayMans[idx])) {
      cnt += 1;
    }
  }

  toThrowNewError(
    cnt !== holidayMans.length,
    `${ERROR_MESSAGE.INVALID} 평일과 휴일 근무자가 다릅니다.`,
  );
};

export const validateWeekday = (input) => {
  hasEmptySpace(input);
  isEmptyString(input);
  checkAllNickNameLength(input);
  duplicateMan(input);
  checkManCountRange(input);
  checkManCount(input);
};

export const validateHoliday = (input, weekdayMan) => {
  hasEmptySpace(input);
  isEmptyString(input);
  checkAllNickNameLength(input);
  duplicateMan(input);
  checkManCountRange(input);
  checkManCount(input);
  checkSameMan(input, weekdayMan);
};
