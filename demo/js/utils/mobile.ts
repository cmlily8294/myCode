const WIN = <any>window;
const urlHref = WIN.location.href;
const urlSearch = WIN.location.search;
const urlHash = WIN.location.hash;
const userAgent = WIN.navigator.userAgent;

/**
 * 手机类型，值为android|ios|other
 */
const device: string = (() => {
  if (/Android/i.test(userAgent)) {
    return 'android';
  } else if (/iPhone|iPod|iPad/i.test(userAgent)) {
    return 'ios';
  }
  return 'other';
})();

/**
 * 是否在微信，值为true|false
 */
const isWX: boolean = (() => /MicroMessenger/i.test(userAgent))();

/**
 * 是否在QQ，值为true|false
 */
const isQQ: boolean = (() => /qq/i.test(userAgent) && !isWX)();

/**
 * 获取url参数
 * 入参
 * {string} ：url链接，默认当期链接
 */
function getUrlParams(url: string = urlSearch) {
  let tmpArr: Array<string> = [];
  const params: object = {};
  const urlArr: Array<string> = url.split('?');
  if (urlArr.length > 1) {
    tmpArr = urlArr[ 1 ].split('#')[ 0 ].split('&');
  }
  if (tmpArr.length > 0 && tmpArr[ 0 ] !== '') {
    tmpArr.forEach((item: string) => {
      const tmp = item.split('=');
      (params as any)[ tmp[ 0 ] ] = tmp[ 1 ];
    });
  }
  return params;
}

const urlParams = getUrlParams();

/**
 * 获取hash参数
 * 入参
 * {string} ：url链接，默认当期链接
 */
function getHashParams(url: string = urlHash): string {
  let tmp = '';
  const urlArr: Array<string> = url.split('#');
  if (urlArr.length > 1) {
    tmp = urlArr[ 1 ];
  }
  return tmp;
}

/**
 * 设置url参数
 * 入参
 * {string} {required} ：url链接，默认当期链接
 * {object} {required} ：参数对象
 * {string} ：hash值，默认空
 */
function setUrlParams(_url: string = urlHref, _params: object = {}, _hashParams: string = ''): string {
  let url = _url;
  const currentUrlParams = getUrlParams(url);
  const currentHashParams = getHashParams(url);
  const params = {
    ...currentUrlParams,
    ..._params
  };
  const hashParams = _hashParams || currentHashParams;
  const paramsArr = Object.keys(params).map((key) => {
    let str = key;
    const value = (params as any)[ key ];
    if (value != null) {
      str = `${key}=${value}`;
    }
    return str;
  });
  url = `${url.split('#')[ 0 ].split('?')[ 0 ]}`;
  if (paramsArr.length > 0) {
    url += `?${paramsArr.join('&')}`;
  }
  if (hashParams) {
    url += `#${hashParams}`;
  }
  return url;
}

function dataFormat(obj: object = {}): string {
  const arr = Object.keys(obj).map((key) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent((obj as any)[ key ])}`;
  });
  return arr.join('&');
}

/**
 * 简单请求，xhr
 * 入参
 * {string} {required} ：url地址
 * {object} ：参数对象
 * {string} ：请求类型，默认POST
 */
function xhr(url: string, params: object = {}, type: string = 'POST') {
  return new Promise((resolve, reject) => {
    const request: any = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200 || request.status === 304) {
          const resp = JSON.parse(request.responseText);
          resolve(resp);
        } else {
          reject();
        }
      }
    };
    const paramsStr = dataFormat(params);
    if (type === 'POST') {
      request.open('POST', encodeURI(url), true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.send(paramsStr);
    } else {
      request.open('GET', encodeURI(`${url}?${paramsStr}`), true);
      request.send(null);
    }
  });
}

interface scriptConfig extends Node {
  type?: string;
  id?: string;
  src?: string;
  [ propName: string ]: any
}

/**
 * 动态注入js
 * 入参
 * {string} {required} ：id
 * {object} {required} ：url地址
 */
function addScript(id: string, url: string) {
  return new Promise((resolve) => {
    let script: scriptConfig = document.getElementById(id);
    if (!script) {
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = id;
      script.src = url;
      document.body.appendChild(script);
      script.onload = () => {
        resolve();
      };
    } else {
      resolve();
    }
  });
}

/**
 * 获取UUID
 */
function getUUID(): string {
  let d = Date.now();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

/**
 * 时间格式化
 * 入参
 * {number} {required} ：时间戳
 * {string} ：格式类型，默认yyyy-MM-dd hh:mm:ss
 */
function formatDate(_date: number, _format: string = 'yyyy-MM-dd hh:mm:ss') {
  if (!_date) {
    return '';
  }
  const date = new Date(_date);
  const o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  let format = _format;
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length));
  }
  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1)
        ? (o[ k ])
        : ((`00${o[ k ]}`).substr((o[ k ].toString()).length)));
    }
  });
  return format;
}

export {
  device,
  isWX,
  isQQ,
  urlParams,
  getUrlParams,
  getHashParams,
  setUrlParams,
  xhr,
  addScript,
  getUUID,
  formatDate,
};
