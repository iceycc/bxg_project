
//声明一些全局变量
var renderer, camera, scene, geometry, material, mesh; // webgl 属性和位置 存在内存

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
    geometry = new THREE.BoxGeometry(2, 2, 2, 2, 3, 4); //创建几何体
    material = new THREE.MeshPhysicalMaterial(); //创建材质,七彩材质

    mesh = new THREE.Mesh(geometry, material); //创建网格
    scene.add(mesh); //将网格添加到场景
}

//运行动画
function animate() {
    // requestAnimationFrame(animate); //循环调用函数

    mesh.rotation.x += 1; //每帧网格模型的沿x轴旋转0.01弧度  半圈是180度
    mesh.rotation.y += 1; //每帧网格模型的沿y轴旋转0.02弧度
    renderer.render(scene, camera); //渲染界面
}

//初始化函数，页面加载完成是调用
function init() {  // 3d三要素
    initRenderer();   // 渲染
    initScene();  // 场景
    initCamera();  // 相机

    initMesh();  // 物体

    animate();  // 旋转,动画
}
