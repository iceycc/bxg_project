
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
// 初始化工具
function initControl() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
}
//初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200); //实例化相机
    camera.position.set(0, 0, 15); // x, y,z
}

//创建模型
function initMesh() {
    geometry = new THREE.BoxGeometry(2, 2, 2); //创建几何体
    material = new THREE.MeshBasicMaterial({color:'#fff'});
    // material.color = new THREE.Color(0xff00ff); //将颜色修改为紫色
    // material.color.set('red')
    mesh = new THREE.Mesh(geometry, material); //创建网格
    mesh.name = 'lft';
    // mesh.visible = false;
    // mesh.position.x = 3; //将模型的位置调整到x正轴距离原点为3的位置。
    // mesh.position.y += 5; //将模型的y轴位置以当前的位置向上移动5个单位。
    // mesh.position.z -= 6;
    mesh.position.set(2, 5, -6);

    mesh.scale.x = 2; //模型沿x轴放大一倍
    mesh.scale.y = 0.5; //模型沿y轴缩小一倍
    mesh.scale.z = 1; //模型沿z轴保持不变
    scene.add(mesh); //将网格添加到场景
}

//运行动画
function animate() {
    requestAnimationFrame(animate); //循环调用函数

    mesh.rotation.x += 0.01; //每帧网格模型的沿x轴旋转0.01弧度  半圈是180度
    mesh.rotation.y += 0.02; //每帧网格模型的沿y轴旋转0.02弧度
    stats.update();
    control.update();
    renderer.render(scene, camera); //渲染界面

}

//初始化函数，页面加载完成是调用
function init() {  // 3d三要素
    initRenderer();   // 渲染
    initScene();  // 场景
    initCamera();  // 相机

    initMesh();  // 物体

    initControl();
    animate();  // 旋转,动画
}
