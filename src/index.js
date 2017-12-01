/**
 * @file 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */

/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}

/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
function digitLength(num) {
  // Get digit length of e
  const eSplit = num.toString().split(/[eE]/);
  const len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
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
  const dLen = digitLength(num);
  return dLen > 0 ? num * Math.pow(10, dLen) : num;
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
  }
}

/**
 * 精确乘法
 */
function times() {
  const res = getArgs(arguments);
  if (!res) {
    return res;
  }
  if (typeof res !== 'object') {
    return res;
  }
  const {num1, num2, args} = res;

  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  const baseNum = digitLength(num1) + digitLength(num2);
  const leftValue = num1Changed * num2Changed;

  checkBoundary(leftValue);

  const results = leftValue / Math.pow(10, baseNum);

  [].unshift.call(args, results);
  return times.apply(null, args);
}

/**
 * 精确加法
 */
function plus() {
  const res = getArgs(arguments);
  if (!res) {
    return res;
  }
  if (typeof res !== 'object') {
    return res;
  }
  const {num1, num2, args} = res;

  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  const results = (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
  
  [].unshift.call(args, results);
  return plus.apply(null, args);
}

/**
 * 精确减法
 */
function minus() {
  const res = getArgs(arguments);
  if (!res) {
    return res;
  }
  if (typeof res !== 'object') {
    return res;
  }
  const {num1, num2, args} = res;

  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  const results =  (times(num1, baseNum) - times(num2, baseNum)) / baseNum;

  [].unshift.call(args, results);
  return minus.apply(null, args);
}

/**
 * 精确除法
 */
function divide() {
  const res = getArgs(arguments);
  if (!res) {
    return res;
  }
  if (typeof res !== 'object') {
    return res;
  }
  const {num1, num2, args} = res;

  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  const results = times((num1Changed / num2Changed), Math.pow(10, digitLength(num2) - digitLength(num1)));

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
  return {num1, num2, args};
}

/**
 * 四舍五入
 */
function round(num, ratio) {
  const base = Math.pow(10, ratio);
  return divide(Math.round(times(num, base)), base);
}

export { strip, plus, minus, times, divide, round, digitLength, float2Fixed };
export default { strip, plus, minus, times, divide, round, digitLength, float2Fixed };
