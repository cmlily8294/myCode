// 判断是否为字符串
function isString(source: any) {
  return typeof source === 'string' ||
  ((!!source && typeof source === 'object') && Object.prototype.toString.call(source) === '[object String]');
}

// 判断是否为数组
function isArray(source: any) {
  return Array.isArray(source);
}

// 判断是否为纯对象
function isObject(source: any) {
  return Object.prototype.toString.call(source) === '[object Object]';
}

// 判断是否为函数
function isFunction(source: any) {
  return source != null && (source.constructor === Function || source instanceof Function);
}

// 判断是否为数字
function isNumber(source: any) {
  return source != null && (source.constructor === Number || source instanceof Number);
}

// 判断是否为整数
function isInt(source: any) {
  return Number.isInteger(source);
}

// 判断是否等于null或者undefined
function isNill(source: any) {
  return source == null;
}

function isEmpty(value: any) {
  // null 或者 未定义，则为空
  if (value === null || value === undefined) {
    return true;
  }
  // 传入空字符串，则为空
  if (typeof value === 'string') {
    return value === '';
  }
  // 传入函数，则不为空
  if (typeof value === 'function') {
    return false;
  }
  // 传入数组长度为0，则为空
  if (value instanceof Array) {
    return !value.length;
  }
  // 传入空对象，则为空
  if (value instanceof Object) {
    for (var key in value) {
      if (window.hasOwnProperty.call(value, key)) {
        return false;
      }
    }
  }
}

export default {
  isString,
  isArray,
  isObject,
  isFunction,
  isNumber,
  isInt,
  isNill,
  isEmpty
};

