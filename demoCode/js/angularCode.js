//配置http,解决$http发送post请求时，服务端不能获取数据问题
//在php中有一个更简单的办法：$_POST = json_decode(file_get_contents('php://input'), true);
app.config(function ($httpProvider) {
	$httpProvider.defaults.transformRequest = function (data) {
		var query = '', name, value;
        if (data instanceof Object) {
            for(key in data) {
                name = key;
                value = data[key];
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';                   

            }
            return query;
        } else {
            return data;
            
        }
	}
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
})
