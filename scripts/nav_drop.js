import gsap from "gsap";
// drop down for nav
const dropLinks = document.querySelectorAll(".dropLinks a");
const dropLinksDividers = document.querySelectorAll(".dropLinks hr");
const normalLinks = document.querySelectorAll(".links a");

const dropLinkElement = document.querySelector(".dropLinks");
const navBarElement = document.querySelector(".navbar");
const hamburgerElement = document.querySelector(".hamburger button");

let totalHeight;

function getHeights() {
  totalHeight = 0;
  dropLinks.forEach((link) => (totalHeight += link.clientHeight));
  dropLinksDividers.forEach((div) => {
    const compStyle = window.getComputedStyle(div);
    const mT = parseFloat(compStyle.marginTop);
    const mB = parseFloat(compStyle.marginBottom);
    totalHeight = totalHeight + mT + mB;
  });
  totalHeight += 20;
}

hamburgerElement.addEventListener("click", () => {
  hamburgerElement.classList.toggle("activeBurger");
  dropLinkElement.classList.toggle("dropLinksView");
  if (dropLinkElement.classList.contains("dropLinksView")) {
    getHeights();
    dropLinkElement.style.setProperty("--totalCompHeight", `${totalHeight}px`);
  }
});

let prevY = window.scrollY;
window.onscroll = function () {
  let currY = window.scrollY;
  if (prevY > currY) {
    if (!dropLinkElement.classList.contains("dropLinksView")) {
      navBarElement.style.transform = "translateY(0%)";
    }
  } else {
    if (!dropLinkElement.classList.contains("dropLinksView")) {
      navBarElement.style.transform = "translateY(-150%)";
    }
  }
  prevY = currY;
};

window.addEventListener("resize", () => {
  getHeights();
  if (window.innerWidth >= 1061) {
    dropLinkElement.classList.remove("dropLinksView");
  }
});

// checks if you are already on the page
const path = window.location.pathname;

const links = document.querySelectorAll(".links a");
const hiddenLinks = document.querySelectorAll(".dropLinks a");

links.forEach((link) => {
  if (path.includes(link.getAttribute("href").replace(/\.\.\/|\.\//g, ""))) {
    link.classList.remove("navLinks");
    link.removeAttribute("href");
  }
});

hiddenLinks.forEach((link) => {
  if (path.includes(link.getAttribute("href").replace(/\.\.\/|\.\//g, ""))) {
    link.classList.remove("navLinks");
    link.removeAttribute("href");
  }
});

// Jerome title carousel

// increase speed of carousel animation
let currentSpeed = 2.5;
let title = document.querySelector(".title");
const sliders = document.querySelectorAll(".slider");
let hold = false;
let holdTime;

title.addEventListener("click", () => {
  if (!hold) {
    if (currentSpeed > 0.1) {
      sliders.forEach((slide) => (slide.style.animationPlayState = "paused"));
      title.style.color = "blue";
      let newSpeed = currentSpeed - 0.3;
      title.style.setProperty("--speed", newSpeed + "s");
      currentSpeed = newSpeed;
    } else {
      title.style.color = "red";
    }
    setTimeout(() => {
      title.style.color = "white";
      sliders.forEach((slide) => (slide.style.animationPlayState = "running"));
    }, 200);
  }
});

// checks if title was held or just clicked
title.addEventListener("mousedown", () => {
  holdTime = setTimeout(() => {
    hold = true;
  }, 500);
  sliders.forEach((slide) => (slide.style.animationPlayState = "paused"));
});

title.addEventListener("mouseup", () => {
  sliders.forEach((slide) => (slide.style.animationPlayState = "running"));
  clearInterval(holdTime);
  setTimeout(() => {
    hold = false;
  }, 1);
});

//create underline hover effect

function addUnderline(link) {
  if (link.classList.contains("navLinks")) {
    const underline = document.createElement("div");
    underline.classList.add("underline");
    link.appendChild(underline);
  }
}

function changeUnderLineColor(underline, color) {
  underline.style.setProperty("--bC", color);
}

function expandUnderLine(link) {
  if (link.classList.contains("navLinks")) {
    const underlineElement = link.querySelector(".underline");
    setTimeout(() => {
      changeUnderLineColor(underlineElement, getComputedStyle(link).color);

      gsap.to(underlineElement, {
        width: "100%",
        duration: 0.5,
        ease: "power4.out",
      });
    }, 100);
  }
}

function minimizeUnderLine(link) {
  if (link.classList.contains("navLinks")) {
    const underlineElement = link.querySelector(".underline");
    setTimeout(() => {
      changeUnderLineColor(underlineElement, getComputedStyle(link).color);

      gsap.to(underlineElement, {
        width: "0%",
        duration: 0.5,
        ease: "power4.out",
      });
    }, 100);
  }
}

function activeUnderLine(link) {
  if (link.classList.contains("navLinks")) {
    const underlineElement = link.querySelector(".underline");
    setTimeout(() => {
      changeUnderLineColor(underlineElement, getComputedStyle(link).color);
    }, 100);
  }
}

dropLinks.forEach((link) => {
  addUnderline(link);
});
normalLinks.forEach((link) => {
  addUnderline(link);
  link.addEventListener("mouseover", () => {
    expandUnderLine(link);
  });
  link.addEventListener("mouseout", () => {
    minimizeUnderLine(link);
  });
  link.addEventListener("mousedown", () => {
    activeUnderLine(link);
  });
  link.addEventListener("mouseup", () => {
    activeUnderLine(link);
  });
});
