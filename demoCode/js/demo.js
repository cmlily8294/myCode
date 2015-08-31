/*this is my js code repository*/
/**
 * 去除两边空白
 */
Util.trim = function(value) {
	return value ? value.toString().replace(/^\s|\s$/,'') : value;
}

/**
 * 检查电话号码类型
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
Util.checkphone = function(value) {
	return /^\+?(86)?1\d{10}$/.test(value);
};

/**
 * 检查6到16位密码
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
Util.checkpwd = function(value) {
	return /^[a-zA-Z0-9_+=\-@#~,.\[\]()!%^*$]+$/.test(value) && value.length>5 && value.length<17;
};

/**
 * 检查银行卡号
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
Util.checkcard = function(value) {
	return /^\d{15,19}$/.test(value);
};
/**
 * 检查六位数字验证码
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
Util.checkvcode = function(value) {
	return /^\d{6}$/.test(value);
};
Util.checkleft = function(value) {
	return /(^0\.(0[1-9]|[1-9]\d*)$)|(^[1-9]\d*((\.\d{1,2})|\d*)$)/.test(value);
};
/**
 * 检查4位验证码
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
Util.checkcode = function(value) {
	return /^[a-zA-Z0-9]{4}$/.test(value);
};

/**
 * 检查两位小数现金值
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
Util.checkcash = function(value) {
	return /^\d+(\.\d{1,2})?$/g.test(value) && !isNaN(Number(value)) && Number(value)>0;
};
/**
 * 检查中文用户名
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
Util.checkname = function(value) {
    return /^[\u4e00-\u9fa5]+$/.test(value) && value.length>1 && value.length<7;
};


/**
 * placeHolder for IE .et
 * 输入框透明提示 IE修复
 * 依赖jquery
 * @type {Object}
 */
Util.JPlaceHolder = {
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
Util.numFormat = function(nStr){
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
Util.getRecentDay = function (num,formatStr) {
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
Util.getCookie = function (c_name) {
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
Util.setCookie = function (c_name,value,expiredays){
  var exdate = new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie = c_name+ "=" + value+
  ((expiredays==null)? "" : ";expires=" + exdate.toGMTString());
};

/**
 * 监测是否是数组
 */
Util.isArray = function (o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}


/**
 * 渲染echarts.js图表
 * Dependencies:
 * echarts.js
 * @param  {[String]} elementId [dom元素Id]
 * @param  {[Object]} options   [图表参数]
 */
Util.renderChart = function (elementId,options) {
    var chartElement = document.getElementById(elementId);
    if (!chartElement) {
        console.error('function "Util.renderChart" can not find Element: '+elementId);
        return;
    }
    if (!echarts) {
        console.error('function "Util.renderChart" need echarts');
        return ;
    };
    //初始化echarts
    var chart = echarts.init(chartElement);
    if (options) {
        chart.setOption(options);
    }else{
        console.error('function "Util.renderChart" can not find parameter: options');
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

