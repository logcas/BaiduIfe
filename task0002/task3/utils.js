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

    var selectors = selector.split(' ');

    if (selectors.length === 0) return null;

    console.log(selectors);

    var i = 0,
        len = selectors.length;

    var hook = {
        '#': function (node, selector) {
            if(node.nodeType !== 1) return false;
            return node.id === selector.slice(1);
        },
        '.': function (node, selector) {
            if(node.nodeType !== 1) return false;
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
            if(node.nodeType !== 1) return false;
            var keyStart = selector.indexOf('-', 0),
                keyEnd = selector.indexOf('=', 0);
            return node.dataset[selector.slice(keyStart.keyEnd)] === selector.slice(keyEnd + 1, -1);
        },
        'tag': function (node, selector) {
            if(node.nodeType !== 1) return false;
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
            if(hook[preFix]) { 
                checkFn = hook[preFix];
            } else {
                checkFn = hook['tag'];
            }
            if (j === len-1 && checkFn(childs[k],selectors[j])) {
                console.log('get');
                return childs[k];
            } else if(j !== len-1 && checkFn(childs[k],selectors[j])) {
                target = search(childs[k],selectors,++j);
            } else {
                console.log('no match');
                target = search(childs[k],selectors,j);
            }
        }
        return target;
    }

    return search(document.body,selectors,i);

}