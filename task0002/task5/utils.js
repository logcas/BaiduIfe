// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var userAgent = window.navigator.userAgent;
    // 先判断是否为IE
    var isIE = userAgent.indexOf('Trident');
    if(isIE === -1) return -1;
    // 再判断是否为IE11
    var isIE11 = /rv:(\d+)./.exec(userAgent);
    if(isIE11 && isIE11[1] == 11) return 11;
    // 然后再判断是IE什么版本
    var IEVer = /MSIE (\d+).(\d+)/.exec(userAgent);
    return IEVer[1];
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText = encodeURIComponent(cookieName) + '=' + encodeURIComponent(cookieValue);
    if(expiredays instanceof Date) {
        cookieText += ';expires=' + expiredays.toGMTString();
    }
    document.cookie = cookieText;
}

// 获取cookie值
function getCookie(cookieName) {
    var cookieStart = document.cookie.indexOf(encodeURIComponent(cookieName) + '=');
    if(cookieStart === -1) return '';
    var cookieEnd = document.cookie.indexOf(';',cookieStart);
    if(cookieEnd === -1) cookieEnd = document.cookie.length;
    var cookieValue = document.cookie.slice(cookieStart + encodeURIComponent(cookieName).length + 1,cookieEnd);
    return decodeURIComponent(cookieValue);
}

