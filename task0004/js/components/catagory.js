/**
 * @description todo-list 分类页面组件
 * 
 */

var catagoryComponent = (function () {

    var _data = {};

    return {
        template: function() {
            return `
            <div class="page">
            <div class="header">
                <div class="return"><a href="#/">返回</a></div>
                ${_data.catagory.name}
            </div>
            <ul class="body">
                <li><a href="#/${_data.folder}/1">${_data.catagory.tasks[0].name}</a></li>
                <li><a href="#/${_data.folder}/2">${_data.catagory.tasks[1].name}</a></li>
            </ul>
        </div>
        `
        },
        inject(data) {
            for(key in data) {
                _data[key] = data[key];
            }
        }
    }

})();