import { assert } from 'chai';
import NP from '../src';

describe('NP.strip', () => {
  function T(num1, result) {
    assert.strictEqual(NP.strip(num1), result);
  }

  it('can eliminate rounding errors', () => {
    T(0.09999999999999998, 0.1);
    T(1.0000000000000001, 1);
  });
});

describe('NP.plus', () => {
  function T(num1, num2, result) {
    assert.strictEqual(NP.plus(num1, num2), result);
  }

  it('can do plus operation', () => {
    T(0.1, 0.2, 0.3);
    T(2.3, 2.4, 4.7);
    T(-1.6, -1, -2.6);
    T(-2.0, 63, 61);
    T(-3, 7, 4);
    T(-221, 38, -183);
    T(-1, 0, -1);
  });
});

describe('NP.minus', () => {
  function T(num1, num2, result) {
    assert.strictEqual(NP.minus(num1, num2), result);
  }

  it('can do minus operation', () => {
    T(1.0, 0.9, 0.1);
    T(1, 0, 1);
    T(1, -0, 1);
    T(-1, 0, -1);
    T(-1, -0, -1);
    T(1, 22, -21);
    T(8893568.397103781249, -7.29674059550, 8893575.693844376749);
    T(-0.00000000030532, 24.896880251, -24.89688025130532);
    T(105468873, 0, 105468873);
  });
});

describe('NP.times', () => {
  function T(num1, num2, result) {
    assert.strictEqual(NP.times(num1, num2), result);
  }

  it('can do times operation', () => {
    T(3, 0.3, 0.9);
    T(0.362, 100, 36.2);
    T(1.1, 1.1, 1.21,);
    T(5.2, -3.8461538461538462, -20);
    T(1.22, -1.639344262295082, -2);
    T(2.5, -0.92, -2.3);
    T(-2.2, 0.6363636363636364, -1.4);
    // T(-3, 2.3333333333333335, 7);
    // T(-0.076, -92.10526315789471, 7);
    T(8.0, -0.3625, -2.9);
    T(6.6, 0.30303030303030304, 2);
    T(10.0, -0.8, -8);
    T(-1.1, -7.272727272727273, 8);
  });
});

describe('NP.divide', () => {
  function T(num1, num2, result) {
    assert.strictEqual(NP.divide(num1, num2), result);
  }

  it('can do divide operation', () => {
    T(1.21, 1.1, 1.1);
    T(0.9, 3, 0.3);
    T(36.2, 0.362, 100);
    T(-20, 5.2, -3.8461538461538462);
    T(-2, 1.22, -1.639344262295082);
    T(-2.3, 2.5, -0.92);
    T(-1.4, -2.2, 0.6363636363636364);
    T(7, -3, -2.3333333333333335);
    T(7, -0.076, -92.10526315789471);
    T(-2.9, 8.0, -0.3625);
    T(2, 6.6, 0.30303030303030304);
    T(-8, 10.0, -0.8);
    T(8, -1.1, -7.272727272727273);
  });
});

describe('NP.round', () => {
  function T(num1, num2, result) {
    assert.strictEqual(NP.round(num1, num2), result);
  }

  it('can do round operation', () => {
    T(0.105, 2, 0.11)
    T(0.1049999999, 2, 0.1)
    T(0.105, 1, 0.1)
    T(12345.105, 2, 12345.11)
    T(0.0005, 2, 0)
    T(0.0005, 3, 0.001)
  });
});
