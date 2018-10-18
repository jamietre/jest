/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const toString = Object.prototype.toString;

const MultipleValidOptionsSymbol = Symbol('JEST_MULTIPLE_VALID_OPTIONS');

function validationConditionSingle(option: any, validOption: any): boolean {
  return (
    option === null ||
    option === undefined ||
    toString.call(option) === toString.call(validOption)
  );
}

export function getValues(validOption: any) {
  if (
    Array.isArray(validOption) &&
    validOption.length &&
    validOption[0] === MultipleValidOptionsSymbol
  ) {
    return validOption.slice(1);
  }
  return [validOption];
}

export function validationCondition(option: any, validOption: any): boolean {
  return getValues(validOption).some(e => validationConditionSingle(option, e));
}

export function MultipleValidOptions(...args: Array<any>) {
  return [MultipleValidOptionsSymbol, ...args];
}
