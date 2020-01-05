var renderer, camera, scene, light, mixer, actions, gui, datGui, naruto;
var clock = new THREE.Clock(); // 获取时间
let dop = new Dop();

function initGui() {
    gui = { //所有的动作都是调用这样一个对象

    };

    for (let i = 0; i < 26; i++) {
        gui[`play${i}`] = function () {
            var str = `action${i}`;
            gui[str]();
        }
    }

    datGui = new dat.GUI();

    for (var i = 0; i < 26; i++) {
        datGui.add(gui, `play${i}`);
    }
}

function initRender() {
    renderer = new THREE.WebGLRenderer({
        antialias: true   // 开启抗锯齿
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);
    // renderer.shawdowMap.enable = true;  // 开启阴影

    document.body.appendChild(renderer.domElement);
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
    camera.position.set(0, 800, -800);
    camera.lookAt(new THREE.Vector3());
}

function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));  // 添加环境光

    light = new THREE.DirectionalLight(0xaaaaaa); // 初始化直射光
    light.position.set(0, 200, 100);
    light.lookAt(new THREE.Vector3()); // 0,0,0

    light.castShadow = true;

    scene.add(light);
}

function initModel() {
    // 加载图片
    // 图片赋值给材质的map属性

    var groundTexture = new THREE.TextureLoader().load('./images/grasslight-big.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;  //设置草地的清晰度

    // 材质
    var groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });
    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    // 1. 加载fbx文件
    // 2. animate添加一个render方法
    //  3. 添加调试机制
    var loader = new THREE.FBXLoader();
    loader.load('./source/Naruto.fbx', (mesh) => { // 模型加载需要时间
        console.log(mesh);
        //设置模型的每个部位都可以投影
        mesh.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        // 创建动画
        mixer = mesh.mixer = new THREE.AnimationMixer(mesh);
        // 把动画一个一个的拿出来
        actions = [];  // 存储27个动画，用于调用

        for (var i = 0; i < mesh.animations.length; i++) {
            createAction(i);
        }

        function createAction(i) {
            actions[i] = mixer.clipAction(mesh.animations[i]); // 原生方法, 返回一个可用对象
            // actions[i].play();
            // 调用动画， 播放
            gui["action" + i] = function () {
                for (var j = 0; j < actions.length; j++) {
                    if (j === i) {
                        actions[j].play();
                    } else {
                        actions[j].stop();
                    }
                }
            }
        }

        gui.stop = function () {
            for (var i = 0; i < actions.length; i++) {
                actions[i].stop();
            }
        }
        console.log('xxxxxxxxxxx');
        gui["action" + 24]();  // 页面刚加载进来的时候 执行第24个动画
        mesh.position.y += 110;

        //设置光线焦点模型
        light.target = mesh;
        scene.add(mesh);
        naruto = mesh;
    })
}



function animate() {
    render()
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


function addstick() {
    let control = document.querySelector("#joystick");
    let barWrap = control.querySelector(".bar-wrap");
    let bar = control.querySelector(".bar");
    let dop = new Dop();
    let media = dop.browserRedirect();
    let center = new THREE.Vector2(); //操作杆的中心
    let mouse = new THREE.Vector2(); //鼠标按下的位置
    let doc = dop.$(document);

    dop.$(control).on("down", function (event) {
        // 1. 获取圆盘的中心点坐标
        // 2. 根据圆盘移动计算 人物运动角度
        // 3. 开始移动 鸣人
        // 4. 鼠标抬起， 停止运动
        // 5. 圆盘归位

        event.preventDefault();

        // 获取中心点坐标
        center.x = window.innerWidth - parseFloat(dop.getFinalStyle(control, "right")) - parseFloat(dop.getFinalStyle(control, "width")) / 2;
        center.y = window.innerHeight - parseFloat(dop.getFinalStyle(control, "bottom")) - parseFloat(dop.getFinalStyle(control, "height")) / 2;

        // 获取角度
        getRadian(event);
        // 加上移动动画
        gui["action" + 3]();

        doc.on('move', move);
        doc.on('up', up);

    })

    function move(event) {
        getRadian(event);
    }
    function up(event) {
        doc.remove("move", move);
        doc.remove("up", up);
        // 圆盘复位
        bar.style.marginTop = 0;
        barWrap.style.transform = `translate(-50%, -50%) rotate(0deg)`;
        bar.style.transform = `translate(-50%, -50%) rotate(0deg)`;

        // 人物停止p
        
        characterMove(new THREE.Vector2(), 0);

        // 动画停止
        gui["action" + 24]();


    }
    function getRadian(event) {
        // 1.  通过event获取实时的鼠标位置
        // 2. 计算夹角
        // 3. 移动人物， 更新圆盘的位置

        // 通过event获取实时的鼠标位置
        if (media === "pc") {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        } else {
            mouse.x = event
                .touches[0]
                .clientX;
            mouse.y = event
                .touches[0]
                .clientY;
        }

        //计算两点之间的夹角
        mouse.x = mouse.x - center.x;
        mouse.y = mouse.y - center.y;

        console.log('angle', mouse.angle())
        // 人物角度调整
        if (naruto) {
            // 浏览器提供的数据总是相差90度
            naruto.rotation.y = -mouse.angle() - Math.PI / 2;
        }
        // 更新圆盘的位置

        let distance = center.distanceTo(mouse); // 二维向量原生的方法
        distance >= parseFloat(dop.getFinalStyle(control, "width")) / 2 && (distance = parseFloat(dop.getFinalStyle(control, "width")) / 2);

        //修改操作杆的css样式
        bar.style.marginTop = `-${distance}px`;
        bar.style.transform = `translate(-50%, -50%) rotate(-${(mouse.angle() / Math.PI * 180 + 90) % 360}deg)`;
        barWrap.style.transform = `translate(-50%, -50%) rotate(${(mouse.angle() / Math.PI * 180 + 90) % 360}deg)`;
        // 人物的移动
        characterMove(mouse.normalize(), distance / (parseFloat(dop.getFinalStyle(control, "width")) / 2));
    }
}

let direction = new THREE.Matrix4(); //当前移动的旋转矩阵
let move = new THREE.Vector3(); //当前位置移动的距离
// 人物移动
function characterMove(vector, ratio) {
    // 重置矩阵
    direction.identity();

    // 通过相机的四元数获取旋转矩阵
    let quaternion = camera.quaternion;
    direction.makeRotationFromQuaternion(quaternion);

    // 获取操作杆的移动方向
    move.x = vector.x;
    move.y = 0;
    move.z = vector.y;

    // 已经得到了move 
    move.applyMatrix4(direction);
    move.normalize();
    // 注意： x，y 只是差值，并不是真正的xy的值
    move.x = move.x * ratio * 10;
    move.z = move.z * ratio * 10;

}

let position = new THREE.Vector3();
function render() {
    var time = clock.getDelta();
    if (mixer) {
        mixer.update(time);  // mixer 规定的动画方法
    }

    // 移动人物模型，移动相机，灯光
    if (naruto) {
        //获取当前位置
        position.x += move.x;
        position.z += move.z;

        //修改模型位置
        naruto.position.x = position.x;
        naruto.position.z = position.z;

        //修改平衡光的位置
        light.position.x = position.x;
        light.position.z = position.z + 100;

        //修改相机位置
        camera.position.x = position.x;
        camera.position.z = position.z - 800;
    }
}

function addSkills() {
    let skill = document.querySelector("#skills"); // 获取dom

    dop.$(skill.querySelector(".attack")).on('tap', function() {
        gui['action' + 12]();
    })
}

function draw() {
    initGui();
    initRender();  // 核心的三要素
    initScene();
    initCamera();
    initLight();

    initModel();
    addstick();
    addSkills();
    animate();
}