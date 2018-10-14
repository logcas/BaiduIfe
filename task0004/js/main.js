// 数据
var data = [
    {
        name: '任务分类1',
        tasks: [
            {
                name: '任务11',
                time: '2018-10-14',
                content: '学习Webpack4'
            },
            {
                name: '任务12',
                time: '2018-10-15',
                content: '深入理解webpack4'
            }
        ]
    },
    {
        name: '任务分类2',
        tasks: [
            {
                name: '任务2221',
                time: '2018-10-16',
                content: '学习移动web开发'
            },
            {
                name: '任务22222',
                time: '2018-10-17',
                content: '深入理解移动web开发'
            }
        ]
    },
];

// 注册路由
var app = document.getElementById('app');
var router = new Router(app);

// 添加映射和传递数据
router.map('/', indexComponent,{
    list: data.slice(0)
});

router.map('', indexComponent,{
    list: data.slice(0)
});

router.map('/1', catagoryComponent, {
    folder:1,
    catagory: data[0]
});

router.map('/2', catagoryComponent, {
    folder:2,
    catagory: data[1]
});

router.map('/1/1',detailComponent,data[0].tasks[0]);
router.map('/1/2',detailComponent,data[0].tasks[1]);
router.map('/2/1',detailComponent,data[1].tasks[0]);
router.map('/2/2',detailComponent,data[1].tasks[1]);

