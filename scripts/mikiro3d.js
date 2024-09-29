import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.querySelector("#mikiro");
const parent = canvas.parentElement;

// Scene
const scene = new THREE.Scene();

// Camera
const cam = new THREE.PerspectiveCamera(
  75,
  parent.clientWidth / parent.clientHeight,
  0.1,
  1000
);
cam.position.set(0, -100, 230);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(parent.clientWidth, parent.clientHeight);

window.addEventListener("resize", () => {
  renderer.setSize(parent.clientWidth, parent.clientHeight);
  cam.aspect = parent.clientWidth / parent.clientHeight;
  cam.updateProjectionMatrix();
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const dLight = new THREE.DirectionalLight(0xffffff, 3);
scene.add(dLight);

let mikiro;

const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "../models/mikiro/mikiro_model.glb",
  (gltf) => {
    mikiro = gltf.scene;
    scene.add(mikiro);
    mikiro.position.y = -100;
    mikiro.position.x = -50;
    const sight = new THREE.Vector3();
    sight.y = 60;
    cam.lookAt(sight);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function animate() {
  const time = performance.now() * 0.0005;
  const radius = 200;

  dLight.position.x = Math.sin(time) * radius;
  dLight.position.z = Math.cos(time) * radius;
  dLight.position.y = 100;
  renderer.render(scene, cam);
  requestAnimationFrame(animate);
}

animate();
