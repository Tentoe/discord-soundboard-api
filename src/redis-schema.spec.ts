// tslint:disable:max-line-length

import { getKey } from './redis-schema';
import { expect } from 'chai';
import 'mocha';

const NUM = [1234, 4321];
const STR = ['abcd', 'dcba'];
const SEP = `ab:cd`;

const RANGE_TESTS = [null, undefined, Infinity, 0.123, -1];

const correctKeyNum = (fun: Function, exp) => {
  it('should return correct keys with number', () =>
    expect(fun(...NUM)).to.equal(exp));
};
const correctKeyStr = (fun: Function, exp) => {
  it('should return correct keys with string', () =>
    expect(fun(...STR)).to.equal(exp));
};
const throws = (errType: Function, arg : any, fun: Function) => {
  it(`should throw ${errType.name} for ${arg}`, () =>
    expect(fun).to.throw(errType));
};

describe('getKey functions', () => {

  describe('guild function', () => {
    const fun = getKey.guild;
    correctKeyNum(fun, `sb:guild:${NUM[0]}`);
    correctKeyStr(fun, `sb:guild:${STR[0]}`);
    throws(SyntaxError, SEP, () => fun(SEP));
    RANGE_TESTS.forEach(arg => throws(RangeError, arg, () => fun(arg)));
  });
  describe('soundfile function', () => {
    const fun = getKey.soundfile;
    correctKeyNum(fun, `sb:guild:${NUM[0]}:soundfile:${NUM[1]}`);
    correctKeyStr(fun, `sb:guild:${STR[0]}:soundfile:${STR[1]}`);
    throws(SyntaxError, SEP, () => fun(NUM[0], SEP));
    RANGE_TESTS.forEach(arg => throws(RangeError, arg, () => fun(NUM[0], arg)));
  });
  describe('soundfileNextVal function', () => {
    const fun = getKey.soundfileNextval;
    correctKeyNum(fun, `sb:guild:${NUM[0]}:soundfile:nextval`);
    correctKeyStr(fun, `sb:guild:${STR[0]}:soundfile:nextval`);
    throws(SyntaxError, SEP, () => fun(SEP));
    RANGE_TESTS.forEach(arg => throws(RangeError, arg, () => fun(arg)));

  });
  describe('soundfiles function', () => {
    const fun = getKey.soundfiles;
    correctKeyNum(fun, `sb:guild:${NUM[0]}:soundfiles`);
    correctKeyStr(fun, `sb:guild:${STR[0]}:soundfiles`);
    throws(SyntaxError, SEP,  () => fun(SEP));
    RANGE_TESTS.forEach(arg => throws(RangeError, arg, () => fun(arg)));

  });
});
