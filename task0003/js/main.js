var data = [
    {
        folder_name: '毕业设计',
        child_folders: [
            {
                folder_name: '程序设计',
                tasks: [
                    {
                        task_name: 'todo-1',
                        task_date: '2018-10-08',
                        task_content: '这是程序设计任务内容1',
                        has_done: 1,
                    },
                    {
                        task_name: 'todo-2',
                        task_date: '2018-10-09',
                        task_content: '这是程序设计任务内容2',
                        has_done: 0,
                    },
                    {
                        task_name: 'todo-3',
                        task_date: '2018-10-12',
                        task_content: '这是程序设计任务内容3',
                        has_done: 0,
                    },
                ]
            },
            {
                folder_name: '程序设计2',
                tasks: [
                    {
                        task_name: 'todo-1',
                        task_date: '2018-10-08',
                        task_content: '这是程序设计2任务内容1',
                        has_done: 1,
                    },
                    {
                        task_name: 'todo-2',
                        task_date: '2018-10-09',
                        task_content: '这是程序设计2任务内容2',
                        has_done: 0,
                    },
                    {
                        task_name: 'todo-3',
                        task_date: '2019-10-10',
                        task_content: '这是程序设计2任务内容3',
                        has_done: 0,
                    },
                ]
            },
        ]
    },
    {
        folder_name: 'XX设计',
        child_folders: [
            {
                folder_name: 'XXXX设计',
                tasks: [
                    {
                        task_name: 'todo-1',
                        task_date: '2018-10-08',
                        task_content: '这是XXXX设计任务内容1X',
                        has_done: 1,
                    },
                    {
                        task_name: 'todo-2',
                        task_date: '2018-10-20',
                        task_content: '这是XXXX设计任务内容2X',
                        has_done: 0,
                    },
                    {
                        task_name: 'todo-3',
                        task_date: '2018-10-10',
                        task_content: '这是XXXX设计任务内容3X',
                        has_done: 0,
                    },
                ]
            },
            {
                folder_name: '程序设计9',
                tasks: [
                    {
                        task_name: 'todo-1',
                        task_date: '2018-10-08',
                        task_content: '这是程序设计9任务内容1',
                        has_done: 1,
                    },
                    {
                        task_name: 'todo-2',
                        task_date: '2018-11-09',
                        task_content: '这是程序设计9任务内容2',
                        has_done: 0,
                    },
                    {
                        task_name: 'todo-3',
                        task_date: '2018-10-18',
                        task_content: '这是程序设计9任务内容3',
                        has_done: 0,
                    },
                ]
            },
        ]
    },
];

window.onload = function () {

    var folders = document.querySelector('.folder-list'),
        todoList = document.querySelector('.todo-list'),
        curFolder = null,
        curChildFolder = null,
        curTask = null,
        curSelect = 0;

    var taskTitleInput = document.querySelector('input[name="task-name"]'),
        taskDateInput = document.querySelector('input[name="task-time"]'),
        taskContentInput = document.querySelector('.task-edit textarea');


    initFolder();

    function initFolder() {
        var i = 0,
            j = 0,
            len = data.length,
            folder,
            folder_name,
            delete_button,
            child_folder_list;

        // 先删除旧的
        var old = document.querySelectorAll('.folder-list>li');
        for (i = 0; i < old.length; ++i) {
            folders.removeChild(old[i]);
        }

        // 再添加新的

        for (i = 0; i < len; ++i) {
            folder = document.createElement('li');
            folder_name = document.createElement('div');
            folder_name.className = 'folder-name';
            folder_name.setAttribute('data-index', i);
            folder_name.appendChild(document.createTextNode(data[i].folder_name));
            delete_button = document.createElement('button');
            delete_button.className = 'btn btn-delete';
            folder_name.appendChild(delete_button);
            child_folder_list = document.createElement('ul');
            child_folder_list.className = 'task-list';
            for (j = 0; j < data[i].child_folders.length; ++j) {
                var child_folder = document.createElement('li');
                child_folder.setAttribute('data-child-index', j);
                child_folder.innerHTML = data[i].child_folders[j].folder_name;
                child_folder_list.appendChild(child_folder);
            }
            folder.appendChild(folder_name);
            folder.appendChild(child_folder_list);
            folders.appendChild(folder);
        }
    }

    function initTodoList(folderIndex, childfolderIndex) {
        if (!folderIndex) throw new Error('folderIndex is not exist');

        var folder = data[folderIndex].child_folders[childfolderIndex],
            tasks = folder.tasks,
            tasksLen = tasks.length,
            dates = [],
            i = 0;

        // 清除掉之前的
        var oldList = document.querySelectorAll('ul[class="time-line"]');
        for (i = 0; i < oldList.length; ++i) {
            todoList.removeChild(oldList[i]);
        }

        // 添加

        // 如果有条件限制，则过滤
        if (curSelect) {
            tasks = tasks.filter(t => {
                return t.has_done === curSelect - 1;
            });
            tasksLen = tasks.length;
        }

        for (i = 0; i < tasksLen; ++i) {
            dates.push(tasks[i].task_date);
        }

        dates = [...new Set(dates)]; // 去重

        dates.sort((a, b) => {
            return a > b;
        });

        var timeLines = [];

        dates.forEach(time => {
            var timeLine = document.createElement('ul');
            timeLine.className = 'time-line';
            timeLine.setAttribute('data-date', time);
            var date = document.createElement('span');
            date.appendChild(document.createTextNode(time));
            timeLine.appendChild(date);
            timeLines.push(timeLine);
        });

        for (i = 0; i < tasksLen; ++i) {
            timeLines.forEach(t => {
                if (t.getAttribute('data-date') == tasks[i].task_date) {
                    var li = document.createElement('li');
                    li.setAttribute('data-task-index', i);
                    li.setAttribute('data-has-done', tasks[i].has_done);
                    li.appendChild(document.createTextNode(tasks[i].task_name));
                    t.appendChild(li);
                }
            });
        }

        timeLines.forEach(t => {
            todoList.appendChild(t);
        });

    }

    // 侦听folder 展开
    $.delegate('.folder-list', 'div', 'click', e => {
        e = window.event || e;
        var target = e.srcElement || e.target;
        if (target.className === 'bottom-panel') {
            var folderName = prompt('输入新的分类名: 父类名/子分类名');
            if (folderName && folderName.trim() !== '') {
                var parentFolder = folderName.split('/')[0],
                    childFolder = folderName.split('/')[1],
                    exist = false;
                // 检测父分类是否已经存在
                data.forEach(f => {
                    if (f.folder_name === parentFolder) exist = true;
                });
                // 如果父分类不存在，则创建分类
                if (!exist) {
                    data.push({
                        folder_name: parentFolder,
                        child_folders: []
                    });
                }
                // 检测子分类是否已经存在
                exist = false;
                var p;
                data.forEach(f => {
                    if (f.folder_name === parentFolder) {
                        p = f.child_folders;
                    }
                });
                p.forEach(c => {
                    if (c.folder_name === childFolder) {
                        exist = true;
                    }
                });
                if (exist) {
                    alert('分类已存在，不能重复添加');
                } else {
                    p.push({
                        folder_name: childFolder,
                        tasks: []
                    });
                    initFolder();
                }
            }
        } else {
            curFolder = target.getAttribute('data-index');
            var ul = target.nextSibling;
            while (ul && ul.nodeType !== 1) {
                ul = ul.nextSibling;
            }
            ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
        }
    });

    // 侦听folder 删除
    $.delegate('.folder-list', 'button', 'click', e => {
        e = window.event || e;
        var target = e.srcElement || e.target;
        if (confirm('确定删除本分类吗？删除后无法恢复')) {
            var parent = target.parentNode;
            while (parent && parent.nodeType === 1 && parent.tagName.toLowerCase() !== 'li') {
                parent = parent.parentNode;
            }
            if (parent) folders.removeChild(parent);
        }
    });

    // 侦听子分类
    $.delegate('.folder-list', 'li', 'click', e => {
        e = window.event || e;
        var target = e.srcElement || e.target;
        var childfolderIndex = target.getAttribute('data-child-index');
        if (childfolderIndex) {
            curChildFolder = childfolderIndex;
            initTodoList(curFolder, curChildFolder);
        }
    })

    // 侦听todo-list 新增任务
    $.delegate('.todo-list', 'span', 'click', e => {
        e = window.event || e;
        var target = e.srcElement || e.target;
        if (target.id === 'add-task') {
            console.log('add');
        }
    });

    // 侦听task点击
    $.delegate('.todo-list', 'li', 'click', e => {
        e = window.event || e;
        var target = e.srcElement || e.target;
        var index = target.getAttribute('data-task-index');
        if (index) {
            curTask = index;
            var task = data[Number(curFolder)].child_folders[Number(curChildFolder)].tasks[Number(curTask)]; setInputState('write');
            setInputState('write');
            setInputContent(task.task_name, task.task_date, task.task_content);
        }

    });

    // 新增任务
    $.on('#add-task', 'click', e => {
        setInputState('write');
        setInputContent('输入你的任务名称', 'YYYY-MM-DD', '在这里输入你的任务内容吧！');
        taskContentInput.focus();
    });

    // 保存内容
    $.on('.btn-edit', 'click', e => {
        if (curFolder && curChildFolder) {
            var content = getInputContent();
            if (curTask) {
                var task = data[curFolder].child_folders[curChildFolder].tasks[curTask];
                task.task_name = content.task_name;
                task.task_date = content.task_date;
                task.task_content = content.task_content;
            } else {
                var tasksList = data[curFolder].child_folders[curChildFolder].tasks;
                tasksList.push(content);
            }
            alert('保存成功！');
        }
    });

    // 标记完成
    $.on('.btn-finish', 'click', e => {
        if (curFolder && curChildFolder && curTask) {
            data[curFolder].child_folders[curChildFolder].tasks[curTask].has_done = 1;
            alert('任务已完成');
        }
    });


    var selections = document.querySelector('.selection');

    // 完成情况分类
    $.delegate('.selection', 'li', 'click', e => {
        console.log('select');
        e = window.event || e;
        var target = e.srcElement || e.target;
        var i = 0,
            len = selections.children.length,
            select = null;
        for (; i < len; ++i) {
            selections.children[i].className = '';
            if (selections.children[i] == target) select = i;
        }
        selections.children[select].className = 'selected';
        curSelect = select;
        initTodoList(curFolder,curChildFolder);
    });

    // 设置编辑框状态：只读，可写
    function setInputState(state) {
        var writeOnly = state === 'write' ? false : true;
        taskTitleInput.disabled = writeOnly;
        taskDateInput.disabled = writeOnly;
        taskContentInput.disabled = writeOnly;
    }

    // 设置编辑框内容
    function setInputContent(title, date, content) {
        taskTitleInput.value = title;
        taskDateInput.value = date;
        taskContentInput.value = content;
    }

    // 提取编辑框内容
    function getInputContent() {
        return {
            task_name: taskTitleInput.value,
            task_date: taskDateInput.value,
            task_content: taskContentInput.value,
            has_done: 0
        };
    }

}
