import { CONSTANT } from '../constants/constant.js';

export const toThrowNewError = (condition, errorMessage) => {
  if (condition) {
    throw new Error(`[ERROR] ${errorMessage}\n`);
  }
};

const hasEmptySpace = (input) => [
  toThrowNewError(
    input.includes(' '),
    '유효하지 않은 날짜입니다. 다시 입력해 주세요. 공백은 안됩니다.',
  ),
];

const isEmptyString = (input) => {
  toThrowNewError(
    input === '',
    '유효하지 않은 날짜입니다. 다시 입력해 주세요. 빈 문자열은 안됩니다.',
  );
};

export const validateSomething = (input) => {
  hasEmptySpace(input);
  isEmptyString(input);
};
