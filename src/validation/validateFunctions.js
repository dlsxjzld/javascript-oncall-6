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
    `${ERROR_MESSAGE.MONTH_DAY} 공백은 안됩니다.`,
  ),
];

const isEmptyString = (input) => {
  toThrowNewError(
    input === '',
    `${ERROR_MESSAGE.MONTH_DAY} 빈 문자열은 안됩니다.`,
  );
};

export const checkMonth = (input) => {
  const [month, day] = input.split(',');
  toThrowNewError(
    CONSTANT.MONTH.includes(month) === false,
    `${ERROR_MESSAGE.MONTH_DAY} 1~12월만 입력해주세요.`,
  );
};
export const checkDay = (input) => {
  const [month, day] = input.split(',');
  toThrowNewError(
    CONSTANT.DAY.includes(day) === false,
    `${ERROR_MESSAGE.MONTH_DAY} (일, 월, 화, 수, 목, 금, 토)중에 하나만 입력해주세요.`,
  );
};
export const checkCount = (input) => {
  const charCount = input.split(',').filter(Boolean).length;
  const delimiterCount = input
    .split('')
    .filter((value) => value === ',').length;
  toThrowNewError(
    charCount !== 2 || delimiterCount !== 1,
    `${ERROR_MESSAGE.MONTH_DAY}`,
  );
};

export const validateMonthAndDay = (input) => {
  hasEmptySpace(input);
  isEmptyString(input);
  checkCount(input);
  checkMonth(input);
  checkDay(input);
};
