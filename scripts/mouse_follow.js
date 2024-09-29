import * as THREE from "three";

let xOff = innerWidth > 800 ? 1.5 : 1;
const canv = document.querySelector("#me");
let rect = canv.getBoundingClientRect();
let center = canv.offsetTop + canv.offsetHeight / 2;

window.addEventListener("resize", () => {
  rect = canv.getBoundingClientRect();
  center = canv.offsetTop + canv.offsetHeight / 2;
  xOff = innerWidth > 800 ? 1.5 : 1;
});

function mouse_follow(object, cam) {
  let mouseX = 0,
    mouseY = 0;
  const mouse = new THREE.Vector2();
  const target = new THREE.Vector3();

  window.addEventListener("mousemove", (event) => {
    gsap.killTweensOf(object.rotation);
    mouseX = event.clientX;
    mouseY = event.clientY + window.scrollY - center;

    mouse.x = -((mouseX / (innerWidth * xOff)) * 2 - 1);
    mouse.y = -(-(mouseY / innerHeight) * 0.6);

    // Convert screen coordinates to Three.js world coordinates
    const vector = new THREE.Vector3(mouse.x, mouse.y, 2);
    vector.unproject(cam);

    // Calculate direction and distance
    const dir = vector.sub(cam.position).normalize();
    const distance = 100; // Adjust this value to control the z movement range
    target.copy(cam.position).add(dir.multiplyScalar(distance));
    object.lookAt(target);
  });
}

export default mouse_follow;
