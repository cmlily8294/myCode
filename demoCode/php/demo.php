
$useragent = strtolower($_SERVER["HTTP_USER_AGENT"]);     
// ipad  
$is_ipad = strripos($useragent,'ipad');
// iphone  
$is_iphone = strripos($useragent,'iphone');  
// android  
$is_android = strripos($useragent,'android');
// ucbrowser is shit
$is_uc = strripos($useragent, 'ucbrowser');
// android installed uc browser
$is_android_uc = ereg('^ucweb.*adr',$useragent);
// weixin internal browser
$is_weixin = strripos($useragent,'MicroMessenger');