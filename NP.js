/**
 * @file 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */

var NP = {
  /**
   * 把错误的数据转正
   * strip(0.09999999999999998)=0.1
   */
  strip: function (num) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;
    return +parseFloat(num.toPrecision(precision));
  },
  /**
   * Return digits length of a number
   * @param {*number} num Input number
   */
  digitLength: function (num) {
    // Get digit length of e
    var eSplit = num.toString().split(/[eE]/);
    var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  },
  /**
   * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
   * @param {*number} num 输入数
   */
  float2Fixed: function (num) {
    if (num.toString().indexOf('e') === -1) {
      return Number(num.toString().replace('.', ''));
    }
    var dLen = this.digitLength(num);
    return dLen > 0 ? num * Math.pow(10, dLen) : num;
  },

  /**
   * 精确乘法
   */
  times: function (num1, num2) {
    var num1Changed = this.float2Fixed(num1);
    var num2Changed = this.float2Fixed(num2);
    var baseNum = this.digitLength(num1) + this.digitLength(num2);
    return num1Changed * num2Changed / Math.pow(10, baseNum);
  },

  /**
   * 精确加法
   */
  plus: function (num1, num2) {
    var baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)));
    return (this.times(num1, baseNum) + this.times(num2, baseNum)) / baseNum;
  },

  /**
   * 精确减法
   */
  minus: function (num1, num2) {
    var baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)));
    return (this.times(num1, baseNum) - this.times(num2, baseNum)) / baseNum;
  },

  /**
   * 精确除法
   */
  divide: function (num1, num2) {
    var num1Changed = this.float2Fixed(num1);
    var num2Changed = this.float2Fixed(num2);
    return this.times(num1Changed / num2Changed, Math.pow(10, this.digitLength(num2) - thsi.digitLength(num1)));
  },

  /**
   * 四舍五入
   */
  round: function (num, ratio) {
    var base = Math.pow(10, ratio);
    return this.divide(Math.round(this.times(num, base)), base);
  }
}
