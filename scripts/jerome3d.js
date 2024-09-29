import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import mouse_follow from "./mouse_follow.js";
import reset_rotation from "./reset_rotation.js";

const canvas = document.querySelector("#me");
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
cam.position.set(0, 0, 25);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(parent.clientWidth, parent.clientHeight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xdbe9ff, 500);
pointLight.position.set(10, 10, -10);
scene.add(pointLight);

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(parent.clientWidth, parent.clientHeight);
  cam.aspect = parent.clientWidth / parent.clientHeight;
  cam.updateProjectionMatrix();
});
cam.lookAt(0, 0, 0);

let jerome;

const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "../models/myself/jeromehead.glb",
  (gltf) => {
    jerome = gltf.scene;
    jerome.scale.set(10, 10, 10);
    scene.add(jerome);
    const initialRotation = jerome.rotation.clone();
    mouse_follow(jerome, cam);
    document.addEventListener("mouseleave", () => {
      reset_rotation(jerome, initialRotation);
    });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function animate() {
  renderer.render(scene, cam);
  requestAnimationFrame(animate);
}

animate();
