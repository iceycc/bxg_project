
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
    // //球体
    // var sphereGeometry = new THREE.SphereGeometry(5, 24, 16);
    // var sphereMaterial = new THREE.PointsMaterial({ color: 0xff00ff });
    // var sphere = new THREE.Points(sphereGeometry, sphereMaterial);
    // scene.add(sphere);

    var starsGeometry = new THREE.Geometry();
    //生成一万个点的位置
    for (var i = 0; i < 10000; i++) {
        var star = new THREE.Vector3();
        //THREE.Math.randFloatSpread 在区间内随机浮动* - 范围 / 2 *到* 范围 / 2 *内随机取值。
        star.x = THREE.Math.randFloatSpread(2000);
        star.y = THREE.Math.randFloatSpread(2000);
        star.z = THREE.Math.randFloatSpread(2000);
        starsGeometry.vertices.push(star);
        starsGeometry.colors.push(new THREE.Color("rgb("+Math.random()*255+", "+Math.random()*255+", "+Math.random()*255+")")); //添加一个随机颜色
    }
    var starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
    var starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
}

//运行动画
function animate() {
    // requestAnimationFrame(animate); //循环调用函数

    // mesh.rotation.x += 0.01; //每帧网格模型的沿x轴旋转0.01弧度  半圈是180度
    // mesh.rotation.y += 0.02; //每帧网格模型的沿y轴旋转0.02弧度
    stats.update();
    renderer.render(scene, camera); //渲染界面

}

//创建灯光
function initLight() {
    var light = new THREE.DirectionalLight('red', 0.5); //添加了一个白色的平行光
    light.position.set(20, 50, 50); //设置光的方向
    scene.add(light); //添加到场景

    //添加一个全局环境光
    scene.add(new THREE.AmbientLight(0x222222));
}


//初始化函数，页面加载完成是调用
function init() {  // 3d三要素
    initRenderer();   // 渲染
    initScene();  // 场景
    initCamera();  // 相机
    initMesh();  // 物体
    initLight();

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
