import { assert } from 'chai';
import NP from '../src';

describe('NP.strip', () => {
  function check(num1, result) {
    assert.strictEqual(NP.strip(num1), result);
  }

  it('can eliminate rounding errors', () => {
    check(0.09999999999999998, 0.1);
    check(1.0000000000000001, 1);
  });
});

describe('NP.digitLength', () => {
  function check(num, result) {
    assert.strictEqual(NP.digitLength(num), result);
  }

  it('can do digitLength operation', () => {
    check(123.4567890123, 10);

    check(1.23e-5, 7);
    check(1.23E-5, 7);
    check(1.233467e-5, 11);
    check(123.45e-5, 7);
    check(1.23e-10, 12);
    check(1.23e1, 1);
    check(1e20, 0);
    check(1.12345e20, 0);
    check(1.123e30, 0);
    check(1.123e-100, 103);
  });
});

describe('NP.float2Fixed', () => {
  function check(num, result) {
    assert.strictEqual(NP.float2Fixed(num), result);
  }

  it('can change float to fixed', () => {
    check(1e-1, 1);
    check(1e-6, 1);
    check(1e-7, 1);
    check(1e-13, 1);
    check(1.123e30, 1.123e30);
    check(1.6e-30, 16);
    check(1.234567e-13, 1234567);
    check(1.2345678912345e10, 12345678912345);
  });
});

describe('NP.plus', () => {
  function check() {
    var result = [].pop.call(arguments);
    assert.strictEqual(NP.plus.apply(null, arguments), result);
  }

  it('can do plus operation', () => {
    check(0.1, 0.2, 0.3);
    check(2.3, 2.4, 4.7);
    check(-1.6, -1, -2.6);
    check(-2.0, 63, 61);
    check(-3, 7, 4);
    check(-221, 38, -183);
    check(-1, 0, -1);
    check(2.018, 0.001, 2.019);
    check(1.3224e10, 1.3224e3, 13224001322.4);
    check(1.6e-30, 1.6e-30, 3.2e-30);

    check(1, 1);
    check(0.1, 0.2, 0.3, 0.6);
    check();
  });
});

describe('NP.minus', () => {
  function check() {
    var result = [].pop.call(arguments);
    assert.strictEqual(NP.minus.apply(null, arguments), result);
  }

  it('can do minus operation', () => {
    check(0.07, 0.01, 0.06);
    check(0.7, 0.1, 0.6);
    check(1.0, 0.9, 0.1);
    check(1, 0, 1);
    check(1, -0, 1);
    check(-1, 0, -1);
    check(-1, -0, -1);
    check(1, 22, -21);
    check(8893568.397103781249, -7.29674059550, 8893575.693844376749);
    check(105468873, 0, 105468873);

    check(1.23e5, 10, 122990);
    check(1.23e-5, 1.0023, -1.0022877);
    check(1.3224e10, 21, 13223999979);
    check(1.3224e10, 1.3224e3, 13223998677.6);
    check(1.7e-30, 0.1e-30, 1.6e-30);

    check(6, 3, 2, 1);
    check(2, 2);
    check();
  });
});

describe('NP.times', () => {
  function check(num1, num2, result) {
    var result = [].pop.call(arguments);
    assert.strictEqual(NP.times.apply(null, arguments), result);
  }

  it('can do times operation', () => {
    check(0.07, 100, 7);
    check(0.7, 0.1, 0.07);
    check(3, 0.3, 0.9);
    check(118762317358.75, 1e-8, 1187.6231735875);
    check(0.362, 100, 36.2);
    check(1.1, 1.1, 1.21);
    check(2.018, 1000, 2018);
    check(5.2, -3.8461538461538462, -20);
    check(1.22, -1.639344262295082, -2);
    check(2.5, -0.92, -2.3);
    check(-2.2, 0.6363636363636364, -1.4);
    // check(-3, 2.3333333333333335, 7);
    // check(-0.076, -92.10526315789471, 7);
    check(8.0, -0.3625, -2.9);
    check(6.6, 0.30303030303030304, 2);
    check(10.0, -0.8, -8);
    check(-1.1, -7.272727272727273, 8);

    check(-1.23e4, 20, -246000);
    check(1.7e-30, 1.5e20, 2.55e-10);

    check(2, 2, 3, 12);
    check(3, 3);
    check();
  });
});

describe('NP.divide', () => {
  function check(num1, num2, result) {
    var result = [].pop.call(arguments);
    assert.strictEqual(NP.divide.apply(null, arguments), result);
  }

  it('can do divide operation', () => {
    check(1.21, 1.1, 1.1);
    check(4750.49269435, 4, 1187.6231735875);
    check(0.9, 3, 0.3);
    check(36.2, 0.362, 100);
    check(-20, 5.2, -3.8461538461538462);
    check(-2, 1.22, -1.639344262295082);
    check(-2.3, 2.5, -0.92);
    check(-1.4, -2.2, 0.6363636363636364);
    check(7, -3, -2.3333333333333335);
    check(7, -0.076, -92.10526315789471);
    check(-2.9, 8.0, -0.3625);
    check(2, 6.6, 0.30303030303030304);
    check(-8, 10.0, -0.8);
    check(8, -1.1, -7.272727272727273);

    check(-1.23e4, 20, -615);
    check(2.55e-10, 1.7e-30, 1.5e20);

    check(12, 3, 2, 2);
    check(4, 4);
    check();
  });
});

describe('NP.round', () => {
  function check(num1, num2, result) {
    assert.strictEqual(NP.round(num1, num2), result);
  }

  it('can do round operation', () => {
    check(0, 1, 0);
    check(0, 0, 0);
    check(0.7875, 3, 0.788);
    check(0.105, 2, 0.11);
    check(1, 1, 1);
    check(0.1049999999, 2, 0.1);
    check(0.105, 1, 0.1);
    check(1.335, 2, 1.34);
    check(1.35, 1, 1.4);
    check(12345.105, 2, 12345.11);
    check(0.0005, 2, 0);
    check(0.0005, 3, 0.001);

    check(1.2345e3, 3, 1234.5);
    check(1.2344e3, 3, 1234.4);
    check(1e3, 1, 1000);
  });
});
