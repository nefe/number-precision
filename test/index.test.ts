import test from 'ava';
import NP from '../src/index';

test('NP.strip can eliminate rounding errors', (t) => {
  t.true(NP.strip(0.09999999999999998) === 0.1);
  t.true(NP.strip(1.0000000000000001) === 1);
});

test('NP.digitLength can do digitLength operation', (t) => {
  t.true(NP.digitLength(123.4567890123) === 10);

  t.true(NP.digitLength(1.23e-5) === 7);
  t.true(NP.digitLength(1.23E-5) === 7);
  t.true(NP.digitLength(1.233467e-5) === 11);
  t.true(NP.digitLength(123.45e-5) === 7);
  t.true(NP.digitLength(1.23e-10) === 12);
  t.true(NP.digitLength(1.23e1) === 1);
  t.true(NP.digitLength(1e20) === 0);
  t.true(NP.digitLength(1.12345e20) === 0);
  t.true(NP.digitLength(1.123e30) === 0);
  t.true(NP.digitLength(1.123e-100) === 103);
});

test('NP.float2Fixed can change float to fixed', (t) => {
  t.true(NP.float2Fixed(1e-1) === 1);
  t.true(NP.float2Fixed(1e-6) === 1);
  t.true(NP.float2Fixed(1e-7) === 1);
  t.true(NP.float2Fixed(1e-13) === 1);
  t.true(NP.float2Fixed(1.123e30) === 1.123e30);
  t.true(NP.float2Fixed(1.6e-30) === 16);
  t.true(NP.float2Fixed(1.234567e-13) === 1234567);
  t.true(NP.float2Fixed(1.2345678912345e10) === 12345678912345);
  t.true(NP.float2Fixed(0.000000123456) === 123456);
  t.true(NP.float2Fixed(1.23456e-7) === 123456);
});

test('NP.plus can do plus operation', (t) => {
  t.true(NP.plus(0.1, 0.2) === 0.3);
  t.true(NP.plus(2.3, 2.4) === 4.7);
  t.true(NP.plus(-1.6, -1) === -2.6);
  t.true(NP.plus(-2.0, 63) === 61);
  t.true(NP.plus(-3, 7) === 4);
  t.true(NP.plus(-221, 38) === -183);
  t.true(NP.plus(-1, 0) === -1);
  t.true(NP.plus(2.018, 0.001) === 2.019);
  t.true(NP.plus(1.3224e10, 1.3224e3) === 13224001322.4);
  t.true(NP.plus(1.6e-30, 1.6e-30) === 3.2e-30);

  t.true(NP.plus(0.1, 0.2, 0.3) === 0.6);
});

test('NP.minus can do minus operation', (t) => {
  t.true(NP.minus(0.07, 0.01) === 0.06);
  t.true(NP.minus(0.7, 0.1) === 0.6);
  t.true(NP.minus(1.0, 0.9) === 0.1);
  t.true(NP.minus(1, 0) === 1);
  t.true(NP.minus(1, -0) === 1);
  t.true(NP.minus(-1, 0) === -1);
  t.true(NP.minus(-1, -0) === -1);
  t.true(NP.minus(1, 22) === -21);
  t.true(NP.minus(8893568.397103781249, -7.29674059550) === 8893575.693844376749);
  t.true(NP.minus(105468873, 0) === 105468873);

  t.true(NP.minus(1.23e5, 10) === 122990);
  t.true(NP.minus(1.23e-5, 1.0023) === -1.0022877);
  t.true(NP.minus(1.3224e10, 21) === 13223999979);
  t.true(NP.minus(1.3224e10, 1.3224e3) === 13223998677.6);
  t.true(NP.minus(1.7e-30, 0.1e-30) === 1.6e-30);

  t.true(NP.minus(6, 3, 2) === 1);
  t.true(NP.minus(6, 3, 2, 1, 2, 3) === -5);
});

test('NP.times can do times operation', (t) => {
  t.true(NP.times(0.07, 100) === 7);
  t.true(NP.times(0.7, 0.1) === 0.07);
  t.true(NP.times(3, 0.3) === 0.9);
  t.true(NP.times(118762317358.75, 1e-8) === 1187.6231735875);
  t.true(NP.times(0.362, 100) === 36.2);
  t.true(NP.times(1.1, 1.1) === 1.21);
  t.true(NP.times(2.018, 1000) === 2018);
  t.true(NP.times(5.2, -3.8461538461538462) === -20);
  t.true(NP.times(1.22, -1.639344262295082) === -2);
  t.true(NP.times(2.5, -0.92) === -2.3);
  t.true(NP.times(-2.2, 0.6363636363636364) === -1.4);
  // t.true(NP.times(-3, 2.3333333333333335) === 7);
  // t.true(NP.times(-0.076, -92.10526315789471) === 7);
  t.true(NP.times(8.0, -0.3625) === -2.9);
  t.true(NP.times(6.6, 0.30303030303030304) === 2);
  t.true(NP.times(10.0, -0.8) === -8);
  t.true(NP.times(-1.1, -7.272727272727273) === 8);

  t.true(NP.times(-1.23e4, 20) === -246000);
  t.true(NP.times(1.7e-30, 1.5e20) === 2.55e-10);

  t.true(NP.times(2, 2, 3) === 12);
  t.true(NP.times(2, 2, 3, 0.1) === 1.2);

  t.true(NP.times(0.000000123456, 0.000000123456) === 1.5241383936e-14);
  t.true(NP.times(1.23456e-7, 1.23456e-7) === 1.5241383936e-14);
});

test('NP.divide can do divide operation', (t) => {
  t.true(NP.divide(1.21, 1.1) === 1.1);
  t.true(NP.divide(4750.49269435, 4) === 1187.6231735875);
  t.true(NP.divide(0.9, 3) === 0.3);
  t.true(NP.divide(36.2, 0.362) === 100);
  t.true(NP.divide(-20, 5.2) === -3.8461538461538462);
  t.true(NP.divide(-2, 1.22) === -1.639344262295082);
  t.true(NP.divide(-2.3, 2.5) === -0.92);
  t.true(NP.divide(-1.4, -2.2) === 0.6363636363636364);
  t.true(NP.divide(7, -3) === -2.3333333333333335);
  t.true(NP.divide(7, -0.076) === -92.10526315789471);
  t.true(NP.divide(-2.9, 8.0) === -0.3625);
  t.true(NP.divide(2, 6.6) === 0.30303030303030304);
  t.true(NP.divide(-8, 10.0) === -0.8);
  t.true(NP.divide(8, -1.1) === -7.272727272727273);

  t.true(NP.divide(-1.23e4, 20) === -615);
  t.true(NP.divide(2.55e-10, 1.7e-30) === 1.5e20);

  t.true(NP.divide(12, 3, 2) === 2);
});

test('NP.round can do round operation', (t) => {
  t.true(NP.round(0, 1) === 0);
  t.true(NP.round(0, 0) === 0);
  t.true(NP.round(0.7875, 3) === 0.788);
  t.true(NP.round(0.105, 2) === 0.11);
  t.true(NP.round(1, 1) === 1);
  t.true(NP.round(0.1049999999, 2) === 0.1);
  t.true(NP.round(0.105, 1) === 0.1);
  t.true(NP.round(1.335, 2) === 1.34);
  t.true(NP.round(1.35, 1) === 1.4);
  t.true(NP.round(12345.105, 2) === 12345.11);
  t.true(NP.round(0.0005, 2) === 0);
  t.true(NP.round(0.0005, 3) === 0.001);

  t.true(NP.round(1.2345e3, 3) === 1234.5);
  t.true(NP.round(1.2344e3, 3) === 1234.4);
  t.true(NP.round(1e3, 1) === 1000);
});
