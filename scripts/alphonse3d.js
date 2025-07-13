import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.querySelector("#alphonse");
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

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const dLight = new THREE.DirectionalLight(0xffffff, 6);
scene.add(dLight);

let alphonse;

const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "../models/Alphonse/alphonse.glb",
  (gltf) => {
    alphonse = gltf.scene;
    alphonse.scale.set(0.1, 0.1, 0.1);
    scene.add(alphonse);
    alphonse.position.y = -100;
    alphonse.position.x = 0;
    alphonse.rotation.y = Math.PI;
    const sight = new THREE.Vector3();
    sight.y = 60;
    cam.position.z = -250;
    cam.position.y = -80;
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
  dLight.position.y = -100;
  renderer.render(scene, cam);
  requestAnimationFrame(animate);
}

animate();
// window.addEventListener("resize", () => {
//   if (window.innerWidth > 2000) {
//     alphonse.scale.set(0.1, 0.1, 0.1);
//   } else {
//     alphonse.scale.set(0.1, 0.1, 0.1);
//   }
// });
