/**
 * 
 *  @name SPA-router
 *  @author Lucas
 *  @description 单页SPA路由，仅支持一级路由
 * 
 */

 //TODO: 好鬼多bug。。。有空就修

; (function () {

    var _routerView = null; // 路由视图

    var history = [], // 路由历史
        current = -1, // 当前映射
        routes = {}; // 路由映射

    // 渲染页面
    var render = () => {
        if (routes[history[current]].callback) {
            routes[history[current]].callback.call(routes[history[current]].component);
        }
        if(routes[history[current]].data) {
            routes[history[current]].component.inject(routes[history[current]].data);
        }
        _routerView.innerHTML = routes[history[current]].component.template();
    }

    // hashchange事件处理函数
    var hashChange = (e) => {
        console.log('change');
        var hash = window.location.hash.slice(1);
        if (routes[hash]) {
            history.push(hash);
            current = history.length - 1;
            render();
        }
    }

    // 手动设置hash
    var setHash = (hash) => {
        window.location.hash = '#' + hash;
    }

    class Router {

        /**
         * @param routerView => 绑定的路由视图
         */

        constructor(routerView) {
            if (typeof routerView !== 'object') {
                throw new Error('路由视图必须是一个DOM对象');
            }
            _routerView = routerView;
            window.addEventListener('hashchange',hashChange);
            window.addEventListener('load',hashChange);
        }

        // 建立路由映射
        map(path, component, data, callback) {
            if (typeof path !== 'string') {
                throw new Error('路由 path 配置不正确');
            }
            routes[path] = {
                component: component,
                data: data,
                callback: callback 
            }
        }

        // 移除映射
        removeMap(path) {
            if (routes[path]) {
                routes[path] = null;
            }
        }

        // 指定路由
        push(path) {
            var r = routes[path];
            if (r) {
                history.push(path);
                current = history.length - 1;
                setHash(history[current]);
                render();
            }
        }

        // 路由前进
        go(steps) {
            if (typeof steps !== 'number' || steps <= 0) {
                throw new Error('go() 前进必须基于一个number类型的param，且大于0');
            }
            current = current + steps > history.length - 1 ? history.length - 1 : current + steps;
            setHash(history[current]);
            render();
        }

        // 路由返回
        back(steps) {
            if (typeof steps !== 'number' || steps <= 0) {
                throw new Error('back() 前进必须基于一个number类型的param，且大于0');
            }
            current = current - steps < 0 ? 0 : current - steps;
            setHash(history[current]);
            render();
        }

    }

    window.Router = Router;

})(window);