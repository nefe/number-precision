'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @file 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */

/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
function strip(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;

  return +parseFloat(num.toPrecision(precision));
}

/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
function digitLength(num) {
  // Get digit length of e
  var eSplit = num.toString().split(/[eE]/);
  var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
function float2Fixed(num) {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  var dLen = digitLength(num);
  return dLen > 0 ? num * Math.pow(10, dLen) : num;
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    console.warn(num + ' is beyond boundary when transfer to integer, the results may not be accurate');
  }
}

/**
 * 精确乘法
 */
function times() {
  var res = getArgs(arguments);
  if (!res) {
    return res;
  }
  if ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) !== 'object') {
    return res;
  }
  var num1 = res.num1,
      num2 = res.num2,
      args = res.args;


  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  var baseNum = digitLength(num1) + digitLength(num2);
  var leftValue = num1Changed * num2Changed;

  checkBoundary(leftValue);

  var results = leftValue / Math.pow(10, baseNum);

  [].unshift.call(args, results);
  return times.apply(null, args);
}

/**
 * 精确加法
 */
function plus() {
  var res = getArgs(arguments);
  if (!res) {
    return res;
  }
  if ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) !== 'object') {
    return res;
  }
  var num1 = res.num1,
      num2 = res.num2,
      args = res.args;


  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  var results = (times(num1, baseNum) + times(num2, baseNum)) / baseNum;

  [].unshift.call(args, results);
  return plus.apply(null, args);
}

/**
 * 精确减法
 */
function minus() {
  var res = getArgs(arguments);
  if (!res) {
    return res;
  }
  if ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) !== 'object') {
    return res;
  }
  var num1 = res.num1,
      num2 = res.num2,
      args = res.args;


  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  var results = (times(num1, baseNum) - times(num2, baseNum)) / baseNum;

  [].unshift.call(args, results);
  return minus.apply(null, args);
}

/**
 * 精确除法
 */
function divide() {
  var res = getArgs(arguments);
  if (!res) {
    return res;
  }
  if ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) !== 'object') {
    return res;
  }
  var num1 = res.num1,
      num2 = res.num2,
      args = res.args;


  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  var results = times(num1Changed / num2Changed, Math.pow(10, digitLength(num2) - digitLength(num1)));

  [].unshift.call(args, results);
  return divide.apply(null, args);
}

/**
 * 获取前两个参数以及剩余的参数 
 */
function getArgs(args) {
  if (!args || !args.length) {
    return;
  }
  if (args.length < 2) {
    return args[0];
  }
  var num1 = [].shift.call(args, 0);
  var num2 = [].shift.call(args, 0);
  return { num1: num1, num2: num2, args: args };
}

/**
 * 四舍五入
 */
function round(num, ratio) {
  var base = Math.pow(10, ratio);
  return divide(Math.round(times(num, base)), base);
}

exports.strip = strip;
exports.plus = plus;
exports.minus = minus;
exports.times = times;
exports.divide = divide;
exports.round = round;
exports.digitLength = digitLength;
exports.float2Fixed = float2Fixed;
exports.default = { strip: strip, plus: plus, minus: minus, times: times, divide: divide, round: round, digitLength: digitLength, float2Fixed: float2Fixed };