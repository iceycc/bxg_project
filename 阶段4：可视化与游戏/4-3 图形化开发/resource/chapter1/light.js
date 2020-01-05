
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
    geometry = new THREE.BoxGeometry(2, 2, 2); //创建几何体
    material = new THREE.MeshPhongMaterial({ color: 0x00ffff }); //创建材质
    material.metalness = 0; //设置的值的范围为0-1，值越小，材质越光滑，高光越明显
    // material.metalnessMap = 0.1; //设置的值的范围为0-1，值越大，越有生锈金属的质感，值越小反光越清晰

    mesh = new THREE.Mesh(geometry, material); //创建网格
    scene.add(mesh); //将网格添加到场景

}

//运行动画
function animate() {
    requestAnimationFrame(animate); //循环调用函数

    mesh.rotation.x += 0.01; //每帧网格模型的沿x轴旋转0.01弧度  半圈是180度
    mesh.rotation.y += 0.02; //每帧网格模型的沿y轴旋转0.02弧度
    stats.update();
    renderer.render(scene, camera); //渲染界面

}

//创建灯光
function initLight() {
    var light = new THREE.DirectionalLight(0xffffff); //添加了一个白色的平行光
    light.position.set(20, 50, 50); //设置光的方向
    // light.color.set('red'); //将光照的颜色修改为黑色
    light.intensity = 2.0; // 光照的强度改为默认的两倍
    scene.add(light); //添加到场景

    //添加一个全局环境光
    scene.add(new THREE.AmbientLight('blue'));
}


//初始化函数，页面加载完成是调用
function init() {  // 3d三要素
    initRenderer();   // 渲染
    initScene();  // 场景
    initCamera();  // 相机
    initMesh();  // 物体
    initLight();
    renderer.shadowMap.enabled = true;

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
