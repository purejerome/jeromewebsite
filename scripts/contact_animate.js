// animate arrows
const arrowTween = gsap.fromTo(
  ".arrow",
  { y: "-10px" },
  { y: "10px", duration: 0.6, repeat: -1, yoyo: true, yoyoEase: "none" }
);

let emailTween;
let phoneTween;

const stepArray = [28, 14, 5, 10, 3, 1, 8];
const startArray = ["start", "end", "random", "center"];

// animate my email sentence

function playAnimation() {
  const randomStep = stepArray[Math.floor(Math.random() * 7)];
  const randomStart = startArray[Math.floor(Math.random() * 4)];

  if (emailTween) {
    emailTween.kill();
  }

  if (phoneTween) {
    phoneTween.kill();
  }
  emailTween = gsap.to(".emailContainer .word span", {
    y: "-20px",
    yoyo: true,
    yoyoEase: "bounce",
    ease: "expo.out",
    repeat: 1,
    stagger: {
      from: `${randomStart}`,
      ease: `steps(${randomStep})`,
      each: 0.04,
    },
    duration: 1.5,
  });

  phoneTween = gsap.to(".phoneNumberContainer .word span", {
    y: "-20px",
    yoyo: true,
    yoyoEase: "bounce",
    ease: "expo.out",
    repeat: 1,
    stagger: {
      from: `${randomStart}`,
      ease: `steps(${randomStep})`,
      each: 0.04,
    },
    duration: 1.5,
  });
}
playAnimation();
let emailInterval = setInterval(playAnimation, 10000);

// kills animation on window visibility change

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(emailInterval);
    arrowTween.pause();
    emailTween.restart();
    emailTween.kill();
    phoneTween.restart();
    phoneTween.kill();
  } else {
    playAnimation();
    arrowTween.resume();
    emailInterval = setInterval(playAnimation, 10000);
  }
});
