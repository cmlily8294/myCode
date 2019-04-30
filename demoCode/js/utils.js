/*this is my js code repository*/
/**
 * 去除两边空白
 */
util.trim = function(value) {
	return value ? value.toString().replace(/^\s|\s$/,'') : value;
}

/**
 * 检查电话号码类型
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
util.checkphone = function(value) {
	return /^\+?(86)?1\d{10}$/.test(value);
};

/**
 * 检查6到16位密码
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
util.checkpwd = function(value) {
	return /^[a-zA-Z0-9_+=\-@#~,.\[\]()!%^*$]+$/.test(value) && value.length>5 && value.length<17;
};

/**
 * 检查银行卡号
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
util.checkcard = function(value) {
	return /^\d{15,19}$/.test(value);
};
/**
 * 检查六位数字验证码
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
util.checkvcode = function(value) {
	return /^\d{6}$/.test(value);
};
util.checkleft = function(value) {
	return /(^0\.(0[1-9]|[1-9]\d*)$)|(^[1-9]\d*((\.\d{1,2})|\d*)$)/.test(value);
};
/**
 * 检查4位验证码
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
util.checkcode = function(value) {
	return /^[a-zA-Z0-9]{4}$/.test(value);
};

/**
 * 检查两位小数现金值
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
util.checkcash = function(value) {
	return /^\d+(\.\d{1,2})?$/g.test(value) && !isNaN(Number(value)) && Number(value)>0;
};
/**
 * 检查中文用户名
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
util.checkname = function(value) {
    return /^[\u4e00-\u9fa5]+$/.test(value) && value.length>1 && value.length<7;
};


/**
 * placeHolder for IE .et
 * 输入框透明提示 IE修复
 * 依赖jquery
 * @type {Object}
 */
util.JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            
            self.data("ori_type",self.attr("type"));
            if(self.attr("type") == "password"){
            	if($.support.leadingWhitespace){
            		self.attr("type","text");
            	}
            }
            self.val(txt);
			self.css("color","#B3AEAE");
            self.focus(function(){
            	if(self.data("ori_type") == "password"){
            		if($.support.leadingWhitespace){
            			self.attr("type","password");
            		}
	            }
				if($(this).val() == txt){
					$(this).val("");
					$(this).css("color","#000");
				}
			}).blur(function(){
				if($.trim($(this).val()) == ""){
					if(self.data("ori_type") == "password"){
						if($.support.leadingWhitespace){
							self.attr("type","text");
						}
		            }
					$(this).css("color","#B3AEAE");
					$(this).val(txt);
				}
			});
        });
    }
};

/**
 * 格式化数字,千分位逗号
 */
util.numFormat = function(nStr){
    nStr += '';  
    x = nStr.split('.');  
    x1 = x[0];  
    x2 = x.length > 1 ? '.' + x[1] : '';  
    var rgx = /(\d+)(\d{3})/;  
    while (rgx.test(x1)) {  
        x1 = x1.replace(rgx, '$1' + ',' + '$2');  
    }  
    return x1 + x2;
}

/**
 * 获取最近的某一天日期
 * @param  {[Number]} num [最近的第几天]
 * @return {[String]}     [description]
 */
util.getRecentDay = function (num,formatStr) {
    var n = num || 1;
    var f = formatStr || 'yyyy-MM-dd';
    var date = new Date();
    date.setDate(new Date().getDate()-n);
    return date.format(f);
};

/**
 * 日期格式化
 */
Date.prototype.format = function(f){
    var o ={
        "y+" : this.getFullYear(),
        "M+" : this.getMonth()+1, /*month*/
        "d+" : this.getDate(),    /*day*/
        "h+" : this.getHours(),   /*hour*/
        "m+" : this.getMinutes(), /*minute*/
        "s+" : this.getSeconds(), /*second*/
        "q+" : Math.floor((this.getMonth()+3)/3),  /*quarter*/
        "S" : this.getMilliseconds() /*millisecond*/
    }
    if(/(y+)/.test(f))f=f.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("("+ k +")").test(f))f = f.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));return f
};

/**
 * 获取cookie值
 * @param  {[type]} c_name
 */
util.getCookie = function (c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name+"=");
    if (c_start != -1) {
      c_start += c_name.length + 1;
      c_end = document.cookie.indexOf(";",c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      };
      return document.cookie.substring(c_start,c_end);
    };
  };
  return "";
}


/**
 * 设置cookie值
 * @param {[type]} c_name     [cookie名称]
 * @param {[type]} value      [cookie值]
 * @param {[type]} expiredays [失效时间]
 */
util.setCookie = function (c_name,value,expiredays){
  var exdate = new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie = c_name+ "=" + value+
  ((expiredays==null)? "" : ";expires=" + exdate.toGMTString());
};

/**
 * 监测是否是数组
 */
util.isArray = function (o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}


/**
 * 渲染echarts.js图表
 * Dependencies:
 * echarts.js
 * @param  {[String]} elementId [dom元素Id]
 * @param  {[Object]} options   [图表参数]
 */
util.renderChart = function (elementId,options) {
    var chartElement = document.getElementById(elementId);
    if (!chartElement) {
        console.error('function "util.renderChart" can not find Element: '+elementId);
        return;
    }
    if (!echarts) {
        console.error('function "util.renderChart" need echarts');
        return ;
    };
    //初始化echarts
    var chart = echarts.init(chartElement);
    if (options) {
        chart.setOption(options);
    }else{
        console.error('function "util.renderChart" can not find parameter: options');
    };
}

/**
 * 判断某元素是否在页面可见的jquery插件
 * @author cl
 * @return {[type]} [description]
 */
$.fn.visiable = function(){
    // 当页面滚动到元素位置上，该元素初始化
    var me = $(this),
        win = $(window),
        width = me.width(),
        height = me.height();

    if(win.scrollLeft()>me.offset().left+width) {//left
        return false;
    } else if(win.scrollLeft() + win.width() < me.offset().left) {//right
        return false;
    } else if(win.scrollTop() > me.offset().top + height) {//top
        return false;
    } else if(win.scrollTop() + win.height() < me.offset().top) {//bottom
        return false;
    } else {
        return true;
    }
};

//阻止事件冒泡
var move = function(e) {
    e.preventDefault && e.preventDefault();
    e.returnValue = false;
    e.stopPropagation && e.stopPropagation();
    return false;
}

//wap端取消禁止滚动
function remliste(ele) {
    ele.removeEventListener('touchmove', move);
}
//wap端禁止滚动
function addliste(ele) {
    ele.addEventListener('touchmove', move);
}


//作用域问题/////////////////
window.val = 1;
var json = {
     val:10,
     dbl: function () {
         this.val*=2;
   }
};
json.dbl();
var dbl = json.dbl;
dbl();
json.dbl.call(window);
alert(window.val+json.val)
//////////////////////////////

//////对象深度复制
var deepCopy= function(source) { 
var result={};
for (var key in source) {
      result[key] = typeof source[key]===’object’? deepCoyp(source[key]): source[key];
   } 
   return result; 
}
//////////////////

/**
* 返回顶部插件
*/
$.fn.goToTop = function(obj){
    var defaultObj={
            fn : function(){},
            static : false,
            ele : document.body.scrollTop ? $(document.body) : $(document.documentElement),
            eletop : 0
        },
        options = $.extend({},obj,defaultObj);
    $(this).click(function(){
        options.ele = document.body.scrollTop ? $(document.body) : $(document.documentElement);
        options.ele.animate({scrollTop:0},{easing: 'swing',duration: 600, complete: function(){
            options.static = false;
        },step: function(num){
            options.static = true;
            options.eletop = num;        
        }});
        options.fn();
    });
    $(window).scroll(function(){
        if(options.static == true && options.ele.scrollTop() > options.eletop){
           options.ele.stop(); //如果滚动条触发事件，则停止动画
        }
    });
}
///////////////

///判断浏览器///
ie678 = !+"\v1" ;
ie678 = !-[1,];//IE9预览版中失效
ie678 ='\v'=='v' ;
ie678 = ('a~b'.split(/(~)/))[1] == "b"
ie678 = 0.9.toFixed(0) == "0"
IE8 = window.toStaticHTML
IE9 = window.msPerformance 
ie = !!document.recalc
ie = !!window.VBArray
ie = !!window.ActiveXObject
ie678 = 0//@cc_on+1;
ie = !!window.createPopup;
ie = /*@cc_on!@*/!1;
ie = document.expando;//document.all在opera firefox的古老版本也存在
ie = /\w/.test('\u0130') //由群里的abcd友情提供

ie6 = !"1"[0] //利用IE6或IE5的字符串不能使用数组下标的特征
ie8 = !!window.XDomainRequest;
ie9 =  document.documentMode && document.documentMode === 9;
//自创，基于条件编译的嗅探脚本，IE会返回其JS引擎的版本号，非IE返回0
var ieVersion = eval("''+/*@cc_on"+" @_jscript_version@*/-0")*1
ie9 = ieVersion === 5.9
ie8 = ieVersion === 5.8
ie7 = ieVersion === 5.7
ie6 = ieVersion === 5.6
ie5 = ieVersion === 5.5
//https://developer.mozilla.org/En/Windows_Media_in_Netscape
netscape = !!window.GeckoActiveXObject 
gecko  = !!window.netscape //包括firefox
firefox = !!window.Components
firefox = !!window.updateCommands
firefox = !!window.sidebar
safari = !!(navigator.vendor && navigator.vendor.match(/Apple/))
safari = window.openDatabase && !window.chrome;
chrome= !!(window.chrome && window.google)
opera=!!window.opera ;
//傲游2 3
maxthon = /maxthon/i.test(navigator.userAgent)
//360安全浏览器
is360se = /360se/i.test(navigator.userAgent)
//////////////////////////////////////////////////////////

/*
 * 简单的秒单位倒计时实现
*/
util.countDown = function(op) {
    
    if(!op || !op.obj || op.obj.length<1) return;
    
    if(!(this instanceof util.countDown)) {
        return new util.countDown(op);
    }
    
    var me = this;
    //TODO 去除Jquery的$.extend
    me.op = $.extend({
        start: 60
        , startEl: ''
        , endEl: ''
        , property: 'html'
    }, op);

    me.st = new Date().getTime();
    me.span = me.st;
    me.cur = me.op.start;   
    var _c = [];

    var _cd = function(){
    
        me.op.obj[me.op.property](me.op.startEl + (me.cur<10&&me.cur>0 ? '0'+me.cur : me.cur) + me.op.endEl);
        
        var _td = new Date(),
            _temp = _td.getTime(),
            _span = _temp - me.st;

        if(_span < me.op.start*1000 && _temp-me.span>1000) {
            me.cur = me.op.start - Math.floor(_span/1000);
            me.span = _temp;
        }
        if(_span >= me.op.start*1000) {
            me.cur = 0;
            while(_c && _c.length>0) {
                util.clearrqa(_c.pop());
            }
            typeof me.op.callback == 'function' && me.op.callback();
            return ;
        }
        _c.push(util.rqa(_cd, 1000));
    }
    _cd();
};
///////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * 数字从小到大跑
 */
util.numberSpark = function(obj, startEl, endEl, dot) {
    
    var o = $(obj ? obj : '');

    if(o.length < 1) return;
    
    if(!(this instanceof util.numberSpark)) {
        return new util.numberSpark(obj, startEl, endEl, dot);
    }
        
    var that = this;

    that.obj = o,
    that.no = that.obj.data('spark');

    that.arr = [];

    if(isNaN(that.no)) {return false;}

    that.frag = '',
    that.intv = 0,
    that.flag = 0,
    that.sn = '';

    for(var l=that.no.toString().length,i=l-1;i>=0;i--) {
        that.sn = that.no.toString().charAt(i);
        that.arr.push(that.sn);
    }

    that.spark = function() {
        that.frag = '';
        if(that.flag > 9) {
            clearTimeout(that.intv);
            that.obj.attr('spark-done', true);
            return;
        }
        for(var l=that.arr.length,i=l-1; i>=0; i--) {
            that.arr[i] = Number(that.arr[i]);
            that.arr[i] = that.arr[i]+1>9 ? 0 : (that.arr[i] + 1);
            that.frag += (startEl||'') + that.arr[i] + (endEl||'');
            if(dot && i%3==0 && i!=0) {
                that.frag += dot;
            }
        }
        that.obj.html();
        that.obj.html(that.frag);
        that.flag++;
        that.intv = setTimeout(that.spark, 40);
    }
};

function getUrlParams(url) {
    url = url || window.location.search;
    var tmpArr = [];
    var params = {};
    var urlArr = url.split('?');
    if (urlArr.length > 1) {
        tmpArr = urlArr[1].split('#')[0].split('&');
    }
    if (tmpArr.length > 0 && tmpArr[0] !== '') {
        for (var i = 0; i < tmpArr.length; i++) {
            var tmp = tmpArr[i].split('=');
            params[tmp[0]] = tmp[1];
        }
    }
    return params;
};


/**
 * 获取最近时间格式化
 * @param {number} time
 */
function recentFormat(time) {
  if (!time) {
    return '';
  }
  const now = new Date().getTime();
  const todayTime = new Date(new Date().toLocaleDateString()).getTime();
  const diffHour = Math.floor((now - time) / 3600000);
  if (diffHour < 1) {
    return '刚刚';
  } else if (diffHour < 10) {
    return `${diffHour}小时以前`;
  } else if (time >= todayTime) {
    return '今天';
  } else if (time >= todayTime - 86400000) {
    return '昨天';
  }
  return utils.formatDate(time, 'yyyy年MM月dd日');
}

/**
 * 获取随机数
 * @return {[type]} [description]
 */
function getUUID() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

