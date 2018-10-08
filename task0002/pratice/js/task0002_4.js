var data = [
    'hello', 'helloworld', 'goodbye', 'goodboy', 'hi'
]

window.onload = function () {

    var input = $('#myinput');
    var inputPos = {};
    var selectIndex = -1;

    var tips = document.createElement('ul');
    tips.className = 'input-tips';
    tips.id = 'mytips';
    document.body.appendChild(tips);

    function addTips(parent, text) {
        var t = document.createElement('li');
        t.innerHTML = text;
        parent.appendChild(t);
    }

    function showTips() {
        tips.style.top = inputPos.y;
        tips.style.left = inputPos.x;
        tips.style.display = 'block';
    }

    function getData(text) {
        var texts = [];
        data.forEach(el => {
            if (el.indexOf(text) !== -1) {
                var str = '<span class="match">' + text + '</span>';
                el = el.slice(el.indexOf(text) + text.length);
                str += el;
                texts.push(str);
            }
        });
        texts.sort((a, b) => {
            return a.length > b.length;
        });
        return texts;
    }

    function changeSelection(e) {
        if (tips.style.display === 'none') return;
        var i = 0,
            len = tips.children.length;
        e = window.event || e;
        selectIndex = e.keyCode === 38 ? selectIndex - 1 : selectIndex + 1;
        if (selectIndex >= len) {
            selectIndex = len - 1;
            return;
        }
        if (selectIndex < 0) {
            selectIndex = 0;
            return;
        }
        for (; i < len; ++i) {
            var className = tips.children[i].className;
            className = className.split(' ');
            className = className.filter(el => {
                return el !== 'select';
            });
            tips.children[i].className = className.join(' ');
        }
        tips.children[selectIndex].className += ' ' + 'select';
    }

    var isEditing = false;

    $.on('#myinput', 'keyup', function (e) {
        e = window.event || e;
        if (e.keyCode === 38 || e.keyCode === 40) {
            changeSelection(e);
        } else if (e.keyCode === 13) {
            if(tips.style.display === 'none') return;
            var val = tips.children[selectIndex].innerHTML;
            input.value += val.slice(val.indexOf('</span>') + 7);
            tips.style.display = 'none';
        } else {
            isEditing = false;
            var target = e.srcElement || e.target;
            var text = target.value;
            if (text === '') return;
            var texts = getData(text);
            tips.innerHTML = '';
            texts.forEach(el => {
                addTips(tips, el);
            });
            setTimeout(function () {
                if (isEditing == false) {
                    showTips();
                }
            }, 500);
        }

    });

    $.on('#myinput', 'keydown', function (e) {
        isEditing = true;

    });

    $.on('#myinput', 'focus', function (e) {
        var rect = e.target.getBoundingClientRect();
        inputPos.y = rect.y + rect.height + 'px';
        inputPos.x = rect.x + 'px';
    });

    $.on('body', 'click', function (e) {
        tips.style.display = 'none';
    });

    $.delegate('#mytips', 'li', 'click', function (e) {
        var val = e.target.innerHTML;
        input.value += val.slice(val.indexOf('</span>') + 7)
    });

}