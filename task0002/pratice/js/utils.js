/**
 * 
 * @description 任务1-6的utils整合
 * 
 * 
 */

 // 判断是否为数组
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

// 判断是否为函数
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
    // return typeof fn === 'function';
}

// 对象深拷贝
function cloneObject(src) {
    // 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。
    if(typeof src !== 'object') {
        return src;
    }
    if(isArray(src)) {
        return src.slice(0);
    }
    var des = {};
    for(k in src) {
        des[k] = cloneObject(src[k]);
    }
    return des;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // common solution
    var i = 0,
        len = arr.length,
        newArr = [],
        exist = false;
    for(;i<len;++i) {
        newArr.forEach(el => {
            if(el === arr[i]) {
                exist = true;
            }
        });
        if(!exist) newArr.push(arr[i]);
        exist = false;
    }
    return newArr;

    // ES6
    // return [...new Set(arr)];
}

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var start = 0,
        end = str.length,
        i = 0,
        len = str.length;
    for(;i<len;++i) {
        if(str[i] !== ' ') {
            start = i;
            break;
        }
    }
    i = len - 1;
    for(;i>start;--i) {
        if(str[i] !== ' ') {
            end = i + 1;
            break;
        }
    }
    return str.slice(start,end);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s*|\s*$/g,'');
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    var len = arr.length,
        i = 0;
    for(;i < len;++i) {
        fn(arr[i],i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    return Object.keys(obj).length;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return /^1[0-9]{10}$/.test(phone);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var classList = element.className.split(' ');
    classList.push(newClassName);
    element.className = classList.join(' ');
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var classList = element.className.split(' ');
    classList = classList.filter(el => {
        return el !== oldClassName;
    });
    element.className = classList.join(' ');
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // 先获得scrollTop和scrollLeft
    var scrollTop,
        scrollLeft;
    // 标准模式
    if (document.documentElement) {
        scrollTop = document.documentElement.scrollTop;
        scrollLeft = document.documentElement.scrollLeft;
    } else {
        // IE6- 混杂模式
        scrollTop = document.body.scrollTop;
        scrollLeft = document.body.scrollLeft;
    }

    // 再获得元素的位置
    var elemTop = element.getBoundingClientRect().top,
        elemLeft = element.getBoundingClientRect().left;

    // 差值，返回
    return {
        x: elemLeft - scrollLeft,
        y: elemTop - scrollTop
    };
}

// 实现一个简单的Query
function $(selector) {
    console.log(typeof selector);

    var selectors = selector.split(' ');

    if (selectors.length === 0) return null;

    var i = 0,
        len = selectors.length;

    var hook = {
        '#': function (node, selector) {
            if (node.nodeType !== 1) return false;
            return node.id === selector.slice(1);
        },
        '.': function (node, selector) {
            if (node.nodeType !== 1) return false;
            var classList = node.className.split(' '),
                isMatch = false;
            var len = classList.length,
                i = 0;
            for (; i < len; ++i) {
                if (selector.slice(1) === classList[i]) {
                    isMatch = true;
                    break;
                }
            }
            return isMatch;
        },
        '[': function (node, selector) {
            if (node.nodeType !== 1) return false;
            var keyStart = selector.indexOf('-', 0),
                keyEnd = selector.indexOf('=', 0);
            return node.dataset[selector.slice(keyStart.keyEnd)] === selector.slice(keyEnd + 1, -1);
        },
        'tag': function (node, selector) {
            if (node.nodeType !== 1) return false;
            return node.tagName.toLowerCase() === selector.toLowerCase();
        }
    };

    function search(parent, selectors, j) {
        if (parent.childNodes.length === 0) return null;
        var childs = parent.childNodes,
            childsLength = parent.childNodes.length;

        var target = null;
        for (let k = 0; k < childsLength && target == null; ++k) {
            var checkFn = null;
            var preFix = selectors[j][0];
            if (hook[preFix]) {
                checkFn = hook[preFix];
            } else {
                checkFn = hook['tag'];
            }
            if (j === len - 1 && checkFn(childs[k], selectors[j])) {
                return childs[k];
            } else if (j !== len - 1 && checkFn(childs[k], selectors[j])) {
                target = search(childs[k], selectors, ++j);
            } else {
                target = search(childs[k], selectors, j);
            }
        }
        return target;
    }

    return search(document.body, selectors, i);

}

// 封装 $方法
$.on = function(selector, event, listener) {
    var element = $(selector);
    if(element === null) {
        throw new Error('element is not exists.');
    }
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        // IE
        element.attachEvent('on' + event, listener);
    } else {
        element['on' + event] = listener;
    }
}

$.click = function(selector, listener) {
    $.on(selector,'click',listener);
}

$.un = function(selector, event, listener) {
    var element = $(selector);
    if(element === null) {
        throw new Error('element is not exists.');
    }
    if (element.removeEventListener) {
        element.removeEventListener(event, listener);
    } else if (element.detachEvent) {
        element.detachEvent('on' + event, listener);
    } else {
        element['on' + event] = null;
    }
}

$.delegate = function(selector, tag, event, listener) {
    $.on(selector, event, function (e) {
        e = e || window.event;
        var target = e.srcElement || e.target;
        if (target.tagName.toLowerCase() === tag.toLowerCase()) {
            listener(e);
        }
    });
}

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