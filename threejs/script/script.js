let Init = () => {
  // create renderer
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // create scene
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  // create camera
  let camera = new THREE.PerspectiveCamera(
    (40, window.innerWidth * window.innerHeight, 0.01, 500000)
  );
  camera.position.set(10, 100, -200);
  camera.fov = window.innerHeight / window.screen.height;
  camera.aspect = window.innerWidth / window.innerHeight;
  
  //controls
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", renderer);

  
  // // camera guidelines
  // var helper = new THREE.CameraHelper( camera );
  // scene.add( helper );

  // lights

  let hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight);
  let directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, -1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  let light = new THREE.PointLight(0xc4c4c4, 10);
  light.position.set(100, -300, 500);
  scene.add(light);
  let light2 = new THREE.PointLight(0xc4c4c4, 10);
  light2.position.set(500, -100, 0);
  scene.add(light2);
  let light3 = new THREE.PointLight(0xc4c4c4, 10);
  light3.position.set(100, -100, -500);
  scene.add(light3);
  let light4 = new THREE.PointLight(0xc4c4c4, 10);
  light4.position.set(-500, -300, 500);
  scene.add(light4);

  // loader
  let loader = new THREE.GLTFLoader();
  loader.load("minimuseum21.gltf", function (gltf) {
    let museum = gltf.scene;
    museum.scale.set(-1, -2, 1);
    museum.position.y = 45;
    scene.add(gltf.scene);
    animate();
  });
  let animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
};
Init();
