(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.NP = {})));
}(this, (function (exports) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */





















function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/**
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */
/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
function strip(num, precision) {
    if (precision === void 0) { precision = 12; }
    return +parseFloat(num.toPrecision(precision));
}
/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
function digitLength(num) {
    // Get digit length of e
    var eSplit = num.toString().split(/[eE]/);
    var len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
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
    return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
}
/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
    if (_boundaryCheckingState) {
        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            console.warn(num + " is beyond boundary when transfer to integer, the results may not be accurate");
        }
    }
}
/**
 * 精确加法
 */
function plus() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = __read(__spread(args)), first = _a[0], nums = _a.slice(1);
    resolveNums(nums, 0);
    return nums.reduce(function (ret, cur) {
        var baseNum = Math.pow(10, Math.max(digitLength(ret), digitLength(cur)));
        return (times(ret, baseNum) + times(cur, baseNum)) / baseNum;
    }, first);
}
/**
 * 精确减法
 */
function minus() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = __read(__spread(args)), first = _a[0], nums = _a.slice(1);
    resolveNums(nums, 0);
    return nums.reduce(function (ret, cur) {
        var baseNum = Math.pow(10, Math.max(digitLength(ret), digitLength(cur)));
        return (times(ret, baseNum) - times(cur, baseNum)) / baseNum;
    }, first);
}
/**
 * 精确乘法
 */
function times() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = __read(__spread(args)), first = _a[0], nums = _a.slice(1);
    resolveNums(nums, 1);
    return nums.reduce(function (ret, cur) {
        var num1Changed = float2Fixed(ret);
        var num2Changed = float2Fixed(cur);
        var baseNum = digitLength(ret) + digitLength(cur);
        var leftValue = num1Changed * num2Changed;
        checkBoundary(leftValue);
        return leftValue / Math.pow(10, baseNum);
    }, first);
}
/**
 * 精确除法
 */
function divide() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = __read(__spread(args)), first = _a[0], nums = _a.slice(1);
    resolveNums(nums, 1);
    return nums.reduce(function (ret, cur) {
        var num1Changed = float2Fixed(ret);
        var num2Changed = float2Fixed(cur);
        checkBoundary(num1Changed);
        checkBoundary(num2Changed);
        // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
        return times((num1Changed / num2Changed), strip(Math.pow(10, digitLength(cur) - digitLength(ret))));
    }, first);
}
/**
 * 四舍五入
 */
function round(num, ratio) {
    var base = Math.pow(10, ratio);
    return divide(Math.round(times(num, base)), base);
}
var _boundaryCheckingState = true;
/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 */
function enableBoundaryChecking(flag) {
    if (flag === void 0) { flag = true; }
    _boundaryCheckingState = flag;
}
function isUndef(v) {
    return v === undefined || v === null;
}
/**
 * 将数组中`undefined`和`null`类型转换为`0/1`并`warn`
 */
function resolveNums(nums, ret) {
    if (ret === void 0) { ret = 0; }
    if (!Array.isArray(nums)) {
        nums = [nums];
    }
    for (var index = 0; index < nums.length; index++) {
        if (isUndef(nums[index])) {
            console.warn(index + " of " + nums + " is not a number");
            nums[index] = ret;
        }
    }
}
var index = { strip: strip, plus: plus, minus: minus, times: times, divide: divide, round: round, digitLength: digitLength, float2Fixed: float2Fixed, enableBoundaryChecking: enableBoundaryChecking };

exports.strip = strip;
exports.plus = plus;
exports.minus = minus;
exports.times = times;
exports.divide = divide;
exports.round = round;
exports.digitLength = digitLength;
exports.float2Fixed = float2Fixed;
exports.enableBoundaryChecking = enableBoundaryChecking;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
