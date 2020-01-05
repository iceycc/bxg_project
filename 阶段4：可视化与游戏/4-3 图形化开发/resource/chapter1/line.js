
//声明一些全局变量
var renderer, camera, scene, geometry, material, mesh; // webgl 属性和位置 存在内存

// 性能插件，监听fps
stats = new Stats();
document.body.appendChild(stats.dom);

//初始化渲染器
function initRenderer() {
    renderer = new THREE.WebGLRenderer(); //实例化渲染器
    renderer.setSize(window.innerWidth, window.innerHeight); //设置宽和高
    document.body.appendChild(renderer.domElement); //添加到dom
}

//初始化场景
function initScene() {
    scene = new THREE.Scene(); //实例化场景
}

//初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200); //实例化相机
    camera.position.set(0, 0, 15); // x, y,z
}

//创建模型
function initMesh() {
    var pointsArr = [
        new THREE.Vector3(-10, 0, -5),
        new THREE.Vector3(-5, 15, 5),
        new THREE.Vector3(20, 15, -5),
        new THREE.Vector3(10, 0, 5),
        new THREE.Vector3(-18, 0, -5),
        new THREE.Vector3(-5, 22, 5),
        new THREE.Vector3(23, 44, -5),
        new THREE.Vector3(-1, 0, 5),
        new THREE.Vector3(-10, 0, -5),
        new THREE.Vector3(-5, 15, 5),
        new THREE.Vector3(20, 15, -5),
        new THREE.Vector3(10, 0, 5),
        new THREE.Vector3(-18, 0, -5),
        new THREE.Vector3(-5, 22, 5),
        new THREE.Vector3(23, 44, -5),
        new THREE.Vector3(-1, 0, 5),
    ];
    //指定一些用于生成曲线线的三维顶点
    var curve = new THREE.CatmullRomCurve3(pointsArr);

    var points = curve.getPoints(500); //使用getPoints获取当前曲线分成50段后的所有顶点
    var curveGeometry = new THREE.BufferGeometry().setFromPoints(points); //使用顶点生成几何体

    var curveMaterial = new THREE.LineDashedMaterial({ color: 0xff0000 }); //创建一条红色的线材质

    // 使用THREE.Line创建线
    curveLine = new THREE.Line(curveGeometry, curveMaterial);
    curveLine.computeLineDistances(); //需要重新计算位置才能显示出虚线
    scene.add(curveLine);

}

//运行动画
function animate() {
    stats.update();
    renderer.render(scene, camera); //渲染界面

}

//初始化函数，页面加载完成是调用
function init() {  // 3d三要素
    initRenderer();   // 渲染
    initScene();  // 场景
    initCamera();  // 相机

    initMesh();  // 物体


    animate();  // 旋转,动画

    // renderer, camera, scene, geometry, material, mesh; 
    console.log('renderer', renderer instanceof THREE.Object3D);
    console.log('camera', camera instanceof THREE.Object3D);
    console.log('scene', scene instanceof THREE.Object3D);
    console.log('geometry', geometry instanceof THREE.Object3D);
    console.log('material', material instanceof THREE.Object3D);
    console.log('mesh', mesh instanceof THREE.Object3D);

    // 通过场景去获取实例对象
    console.log(scene.getObjectByName('lft'));
    scene.getObjectByName('lft');

}
