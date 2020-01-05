function initControl() {
    var dom = renderer.domElement;
    //鼠标按下时获取到当前相机的位置，并求出当前相机距离原点的位置
    var distance; //相机距离中心点的距离
    var pan, tilt; //相机的水平角度和垂直角度
    var downX, downY; //鼠标按下时的xy坐标
    var matrix = new THREE.Matrix4(); //声明一个旋转矩阵
    //绑定按下事件
    dom.addEventListener("mousedown", function (e) {
        distance = computeDistance(camera.position, new THREE.Vector3());
        computePanTilt(camera.position);
        downX = e.clientX;
        downY = e.clientY;
        //绑定移动事件
        document.addEventListener("mousemove", move);
        //绑定鼠标抬起事件
        document.addEventListener("mouseup", up);
    });
    //鼠标移动事件
    function move(e) {
        var moveX = e.clientX;
        var moveY = e.clientY;
        //计算鼠标的偏移量当前相机的pan和tilt
        var offsetX = moveX - downX;
        var offsetY = moveY - downY;
        var movePan = pan - offsetX / 3;
        var moveTilt = tilt - offsetY;
        //tilt的移动范围是90到-90度
        if (moveTilt >= 90) {
            moveTilt = 89.99;
        }
        if (moveTilt <= -90) {
            moveTilt = -89.99;
        }
        //根据pan和tilt计算出当前的相机应该所在的位置
        var p = computePosition(distance, movePan, moveTilt);
        camera.position.set(p.x, p.y, p.z);
        camera.lookAt(new THREE.Vector3());
    }
    //鼠标抬起事件
    function up() {
        //清楚绑定事件
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    }
    //计算两点位置的距离
    function computeDistance(vec1, vec2) {
        return vec1.distanceTo(vec2);
    }
    //根据当前点到原点的线计算出到原点z轴正方向的pan和tilt的偏移量
    function computePanTilt(position) {
        //首先计算水平的偏移角度
        pan = new THREE.Vector3(position.x, 0, position.z).angleTo(new THREE.Vector3(0, 0, 1));
        pan = pan / Math.PI * 180;
        if (position.x < 0) {
            pan = 360 - pan;
        }
        //计算垂直的偏移角度
        tilt = new THREE.Vector3(position.x, 0, position.z).angleTo(position);
        tilt = tilt / Math.PI * 180;
        if (position.y > 0) {
            tilt = -tilt;
        }
    }
    //根据pan和tilt 相机到原点的距离计算出相机当前所在的位置
    function computePosition(distance, pan, tilt) {
        //重置旋转矩阵
        matrix.identity();
        var v = new THREE.Vector3(0, 0, distance);
        //根据pan和tilt修改旋转矩阵，注意顶点旋转计算需要按照xyz的顺序旋转
        matrix.makeRotationX(tilt / 180 * Math.PI);
        v.applyMatrix4(matrix);
        matrix.makeRotationY(pan / 180 * Math.PI);
        v.applyMatrix4(matrix);
        //计算出当前相机的位置
        return v;
    }
}

window.initControl = initControl;