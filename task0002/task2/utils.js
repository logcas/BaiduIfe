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
