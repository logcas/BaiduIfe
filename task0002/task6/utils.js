/**
 * 
 * @param options 是一个对象，里面可以包括的参数为：
 * @param type: post或者get，可以有一个默认值
 * @param data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
 * @param onsuccess: 成功时的调用函数
 * @param onfail: 失败时的调用函数
 * 
 */

function ajax(url, options) {

    function addParams(url,name,val) {
        url.indexOf('?') === -1 ? url += '&' : url += '?';
        url += encodeURIComponent(name) + '=' + encodeURIComponent(val);
        return url;
    }

    // IE7+\Chrome\FireFox\Safari
    var xhr = new XMLHttpRequest(),
        type = options.type || 'get',
        url = options.url,
        data = null;

    if(!url) throw new Error('url must be provided.');
    if(type === 'get') {
        if(options.data) {
            for(name in data) {
                url = addParams(url,name,data[name]);
            }
        }
    } else if(type === 'post') {
        data = options.data;
    }

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            // 304为缓存
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                if(options.onsuccess) {
                    options.onsuccess(xhr.responseText,xhr);
                }
            } else {
                if(options.onfail) {
                    options.onfail(xhr.status);
                }
            }
        }
    }
    xhr.open(type,url,true);
    xhr.send(data);
}