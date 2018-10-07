window.onload = function () {
    var banner = new Banner('#ban', 'order', 4000, true);
    banner.show();
}

    ; (function (window) {

        // 创建下方选择点
        function createOptions(node) {
            var options = document.createElement('div');
            options.className = 'options';
            var len = node.children.length,
                i = 0;
            for (; i < len; ++i) {
                var option = document.createElement('div');
                option.className = 'options-item';
                option.setAttribute('data-index', i);
                options.appendChild(option);
            }
            node.appendChild(options);
            return options;
        }

        class Banner {
            constructor(selector, order, intervals, repet) {
                if (!selector) {
                    throw new Error('selector must be provided.');
                }
                this.node = $(selector); // banner所在节点
                this.options = createOptions(this.node); // 圆点
                this.onShow = 0; // 当前播放索引
                this.order = order || 'disorder'; // 顺序
                this.intervals = intervals || 2000; // 间隔
                this.repet = repet || true; // 是否重复
                this.controller = null; // timeout控制器
                this.zIndex = 1;

                
                // 事件委托
                $.delegate(selector + ' .options', 'div', 'click', (function (that) {
                    return function (e) {
                        var t = e.srcElement || e.target;
                        that.show(t.dataset.index);
                    }

                })(this));

            }

            show(next) {
                var i = 0,
                    lis = [];
                for (; i < this.node.children.length; ++i) {
                    if (this.node.children[i].tagName.toLowerCase() === 'li') {
                        lis.push(this.node.children[i]);
                    }
                }

                var len = lis.length,
                    last = this.onShow,
                    animate = '';

                if (this.order === 'order') {
                    next = next || (last + 1) % len;
                    animate = 'slide-to-left';
                }

                if (this.order === 'disorder') {
                    next = next || last === 0 ? len - 1 : last - 1;
                    animate = 'slide-to-right';
                }

                for (i = 0; i < len; ++i) {
                    // 更改banner class
                    var className = lis[i].className;
                    className = className.split(' ');
                    className = className.filter(el => {
                        return el != animate;
                    });
                    lis[i].className = className.join(' ');
                    // 更改小圆点 class
                    className = this.options.children[i].className;
                    className = className.split(' ');
                    className = className.filter(el => {
                        return el != 'select';
                    });
                    this.options.children[i].className = className;
                }
                var zIndex = this.zIndex++;
                lis[next].style.zIndex = zIndex;
                lis[next].className += ' ' + animate;
                this.options.children[next].className += ' ' + 'select';
                this.options.style.zIndex = zIndex;

                this.onShow = next;

                if (!this.repet) return;

                if(this.controller) {
                    clearTimeout(this.controller);

                }

                this.controller = setTimeout(() => {
                    this.show.call(this);
                }, this.intervals);
            }

        }

        window.Banner = Banner;

    })(window);