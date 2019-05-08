function createHttpRequest() {
    var httpRequest = null;
    //针对IE7,火狐,谷歌等其他浏览器
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
        //针对某些特定版本的mozillar浏览器的BUG进行修正
        /*
            如果来自服务器的响应没有 XML mime-type 头部，则一些版本的 Mozilla 浏览器不能正常运行。
            对于这种情况，httpRequest.overrideMimeType('text/xml'); 语句将覆盖发送给服务器的头部，强制 text/xml 作为 mime-type。
        */
        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType("text/xml");
        }
        return httpRequest;
    }
    //针对IE5,IE6浏览器
    if (window.ActiveXObject) {
        try {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (ex) {
                alert("创建XMLHTTPRequest对象失败!");
            }
        }
    }
    return httpRequest;
}

function callServer() {
    var http_request = createHttpRequest();
    if (http_request == null) {
        return;
    }
    /*
    在 open() 的第三个参数中使用了 "true"。
    该参数规定请求是否异步处理。
    True 表示脚本会在 send() 方法之后继续执行，而不等待来自服务器的响应，即异步请求。
    通过把该参数设置为 "false"，可以省去额外的 onreadystatechange 代码。如果在请求失败时是否执行其余的代码无关紧要，那么可以使用这个参数。
     */
    http_request.open("GET", "http://data.itouzi.com/dataSystem/dataSystem/sitealldata?flag=platform&st=2014-01-02&et=2015-09-02", true);

    //刚刚看你的消息请求头里是text/html,如果只是获取数据的话，就改为application/json吧
    http_request.setRequestHeader("Accept", "application/json");
    http_request.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    //向服务器发送请求
    http_request.send();
    //当readyState属性改变的时候调用的事件句柄函数。当 readyState 为 3 时，它也可能调用多次。
    http_request.onreadystatechange = function() {
        //HTTP 请求的状态.当一个 XMLHttpRequest 初次创建时，这个属性的值从 0 开始，直到接收到完整的 HTTP 响应，这个值增加到 4
        if (http_request.readyState == 4) {
            //指定了请求的 HTTP 的状态代码(200表示正常,404表示未找到)
            if (http_request.status == 200) {
                alert(http_request.responseText);
            }
        }
    }
}