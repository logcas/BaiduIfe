
window.onload = function() {

    var c1 = $('#c1'),
        c2 = $('#c2');

    Drag.addContainer(c1);
    Drag.addContainer(c2);

    var c1_boxes = [].slice.call(c1.children),
        c2_boxes = [].slice.call(c2.children),
        boxes = [].concat(c1_boxes,c2_boxes);
    
    boxes.forEach(box => {
        new Drag(box);
    });

}
