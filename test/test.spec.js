import { assert } from 'chai';
import NP from '../src';

describe('NP.strip', () => {
  it('can eliminate rounding errors', () => {
    assert.strictEqual(NP.strip(0.09999999999999998), 0.1);
    assert.strictEqual(NP.strip(1.0000000000000001), 1);
  });
});

describe('NP.digitLength', () => {
  it('can do digitLength operation', () => {
    assert.strictEqual(NP.digitLength(123.4567890123), 10);

    assert.strictEqual(NP.digitLength(1.23e-5), 7);
    assert.strictEqual(NP.digitLength(1.23E-5), 7);
    assert.strictEqual(NP.digitLength(1.233467e-5), 11);
    assert.strictEqual(NP.digitLength(123.45e-5), 7);
    assert.strictEqual(NP.digitLength(1.23e-10), 12);
    assert.strictEqual(NP.digitLength(1.23e1), 1);
    assert.strictEqual(NP.digitLength(1e20), 0);
    assert.strictEqual(NP.digitLength(1.12345e20), 0);
    assert.strictEqual(NP.digitLength(1.123e30), 0);
    assert.strictEqual(NP.digitLength(1.123e-100), 103);
  });
});

describe('NP.float2Fixed', () => {
  it('can change float to fixed', () => {
    assert.strictEqual(NP.float2Fixed(1e-1), 1);
    assert.strictEqual(NP.float2Fixed(1e-6), 1);
    assert.strictEqual(NP.float2Fixed(1e-7), 1);
    assert.strictEqual(NP.float2Fixed(1e-13), 1);
    assert.strictEqual(NP.float2Fixed(1.123e30), 1.123e30);
    assert.strictEqual(NP.float2Fixed(1.6e-30), 16);
    assert.strictEqual(NP.float2Fixed(1.234567e-13), 1234567);
    assert.strictEqual(NP.float2Fixed(1.2345678912345e10), 12345678912345);
  });
});

describe('NP.plus', () => {
  it('can do plus operation', () => {
    assert.strictEqual(NP.plus(0.1, 0.2), 0.3);
    assert.strictEqual(NP.plus(2.3, 2.4), 4.7);
    assert.strictEqual(NP.plus(-1.6, -1), -2.6);
    assert.strictEqual(NP.plus(-2.0, 63), 61);
    assert.strictEqual(NP.plus(-3, 7), 4);
    assert.strictEqual(NP.plus(-221, 38), -183);
    assert.strictEqual(NP.plus(-1, 0), -1);
    assert.strictEqual(NP.plus(2.018, 0.001), 2.019);
    assert.strictEqual(NP.plus(1.3224e10, 1.3224e3), 13224001322.4);
    assert.strictEqual(NP.plus(1.6e-30, 1.6e-30), 3.2e-30);

    assert.strictEqual(NP.plus(0.1, 0.2, 0.3), 0.6);
  });
});

describe('NP.minus', () => {
  it('can do minus operation', () => {
    assert.strictEqual(NP.minus(0.07, 0.01), 0.06);
    assert.strictEqual(NP.minus(0.7, 0.1), 0.6);
    assert.strictEqual(NP.minus(1.0, 0.9), 0.1);
    assert.strictEqual(NP.minus(1, 0), 1);
    assert.strictEqual(NP.minus(1, -0), 1);
    assert.strictEqual(NP.minus(-1, 0), -1);
    assert.strictEqual(NP.minus(-1, -0), -1);
    assert.strictEqual(NP.minus(1, 22), -21);
    assert.strictEqual(NP.minus(8893568.397103781249, -7.29674059550), 8893575.693844376749);
    assert.strictEqual(NP.minus(105468873, 0), 105468873);

    assert.strictEqual(NP.minus(1.23e5, 10), 122990);
    assert.strictEqual(NP.minus(1.23e-5, 1.0023), -1.0022877);
    assert.strictEqual(NP.minus(1.3224e10, 21), 13223999979);
    assert.strictEqual(NP.minus(1.3224e10, 1.3224e3), 13223998677.6);
    assert.strictEqual(NP.minus(1.7e-30, 0.1e-30), 1.6e-30);

    assert.strictEqual(NP.minus(6, 3, 2), 1);
    assert.strictEqual(NP.minus(6, 3, 2, 1, 2, 3), -5);
  });
});

describe('NP.times', () => {
  it('can do times operation', () => {
    assert.strictEqual(NP.times(0.07, 100), 7);
    assert.strictEqual(NP.times(0.7, 0.1), 0.07);
    assert.strictEqual(NP.times(3, 0.3), 0.9);
    assert.strictEqual(NP.times(118762317358.75, 1e-8), 1187.6231735875);
    assert.strictEqual(NP.times(0.362, 100), 36.2);
    assert.strictEqual(NP.times(1.1, 1.1), 1.21);
    assert.strictEqual(NP.times(2.018, 1000), 2018);
    assert.strictEqual(NP.times(5.2, -3.8461538461538462), -20);
    assert.strictEqual(NP.times(1.22, -1.639344262295082), -2);
    assert.strictEqual(NP.times(2.5, -0.92), -2.3);
    assert.strictEqual(NP.times(-2.2, 0.6363636363636364), -1.4);
    // assert.strictEqual(NP.times(-3, 2.3333333333333335), 7);
    // assert.strictEqual(NP.times(-0.076, -92.10526315789471), 7);
    assert.strictEqual(NP.times(8.0, -0.3625), -2.9);
    assert.strictEqual(NP.times(6.6, 0.30303030303030304), 2);
    assert.strictEqual(NP.times(10.0, -0.8), -8);
    assert.strictEqual(NP.times(-1.1, -7.272727272727273), 8);

    assert.strictEqual(NP.times(-1.23e4, 20), -246000);
    assert.strictEqual(NP.times(1.7e-30, 1.5e20), 2.55e-10);

    assert.strictEqual(NP.times(2, 2, 3), 12);
    assert.strictEqual(NP.times(2, 2, 3, 0.1), 1.2);
  });
});

describe('NP.divide', () => {
  it('can do divide operation', () => {
    assert.strictEqual(NP.divide(1.21, 1.1), 1.1);
    assert.strictEqual(NP.divide(4750.49269435, 4), 1187.6231735875);
    assert.strictEqual(NP.divide(0.9, 3), 0.3);
    assert.strictEqual(NP.divide(36.2, 0.362), 100);
    assert.strictEqual(NP.divide(-20, 5.2), -3.8461538461538462);
    assert.strictEqual(NP.divide(-2, 1.22), -1.639344262295082);
    assert.strictEqual(NP.divide(-2.3, 2.5), -0.92);
    assert.strictEqual(NP.divide(-1.4, -2.2), 0.6363636363636364);
    assert.strictEqual(NP.divide(7, -3), -2.3333333333333335);
    assert.strictEqual(NP.divide(7, -0.076), -92.10526315789471);
    assert.strictEqual(NP.divide(-2.9, 8.0), -0.3625);
    assert.strictEqual(NP.divide(2, 6.6), 0.30303030303030304);
    assert.strictEqual(NP.divide(-8, 10.0), -0.8);
    assert.strictEqual(NP.divide(8, -1.1), -7.272727272727273);

    assert.strictEqual(NP.divide(-1.23e4, 20), -615);
    assert.strictEqual(NP.divide(2.55e-10, 1.7e-30), 1.5e20);

    assert.strictEqual(NP.divide(12, 3, 2), 2);
  });
});

describe('NP.round', () => {
  it('can do round operation', () => {
    assert.strictEqual(NP.round(0, 1), 0);
    assert.strictEqual(NP.round(0, 0), 0);
    assert.strictEqual(NP.round(0.7875, 3), 0.788);
    assert.strictEqual(NP.round(0.105, 2), 0.11);
    assert.strictEqual(NP.round(1, 1), 1);
    assert.strictEqual(NP.round(0.1049999999, 2), 0.1);
    assert.strictEqual(NP.round(0.105, 1), 0.1);
    assert.strictEqual(NP.round(1.335, 2), 1.34);
    assert.strictEqual(NP.round(1.35, 1), 1.4);
    assert.strictEqual(NP.round(12345.105, 2), 12345.11);
    assert.strictEqual(NP.round(0.0005, 2), 0);
    assert.strictEqual(NP.round(0.0005, 3), 0.001);

    assert.strictEqual(NP.round(1.2345e3, 3), 1234.5);
    assert.strictEqual(NP.round(1.2344e3, 3), 1234.4);
    assert.strictEqual(NP.round(1e3, 1), 1000);
  });
});
