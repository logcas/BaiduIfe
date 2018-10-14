/**
 * @description todo-list 首页组件
 * 
 */


var indexComponent = (function () {

    var _data = {
        pageName: 'todo-list',
    };

    return {
        template: function() {
            return `<div class="page">
            <div class="header">${_data.pageName}</div>
            <ul class="body">
                <li><a href="#/1">${_data.list[0].name}</a></li>
                <li><a href="#/2">${_data.list[1].name}</a></li>
            </ul>
            </div>`
        },
        inject(data) {
            for(key in data) {
                _data[key] = data[key];
            }
        }
    }

})();