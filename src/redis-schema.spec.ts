// tslint:disable:max-line-length

import { getKey } from './redis-schema';
import { expect } from 'chai';
import 'mocha';

const NUM = [1234, 4321];
const STR = ['abcd', 'dcba'];
const SEP = `ab:cd`;

const correctKeyNum = (fun: Function, exp) => {
  it('should return correct keys with number', () =>
    expect(fun(...NUM)).to.equal(exp));
};
const correctKeyStr = (fun: Function, exp) => {
  it('should return correct keys with string', () =>
    expect(fun(...STR)).to.equal(exp));
};
const throws = (errType: Function, fun: Function) => {
  it(`should throw ${errType.name}`, () =>
    expect(fun).to.throw(errType));
};

describe('getKey functions', () => {

  describe('guild function', () => {
    const fun = getKey.guild;
    correctKeyNum(fun, `sb:guild:${NUM[0]}`);
    correctKeyStr(fun, `sb:guild:${STR[0]}`);
    throws(RangeError, () => fun(-1));
    throws(SyntaxError, () => fun(SEP));
    throws(RangeError, () => fun(0.123));
    throws(RangeError, () => fun(Infinity));

  });
  describe('soundfile function', () => {
    const fun = getKey.soundfile;
    correctKeyNum(fun, `sb:guild:${NUM[0]}:soundfile:${NUM[1]}`);
    correctKeyStr(fun, `sb:guild:${STR[0]}:soundfile:${STR[1]}`);
    throws(RangeError, () => fun(NUM[0], -1));
    throws(SyntaxError, () => fun(NUM[0], SEP));
    throws(RangeError, () => fun(NUM[0], 0.123));
    throws(RangeError, () => fun(NUM[0], Infinity));
  });
  describe('soundfileNextVal function', () => {
    const fun = getKey.soundfileNextval;
    correctKeyNum(fun, `sb:guild:${NUM[0]}:soundfile:nextval`);
    correctKeyStr(fun, `sb:guild:${STR[0]}:soundfile:nextval`);
    throws(RangeError, () => fun(-1));
    throws(SyntaxError, () => fun(SEP));
    throws(RangeError, () => fun(0.123));
    throws(RangeError, () => fun(Infinity));
  });
  describe('soundfiles function', () => {
    const fun = getKey.soundfiles;
    correctKeyNum(fun, `sb:guild:${NUM[0]}:soundfiles`);
    correctKeyStr(fun, `sb:guild:${STR[0]}:soundfiles`);
    throws(RangeError, () => fun(-1));
    throws(SyntaxError, () => fun(SEP));
    throws(RangeError, () => fun(0.123));
    throws(RangeError, () => fun(Infinity));
  });
});
