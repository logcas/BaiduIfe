/**
 * @description todo-list 详细页面组件
 * 
 */

var detailComponent = (function () {

    var _data = {};

    return {
        template: function() {
            return `
            <div class="page">
            <div class="header">
                <div class="return" onclick="router.back(1);">返回</div>
                任务详情
            </div>
            <ul class="body">
                <li>${_data.name}</li>
                <li>${_data.time}</li>
                <li>${_data.content}</li>
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