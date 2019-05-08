import Regex from './regex';
import Type from './type';

function compile(message: string, ...args: any[]) {
  return message.replace(/\$(\d)/g, (value, index) => {
    const arg = args[index - 1];
    return Type.isNill(arg) ? '' : arg;
  });
}

function validate(checkFn: Function, message: string) {
  return {
    validator: (rule: any, value: any, callback: Function) => {
      callback(checkFn(value, rule) ? undefined : message);
    }
  };
}

function required(message: string, isRequired = true) {
  return { required: isRequired, message };
}

function inRange(start: number, end: number, message = '请输入$1-$2之间的数值') {
  return validate((value: number) => value >= start && value <= end, compile(message, start, end));
}

function greaterThan(min: number, message = '请输入大于$1的数值') {
  return validate((value: number) => value > min, compile(message, min));
}

function lessThan(max: number, message = '请输入小于$1的数值') {
  return validate((value: number) => value < max, compile(message, max));
}

function includes(substr: string, message = '请输入包含$1关键字的字符') {
  return validate((value: string) => value.includes(substr), compile(message, substr));
}

function maxLength(len: number, message = '请不要超出$1个字符') {
  return validate((value: string) => value.length <= len, compile(message, len));
}

function minLength(len: number, message = '请至少输入$1字符') {
  return validate((value: string) => value.length >= len, compile(message, len));
}

function inRangeLen(minLen: number, maxLen: number, message = '请输入$1-$2个字符') {
  return validate((value: string) => value.length >= minLen && value.length <= maxLen, compile(message, minLen, maxLen));
}

function endsWith(str: string, message = '请输入以$1结尾的字符') {
  return validate((value: string) => value.endsWith(str), compile(message, str));
}

function startsWith(str: string, message = '请输入以$1开头的字符') {
  return validate((value: string) => value.startsWith(str), compile(message, str));
}

function matches(pattern: RegExp, message: string) {
  return { pattern, message };
}

function chinese(message = '请输入中文字符串') {
  return matches(Regex.Chinese, message);
}

function phone(message = '请输入手机号') {
  return matches(Regex.Phone, message);
}

function email(message = '请输入email地址') {
  return { type: 'email', message };
}

function uri(message = '请输入URI地址') {
  return matches(Regex.URI, message);
}

function url(message = '请输入URL地址') {
  return { type: 'url', message };
}

function postalCode(message = '请输入邮件编码') {
  return matches(Regex.PostalCode, message);
}

function idCard(message = '请输入身份证号码') {
  return matches(Regex.IDCard, message);
}

function positiveInteger(message = '请输入正整数') {
  return matches(Regex.PositiveInteger, message);
}

function negtiveInteger(message = '请输入负整数') {
  return matches(Regex.NegtiveInteger, message);
}

function integer(message = '请输入整数') {
  return matches(Regex.Integer, message);
}

function json(message: any) {
  return validate((value: string) => {
    let isJson;
    try {
      const result = JSON.parse(value);
      // 排除数值等其他类型
      isJson = Type.isObject(result) || Type.isArray(result);
    } catch (e) {
      isJson = false;
    }
    return isJson;
  }, message);
}

export default {
  validate,
  integer,
  negtiveInteger,
  positiveInteger,
  idCard,
  postalCode,
  url,
  uri,
  email,
  phone,
  chinese,
  required,
  inRange,
  greaterThan,
  lessThan,
  includes,
  minLength,
  maxLength,
  inRangeLen,
  matches,
  endsWith,
  startsWith,
  json,
};
