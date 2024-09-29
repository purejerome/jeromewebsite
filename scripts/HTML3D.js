import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.querySelector("#HTML");
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
cam.position.set(0.8503103896303181, -1.4811050757707005, 4.699287179542555);

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

const dLight = new THREE.DirectionalLight(0xffffff, 3);
dLight.position.set(0, -3, 1);
scene.add(dLight);

let HTML;

const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "../models/HTML/html_logo_2.glb",
  (gltf) => {
    HTML = gltf.scene;
    HTML.scale.set(0.38, 0.38, 0.38);
    scene.add(HTML);
    cam.lookAt(HTML.position);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let upDirection = true;

function animate() {
  if (HTML) {
    if (HTML.position.y >= 0.25) {
      upDirection = false;
    } else if (HTML.position.y <= -0.3) {
      upDirection = true;
    }

    if (upDirection) {
      HTML.position.y += 0.009;
    } else {
      HTML.position.y -= 0.009;
    }
    HTML.rotation.y += 0.005;
  }
  renderer.render(scene, cam);
  requestAnimationFrame(animate);
}

animate();
