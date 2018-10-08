/**
 * @author Lucas
 * @name Drag v0.9.9
 * @description 原生JS实现拖拽
 * 
 * 
 */

; (function (window) {

    // 事件处理程序
    function addEventMonitor(elem, event, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(event, handler, false);
        } else if (elem.attchEvent) {
            elem.attchEvent('on' + event, handler);
        } else {
            elem['on' + event] = handler;
        }
    }

    // 移除事件处理程序
    function removeEventMonitor(elem, event, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(event, handler, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + event, handler);
        } else {
            elem['on' + event] = null;
        }
    }

    // 获取事件
    function getEvent(e) {
        return e ? e : window.event;
    }

    // 鼠标点击对象
    function mouseDown(e) {
        this.mousedown = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
    }

    // 鼠标移动
    function mouseMove(e) {
        if (this.mousedown) {
            var e = getEvent(e);
            var offsetX = e.clientX - this.startX,
                offsetY = e.clientY - this.startY;
            this.startX = e.clientX;
            this.startY = e.clientY;
            this.posX += offsetX;
            this.posY += offsetY;
            this.elem.style.top = this.posY + 'px';
            this.elem.style.left = this.posX + 'px';
        }
    }

    // 鼠标释放
    function mouseUp(e) {
        if (this.mousedown) {
            this.mousedown = false;
            checkMousePosition(this.elem,e,this);
        }
    }

    // 容器
    var containers = [];

    // 施放鼠标时检测鼠标位置
    function checkMousePosition(elem,e,that) {
        var posX = e.clientX,
            posY = e.clientY,
            targetNode = null;

        containers.forEach(el => {
            var rect = getContainerRect(el);
            if(posX > rect.left && posX < rect.right && posY > rect.top && posY < rect.bottom) {
                targetNode = el;
            }
        });

        if(targetNode) {
            targetNode.appendChild(elem);
        }

        elem.style.top = 0 + 'px';
        elem.style.left = 0 + 'px';

        that.posX = 0;
        that.posY = 0;
    }

    // 获取元素的矩形范围
    function getContainerRect(node) {
        var rect = node.getBoundingClientRect(),
            top = rect.top,
            left = rect.left,
            height = rect.height,
            width = rect.width;
        return {
            top,
            left,
            bottom: top + height,
            right: left + width
        }
    }

    class Drag {
        constructor(elem) {
            if (typeof elem !== 'object') {
                throw new Error('拖拽目标必须是一个对象');
            }
            // 获取起始点
            this.posX = parseInt(elem.style.left) || 0;
            this.posY = parseInt(elem.style.top) || 0;
            this.startX = 0;
            this.startY = 0;
            this.mousedown = false;
            this.elem = elem;
            this.elem.style.position = 'relative';

            this.mouseDown = e => mouseDown.call(this, e);
            this.mouseMove = e => mouseMove.call(this, e);
            this.mouseUp = e => mouseUp.call(this, e);

            this.monitor();
        }

        monitor() {
            addEventMonitor(this.elem, 'mousedown', this.mouseDown);
            addEventMonitor(window, 'mousemove', this.mouseMove);
            addEventMonitor(window, 'mouseup', this.mouseUp);
        }

        destroy() {
            removeEventMonitor(this.elem, 'mousedown', this.mouseDown);
            removeEventMonitor(window, 'mousemove', this.mouseMove);
            removeEventMonitor(window, 'mouseup', this.mouseUp);
        }

        static addContainer(c) {
            containers.push(c);
        }

        static showContainer() {
            return containers;
        }

    }

    // 暴露
    window.Drag = Drag;

})(window);