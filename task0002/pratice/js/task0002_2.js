window.onload = function() {

    var display = $('#timedown');

    $.click('#btn',function() {
        var val = $('#time').value,
            regx = new RegExp(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    
        if(!regx.test(val)) {
            alert('时间不合规范');
            return;
        }
        var arr = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(val);

        timeDown(arr[1],arr[2]-1,arr[3]);
        
    });

    function timeDown(year,month,day) {
        var target = new Date(year,month,day),
            now = new Date();
        
        var delta = (target - now) / 1000; // 相差的秒数
        var days = Math.floor(delta / (24 * 60 * 60)); // 天
        delta = delta % (24 * 60 * 60); //余数
        var hours = Math.floor(delta / (60 * 60)); // 小时
        delta = delta % (60 * 60);
        var mins = Math.floor(delta / 60); // 分钟
        delta = delta % 60;
        var seconds = Math.floor(delta); // 剩下的就是秒了

        display.innerHTML = days + '天' + hours + '时' + mins + '分' + seconds + '秒';

        setTimeout(()=>{
            timeDown(year,month,day);
        },1000);
    }

}