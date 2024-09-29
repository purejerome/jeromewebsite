const userAgent = navigator.userAgent;

gsap.registerPlugin(ScrollTrigger);

// pin the title to the screen for a cool fade effect.
gsap.from(".headingSection", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".headingSection",
    scrub: 2.5,
    pinSpacing: true,
    pin: true,
    start: `top ${
      document.querySelector(".headingSection").getBoundingClientRect().top
    }px`,
    end: `+=300px`,
  },
});

// Scroll through all the me's lol
let meScroll = gsap.fromTo(
  ".meSectionInner",
  {
    xPercent: 100,
  },
  {
    xPercent: -120,
  }
);

ScrollTrigger.create({
  trigger: ".meSectionOuter",
  animation: meScroll,
  pinSpacing: true,
  scrub: 1,
  pin: true,
  start: `top 40%`,
  end: () =>
    "+=" + document.querySelector(".meSectionInner").offsetWidth + "px",
});

// Observer to fade add in the me's
let mes = document.querySelectorAll(".meSectionInner span");
const meObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visibleMe");
      } else {
        e.target.classList.remove("visibleMe");
      }
    });
  },
  {
    threshold: 0.25,
  }
);

mes.forEach((me) => meObserver.observe(me));

// Creates animation to move SVG around letters

const buffer = fetch("./fonts/Lato-Bold.ttf").then((res) => res.arrayBuffer());

let font = opentype.parse(await buffer);

let lettersArray = [];
const rawLettersArray = document.querySelectorAll(".outerSpan span");
const header = document.querySelector(".creditHeader");
let creditFontSize = window
  .getComputedStyle(header)
  .getPropertyValue("font-size");
let letterOffset = setOffset();
let letterOffsetWidth = 0.2;
let s = Snap("#outersvg");
let path = s.select("#innerpath");
let spanElement = document.querySelector("#outersvg");
let pathElement = document.querySelector("#innerpath");
let letterToMorph;
let oldLetterIndex = -1;
let intervalID;
const tl = gsap.timeline({ defaults: { duration: 1 } });

function setOffset() {
  if (creditFontSize == "59.2px") {
    return 12.5;
  } else if (creditFontSize == "128px") {
    return 28;
  } else {
    return 44;
  }
}

function getPath(letter, height) {
  let text = letter;
  let fontSize = parseFloat(creditFontSize);
  let pathData = font
    .getPath(text, letterOffsetWidth, height - letterOffset, fontSize)
    .toPathData(2);
  if (letter == "i") {
    pathData = font
      .getPath(text, letterOffsetWidth, height - letterOffset - 0.5, fontSize)
      .toPathData(2);
  }
  return pathData;
}

rawLettersArray.forEach((letterSpan) => {
  let info = {};
  info.span = letterSpan;
  info.x = letterSpan.getBoundingClientRect().x;
  info.y =
    letterSpan.getBoundingClientRect().y -
    document.querySelector(".creditSection").getBoundingClientRect().y;
  info.path = getPath(letterSpan.textContent, letterSpan.clientHeight);
  lettersArray.push(info);
});

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function morphLetters() {
  let letterIndex = Math.floor(Math.random() * lettersArray.length);

  while (oldLetterIndex === letterIndex) {
    // incease there the random number is the same as the last
    letterIndex = Math.floor(Math.random() * lettersArray.length);
  }
  letterToMorph = lettersArray[letterIndex];
  let newHeight = letterToMorph.span.clientHeight;
  let newWidth = letterToMorph.span.clientWidth;
  spanElement.style.height = newHeight + "px";
  spanElement.style.width = newWidth + "px";
  let newColor = getRandomColor();
  tl.to(spanElement, {
    left: letterToMorph.x + "px",
    top: letterToMorph.y + "px",
    ease: "back.out(1.4)",
  }).to(
    pathElement,
    {
      stroke: newColor,
      fill: newColor,
    },
    "<"
  );
  spanElement.setAttribute("viewbox", `0 0 ${newWidth} ${newHeight}`);
  path.animate({ d: letterToMorph.path }, 1000, mina.easeinout, function () {
    document.querySelector("#innerpath").setAttribute("d", letterToMorph.path);
  });
  oldLetterIndex = letterIndex;
}

intervalID = setInterval(morphLetters, 1500);

window.addEventListener("resize", () => {
  let newCreditFontSize = window
    .getComputedStyle(header)
    .getPropertyValue("font-size");

  if (newCreditFontSize != creditFontSize) {
    creditFontSize = newCreditFontSize;
    letterOffset = setOffset();

    lettersArray.forEach((letterInfo) => {
      letterInfo.path = getPath(
        letterInfo.span.textContent,
        letterInfo.span.clientHeight
      );
    });
  }
  lettersArray.forEach((letterInfo) => {
    letterInfo.x = letterInfo.span.getBoundingClientRect().x;
    letterInfo.y =
      letterInfo.span.getBoundingClientRect().y -
      document.querySelector(".creditSection").getBoundingClientRect().y;
  });
  let newHeight = letterToMorph.span.clientHeight;
  let newWidth = letterToMorph.span.clientWidth;
  let newX = letterToMorph.x;
  let newY = letterToMorph.y;
  spanElement.style.height = newHeight;
  spanElement.style.width = newWidth;
  tl.clear();
  spanElement.style.left = newX;
  spanElement.style.top = newY;
  spanElement.setAttribute("viewbox", `0 0 ${newWidth} ${newHeight}`);
  document.querySelector("#innerpath").setAttribute("d", letterToMorph.path);
});

// elispse animation

const dots = document.querySelectorAll(".dot");
let animations = [];

function getAnimations() {
  dots.forEach((dot) => {
    animations.push(
      gsap.fromTo(
        dot,
        {
          yPercent: 0,
        },
        {
          yPercent: -50,
          yoyo: true,
          duration: 0.3,
          repeat: 1,
          yoyoEase: "bounce.out",
          ease: "power1.out",
        }
      )
    );
  });
}

getAnimations();

function removeDots() {
  dots.forEach((dot) => (dot.style.opacity = 0));
}

function showDot(dot, animation) {
  if (animation) {
    dot.style.opacity = 1;
    animation.restart();
  }
}

function dotAnimation() {
  removeDots();
  setTimeout(() => {
    setTimeout(() => showDot(dots[0], animations[0]), 400);
    setTimeout(() => showDot(dots[1], animations[1]), 700);
    setTimeout(() => showDot(dots[2], animations[2]), 1000);
  }, 200);
}

let dotAniTimer = setInterval(dotAnimation, 2000);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(intervalID);
    clearInterval(dotAniTimer);
    removeDots();
    animations.forEach((animation) => animation.kill());
    animations = [];
  } else {
    getAnimations();
    intervalID = setInterval(morphLetters, 1500);
    dotAniTimer = setInterval(dotAnimation, 2000);
  }
});
