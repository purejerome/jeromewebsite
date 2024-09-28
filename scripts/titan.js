// const splitDomain = window.location.pathname.split("/");
// let dots = "../node_modules/";
// if (splitDomain.includes("jeromewebsite")) {
//   console.log("in");
//   dots = "/jeromewebsite/node_modules/";
// }

// import * as THREE from `${dots}three`;
// import { GLTFLoader } from `${dots}three/examples/jsm/loaders/GLTFLoader.js`;
// import ScrollTrigger from `${dots}gsap/scrolltrigger`;
// import gsap from `${dots}gsap`;
// import { CustomEase } from `${dots}gsap/CustomEase`;

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import ScrollTrigger from "gsap/scrolltrigger";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

// Scene
const scene = new THREE.Scene();

// Camera
const cam = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
cam.position.set(0.09521213829704991, 0.46850471403480043, 15.529081514766155);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true,
});
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(innerWidth, innerHeight);
  cam.aspect = innerWidth / innerHeight;
  cam.updateProjectionMatrix();
});

let titan;

const gltfLoader = new GLTFLoader();

let titanPos;
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#bg",
    scrub: 2,
    start: "top top",
    end: "bottom top",
  },
});
let lookAT;

gltfLoader.load(
  "models/titan/ColosalTitan.glb",
  (gltf) => {
    titan = gltf.scene;
    titan.scale.set(10, 10, 10);
    const titanBox = new THREE.Box3().setFromObject(titan); // Get bounding box of Titan model
    const titanTop = titanBox.max.y;
    titanPos = new THREE.Vector3();
    titanPos.copy(titan.position);
    titanPos.y = titanTop - 10;
    scene.add(titan);
    lookAT = titanPos;
    cam.lookAt(titanPos);

    tl.to(titan.rotation, {
      y: Math.PI * 2,
      duration: 20,
    })
      .to(
        cam.position,
        {
          y: cam.position.y + 30,
          x: cam.position.x - 5,
          duration: 20,
        },
        "<"
      )
      .to(
        lookAT,
        {
          y: lookAT.y + 100,
          duration: 20,
          onUpdate: () => {
            cam.lookAt(lookAT);
          },
        },
        "<"
      );
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const pointLight = new THREE.PointLight(0xffffff, 100);
// pointLight.position.set(0, 5, 10);
scene.add(pointLight);

// "amb lighting"

const aLight = new THREE.PointLight(0xffffff, 20000);
aLight.position.set(0, 5, 100);
scene.add(aLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  const time = performance.now() * 0.0005;
  const radius = 10;

  pointLight.position.x = Math.sin(time) * radius;
  pointLight.position.z = Math.cos(time) * radius;
  pointLight.position.y = 10;
  if (pointLight.position.z < -2) {
    pointLight.intensity = 500;
  } else {
    pointLight.intensity = 100;
  }
  renderer.render(scene, cam);
}

animate();
