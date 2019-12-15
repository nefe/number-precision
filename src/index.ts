/**
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */

/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
function strip(num: number, precision = 12): number {
  return +parseFloat(num.toPrecision(precision));
}

/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
function digitLength(num: number): number {
  // Get digit length of e
  const eSplit = num.toString().split(/[eE]/);
  const len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
function float2Fixed(num: number): number {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  const dLen = digitLength(num);
  return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary(num: number) {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
    }
  }
}

/**
 * 精确加法
 */
function plus(...args: any[]) {
  const [first, ...nums] = [...args];
  resolveNums(nums, 0);
  return nums.reduce((ret, cur) => {
    const baseNum = Math.pow(10, Math.max(digitLength(ret), digitLength(cur)));
    return (times(ret, baseNum) + times(cur, baseNum)) / baseNum;
  }, first);
}

/**
 * 精确减法
 */
function minus(...args: any[]) {
  const [first, ...nums] = [...args];
  resolveNums(nums, 0);
  return nums.reduce((ret, cur) => {
    const baseNum = Math.pow(10, Math.max(digitLength(ret), digitLength(cur)));
    return (times(ret, baseNum) - times(cur, baseNum)) / baseNum;
  }, first);
}

/**
 * 精确乘法
 */
function times(...args: any[]) {
  const [first, ...nums] = [...args];
  resolveNums(nums, 1);
  return nums.reduce((ret, cur) => {
    const num1Changed = float2Fixed(ret);
    const num2Changed = float2Fixed(cur);
    const baseNum = digitLength(ret) + digitLength(cur);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }, first);
}

/**
 * 精确除法
 */
function divide(...args: any[]) {
  const [first, ...nums] = [...args];
  resolveNums(nums, 1);
  return nums.reduce((ret, cur) => {
    const num1Changed = float2Fixed(ret);
    const num2Changed = float2Fixed(cur);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
    return times((num1Changed / num2Changed), strip(Math.pow(10, digitLength(cur) - digitLength(ret))));
  }, first);
}

/**
 * 四舍五入
 */
function round(num: number, ratio: number): number {
  const base = Math.pow(10, ratio);
  return divide(Math.round(times(num, base)), base);
}

let _boundaryCheckingState = true;
/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 */
function enableBoundaryChecking(flag = true) {
  _boundaryCheckingState = flag;
}

function isUndef(v: any): boolean {
  return v === undefined || v === null;
}

/**
 * 将数组中`undefined`和`null`类型转换为`0/1`并`warn`
 */
function resolveNums(nums: number | number[], ret: number = 0) {
  if (!Array.isArray(nums)) {
    nums = [nums];
  }
  for (let index = 0; index < nums.length; index++) {
    if (isUndef(nums[index])) {
      console.warn(`${index} of ${nums} is not a number`);
      nums[index] = ret;
    }
  }
}

export { strip, plus, minus, times, divide, round, digitLength, float2Fixed, enableBoundaryChecking };
export default { strip, plus, minus, times, divide, round, digitLength, float2Fixed, enableBoundaryChecking };
