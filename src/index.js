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
 * 精确除法
 */
function add(num1, num2) {
  const baseNum1 = (num1.toString().split('.')[1] || '').length;
  const baseNum2 = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}

/**
 * 精确除法
 */
function sub(num1, num2) {
  const baseNum1 = (num1.toString().split('.')[1] || '').length;
  const baseNum2 = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  const precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
}

/**
 * 精确除法
 */
function multi(num1, num2) {
  const baseNum1 = (num1.toString().split('.')[1] || '').length;
  const baseNum2 = (num2.toString().split('.')[1] || '').length;
  const baseNum = baseNum1 + baseNum2;
  return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum);
}

/**
 * 精确除法
 */
function divide(num1, num2) {
  const baseNum1 = (num1.toString().split('.')[1] || '').length;
  const baseNum2 = (num2.toString().split('.')[1] || '').length;
  const baseNum3 = Number(num1.toString().replace('.', ''));
  const baseNum4 = Number(num2.toString().replace('.', ''));
  return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
}

export { strip, add, sub, multi, divide };
export default { strip, add, sub, multi, divide };
