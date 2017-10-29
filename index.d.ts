/**
 * @description 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 * 
 * @param num 需要转正的数字
 * @param precision 精度，默认12
 */
export function strip(num: number, precision?: number): number;

/**
 * @param num  Input number
 * 
 * @returns Return digits length of a number
 */
export function digitLength(num: number): number;

/**
 * @description 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
export function float2Fixed(num: number): number;

/**
 * @description 精确乘法
 */
export function times(num1: number, num2: number): number;

/**
 * @description 精确加法
 */
export function plus(num1: number, num2: number): number;

/**
 * @description 精确减法
 */
export function minus(num1: number, num2: number): number;

/**
 * @description 精确除法
 */
export function divide(num1: number, num2: number): number;

/**
 * @description 四舍五入
 */
export function round(num: number, ratio: number): number;

export default {
  /**
   * @description 把错误的数据转正
   * strip(0.09999999999999998)=0.1
   * 
   * @param num 需要转正的数字
   * @param precision 精度，默认12
   */
  strip,

  /**
   * @description 计算数字长度
   * 
   * @param num  Input number
   * 
   * @returns Return digits length of a number
   */
  digitLength,

  /**
   * @description 把小数转成整数，支持科学计数法。如果是小数则放大成整数
   * @param {*number} num 输入数
   */
  float2Fixed,

  /**
   * @description 精确乘法
   */
  times,

  /**
   * @description 精确加法
   */
  plus,

  /**
   * @description 精确减法
   */
  minus,

  /**
   * @description 精确除法
   */
  divide,

  /**
   * @description 四舍五入
   */
  round,
};
