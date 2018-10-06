window.onload = function() {

    function addList(text,val) {
        return text + '<li><input type="checkbox">' + val + '</li>';
    }

    $.click('#btn',function() {
        var val = $('#hobbies').value,
            hobbies = uniqArray(val.split(/[.。,，;；、\\\s]+/)),
            alert = $('#alert');
        if(hobbies.length > 10){ 
            alert.style.display = 'block';
            return;
        }
        alert.style.display = 'none';
        var text = '';
        var i = 0,
            len = hobbies.length;
        for(;i<len;++i) {
            text = addList(text,hobbies[i]);
        }
        $('#display').innerHTML = text;
    });

}