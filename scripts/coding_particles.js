const splitDomain = window.location.pathname.split("/");
const pageName = splitDomain.at(-1);
console.log(splitDomain);
console.log(pageName);
let dots = "/";
if (pageName.length != 0 && pageName != "index.html") {
  console.log("in1");
  dots = "../";
} else if (splitDomain.includes("jeromewebsite")) {
  console.log("in");
  dots = "/jeromewebsite/";
} // << hey github pages i made changes man y
const imagePath = `${dots}images/coding_logos/`; // << hey lets changed ok??
const imageArray = [
  `${imagePath}html_icon.png`,
  `${imagePath}css_icon.png`,
  `${imagePath}java_icon.png`,
  `${imagePath}javascript_icon.png`,
  `${imagePath}python_icon.png`,
  `${imagePath}react_icon.png`,
  `${imagePath}C_icon.png`,
];

let imageIndex = 0;
let isProcessing = false;
let lastX = 0;
const barrier = document.body.clientHeight - 48;

document.body.addEventListener("mousemove", (event) => {
  if (isProcessing) return;
  isProcessing = true;
  let x = event.clientX;
  let y = event.clientY;

  let yOffset = window.scrollY + y;
  if (yOffset > barrier) {
    yOffset -= 48;
  }

  let img = document.createElement("img");
  img.src = imageArray[imageIndex];
  if (imageIndex == 6) {
    imageIndex = 0;
  } else {
    imageIndex++;
  }
  img.classList.add("particleImage");
  img.style.setProperty("--leftOff", x + "px");
  img.style.setProperty("--topOff", yOffset + "px");
  if (x > lastX) {
    img.style.transform = "translateX(-100%)";
  }
  lastX = x;
  document.body.appendChild(img);
  setTimeout(() => {
    img.style.opacity = 0;
  }, 400);
  setTimeout(() => {
    document.body.removeChild(img);
  }, 700);
  setTimeout(() => {
    isProcessing = false;
  }, 80);
});
