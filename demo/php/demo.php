<?php
/* get useragent
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
*/

$a = null;
var_dump(isset($a));

//echo strlen(null);

// function getBrowser(){
//     $agent=$_SERVER["HTTP_USER_AGENT"];
//     if(strpos($agent,'MSIE')!==false || strpos($agent,'rv:11.0')) //ie11判断
//     return "ie";
//     else if(strpos($agent,'Firefox')!==false)
//     return "firefox";
//     else if(strpos($agent,'Chrome')!==false)
//     return "chrome";
//     else if(strpos($agent,'Opera')!==false)
//     return 'opera';
//     else if((strpos($agent,'Chrome')==false)&&strpos($agent,'Safari')!==false)
//     return 'safari';
//     else
//     return 'unknown';
// }
 
// function getBrowserVer(){
//     if (empty($_SERVER['HTTP_USER_AGENT'])){    //当浏览器没有发送访问者的信息的时候
//         return 'unknow';
//     }
//     $agent= $_SERVER['HTTP_USER_AGENT'];   
//     if (preg_match('/MSIE\s(\d+)\..*/i', $agent, $regs))
//         return $regs[1];
//     elseif (preg_match('/FireFox\/(\d+)\..*/i', $agent, $regs))
//         return $regs[1];
//     elseif (preg_match('/Opera[\s|\/](\d+)\..*/i', $agent, $regs))
//         return $regs[1];
//     elseif (preg_match('/Chrome\/(\d+)\..*/i', $agent, $regs))
//         return $regs[1];
//     elseif ((strpos($agent,'Chrome')==false)&&preg_match('/Safari\/(\d+)\..*$/i', $agent, $regs))
//         return $regs[1];
//     else
//         return 'unknow';
// }
 
// print_r(getBrowser());
// print_r(getBrowserVer());
// echo '<br>'.$_SERVER["HTTP_USER_AGENT"];

