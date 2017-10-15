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
 * 精确乘法
 */
function times(num1, num2) {
  const num1Changed = Number(num1.toString().replace('.', ''));
  const num2Changed = Number(num2.toString().replace('.', ''));
  const baseNum = digitLength(num1) + digitLength(num2);
  return num1Changed * num2Changed / Math.pow(10, baseNum);
}


/**
 * 精确加法
 */
function plus(num1, num2) {
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * 精确减法
 */
function minus(num1, num2) {
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (num1 * baseNum - num2 * baseNum) / baseNum;
}

/**
 * 精确除法
 */
function divide(num1, num2) {
  const num1Changed = Number(num1.toString().replace('.', ''));
  const num2Changed = Number(num2.toString().replace('.', ''));
  return times((num1Changed / num2Changed), Math.pow(10, digitLength(num2) - digitLength(num1)));
}

/**
 * 四舍五入
 */
function round(num, ratio) {
  const base = Math.pow(10, ratio);
  return divide(Math.round(times(num, base)), base);
}

export { strip, plus, minus, times, divide, round, digitLength };
export default { strip, plus, minus, times, divide, round, digitLength };
