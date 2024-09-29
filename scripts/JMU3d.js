import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.querySelector("#JMU");
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
cam.position.set(12.226844144702712, 13.205864049399336, 7.078801944533522);

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

const spotLight = new THREE.SpotLight(0xffffff, 400, 0, 0.7, 0, 1.4);
spotLight.position.set(8, 15, 3);
spotLight.castShadow = true;
scene.add(spotLight);

let JMU;

const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "../models/JMU/jmu_cube3.glb",
  (gltf) => {
    JMU = gltf.scene;
    JMU.scale.set(0.2, 0.2, 0.2);
    scene.add(JMU);
    cam.lookAt(JMU.position);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function animate() {
  if (JMU) {
    JMU.rotation.y -= 0.007;
  }
  renderer.render(scene, cam);
  requestAnimationFrame(animate);
}

animate();
