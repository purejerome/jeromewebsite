import gsap from "gsap";

function reset_rotaion(object, targetRotation) {
  gsap.to(object.rotation, {
    x: targetRotation.x,
    y: targetRotation.y,
    z: targetRotation.z,
    duration: 1.5,
    ease: "elastic.out",
  });
}

export default reset_rotaion;
