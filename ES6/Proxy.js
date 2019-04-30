/**
 * Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
 * Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
 * Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
 */
/**
 * 下面是 Proxy 支持的拦截操作一览，一共 13 种。
    get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo'] 第三个参数receiver，总是为当前的 Proxy 实例。
    
    set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
    
    has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
    
    deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
    
    ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
    
    getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
    
    defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
    
    preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
    
    getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
    
    isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
    
    setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
    
    apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
    
    construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
    
 */

/**
 * 如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错。
 */

/**
 * target是要拦截的对象，handler是拦截行为也是一个对象
 * @type {Proxy}
 */
var proxy = new Proxy(target,handler);

var proxy = new Proxy({},{
    get: function(target,property) {
        return 35;
    }
});
proxy.name; //35

/**
 * 下面的例子则是利用get拦截，实现一个生成各种 DOM 节点的通用函数dom。
 */
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);

/**
 * 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。
 * 主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。
 */
const target = {
  m: function () {
    debugger;
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true



