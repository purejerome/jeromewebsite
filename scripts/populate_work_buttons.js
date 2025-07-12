//add buttons on screen
gsap.registerPlugin(ScrollTrigger);
const fullInfoContainer = document.querySelector(".fullInfoContainer");
const imagePath = "../images/";
const imageButPath = `${imagePath}button_images/`;
const imageContPath = `${imagePath}contact_images/`;
const videoPath = "../videos/";
const imageEnding = "_image.png";
const exitButton = document.querySelector(".exit");
const tempDiv = document.createElement("div");
const p = document.createElement("p");

const loader = document.createElement("div");
loader.classList.add("loader");

const infoWrap = tempDiv.cloneNode();
infoWrap.classList.add("infoWrapper");

const imgWrap = tempDiv.cloneNode();
imgWrap.classList.add("innerFullInfoContainer");
imgWrap.classList.add("imgContainer");
imgWrap.classList.add("blackBubble");
imgWrap.appendChild(loader);

const textWrap = tempDiv.cloneNode();
textWrap.classList.add("innerFullInfoContainer");
textWrap.classList.add("textContainer");
textWrap.classList.add("blackBubble");
textWrap.appendChild(p);

function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const icons = document.querySelectorAll(".projIcon");
icons.forEach((icon) => {
  icon.addEventListener("mouseover", handleEnter);
  icon.addEventListener("mousemove", debounce(handleIconHover, 6));
  icon.addEventListener("mouseleave", handleLeave);
});

let tm;

// to do, make it so text content is an array, and you add paragraphs based on that,
// as well as posibly make it so video media is a array with mp4 webmd etc?

// page data
const workButtonData = [
  {
    id: "MusicCPR",
    coverImg: `${imageButPath}MusicCPR${imageEnding}`,
    pageCount: 4,
    content: [
      {
        mediaType: "image",
        media: `${imageButPath}MusicCPR${imageEnding}`,
        textContent:
          "MusicCPR is a research project I volunteered on with my professor, Michael Stewart. The site was made to help music professors effectively teach their classes and research which methods best improve the quality of learning with students. I worked as a front-end web developer and helped improve the look and functionality of the site.",
      },
      {
        mediaType: "video",
        media: `${videoPath}aboutpage.mp4`,
        textContent:
          "Specifically, I worked on things such as adding waveforms to audio submissions, improving the look of the landing page as well as the about page, adding a carousel for the contributors, and using ESLint to fix style errors and bugs found in the code. My repository branch can be found at the link below, and the official site can be found on my GitHub page.",
        link: "https://github.com/Lab-Lab-Lab/CPR-Music-purejerome",
        linkTitle: "My MusicCPR work",
        downloadable: false,
      },
      {
        mediaType: "video",
        media: `${videoPath}signoutpage.mp4`,
        textContent: "Some work I did on the sign out and sign in pages.",
      },
      {
        mediaType: "video",
        media: `${videoPath}landingpage.mp4`,
        textContent: "Some work I did on the landing page.",
      },
    ],
  },
  {
    id: "SHOWSCOPE",
    coverImg: `${imageButPath}SHOWSCOPE${imageEnding}`,
    pageCount: 3,
    content: [
      {
        mediaType: "video",
        media: `${videoPath}SHOWSCOPEshort.mp4`,
        textContent:
          "SHOWSCOPE is a group project I worked on in my CS 343 (Application Development) class. We wanted to make a website to explore popular shows, movies, and anime for the user to explore and rate.",
      },
      {
        mediaType: "video",
        media: `${videoPath}SHOWSCOPElanding.mp4`,
        textContent:
          "In this project, I worked on the landing page and its carousel, the APIs to display the top anime and movies, the JSON functionality of reviews on the profile page, and the about page.",
      },
      {
        mediaType: "video",
        media: `${videoPath}SHOWSCOPEprofile.mp4`,
        textContent:
          "Below is a link to the page where you can visit and play around with it yourself. The most impressive part, in my opinion, is adding and changing the reviews, as well as having them save each visit.",
        link: "https://343s24.github.io/final-project-nick-jerome-nicky/index.html",
        linkTitle: "SHOWSCOPE",
        downloadable: false,
      },
    ],
  },
  {
    id: "UnitED",
    coverImg: `${imageButPath}UnitED${imageEnding}`,
    pageCount: 3,
    content: [
      {
        mediaType: "image",
        media: `${imageContPath}unitedthumb.png`,
        textContent:
          "UnitED was a group project I worked on in my CS 345 (Software Development) class. We were tasked to build a calculator that could not only perform calculations but also save a history of them and print as well, as well as create custom settings, work with units and custom units, and have a custom help page for the calculator.",
      },
      {
        mediaType: "video",
        media: `${videoPath}calchelp.mp4`,
        textContent:
          "The main parts of the project I worked on were the custom help page, the about page, the button logic, as well as the logic for multiplication, exponents, simplification, decimals, and some of the custom settings. We worked in an agile environment, having scrum meetings every week to show our progress and discuss our next moves.",
      },
      {
        mediaType: "video",
        media: `${videoPath}calcdemo.mp4`,
        textContent: "Here are most of the other features of the calculator!",
      },
    ],
  },
  {
    id: "Y86",
    coverImg: `${imageButPath}Y86${imageEnding}`,
    pageCount: 1,
    content: [
      {
        mediaType: "image",
        media: `${imageButPath}Y86${imageEnding}`,
        textContent:
          "This project was made in my CS 261 (Computer Systems I) class, which was split into four cumulative parts over the whole semester. We basically simulated everything that had to do with the Y86 architecture, which included memory, the instruction set, the CPU, and much more. Below is a link to download the source code for part four of the project.",
        link: "../misc/CS261PROJ.zip",
        linkTitle: "CS 261 PROJECT",
        downloadable: true,
        downloadTitle: "CS261PROJ.zip",
      },
    ],
  },
  {
    id: "GPS",
    coverImg: `${imageButPath}GPS${imageEnding}`,
    pageCount: 4,
    content: [
      {
        mediaType: "video",
        media: `${videoPath}GRID.mp4`,
        textContent: `
          Created a GPS system for Rockingham County to find routes between differnet addresses for my CS 480 class.
          I used many differnet techniques such as Dijkstra's algorithm, map matching, route recalculation,
          initializing a grid of intersections, streets, and street segements from a CSV file,
          used map projection to change incoming GPGGA data into points could plot and more.
        `,
      },
      {
        mediaType: "video",
        media: `${videoPath}SURROUNDING_SEGS.mp4`,
        textContent: `
          This section shows how I used the GPS system to find the surrounding segments of a street segment.
          I broke the entire map into a grid, and searched a 3x3 grid to find the closest street segment
          to the GPS data that was being received.
        `,
      },
      {
        mediaType: "video",
        media: `${videoPath}MAP_MATCH.mp4`,
        textContent: `
          This section shows how I used the GPS system to match the GPS data to a street segment, that was actually printed,
          to prevent the dot from being off the road. I used  a combination of intertia points to prevent
          an abundance of boucning, as well as spliting each grid into its own thread to compare the closest
          segment to match the dot to(the blue dot is the map matched point)(Also I will admit, as you can see, this was
          definitely the part I struggled with the most).
        `,
      },
      {
        mediaType: "video",
        media: `${videoPath}PATH_FINDING.mp4`,
        textContent: `
          This section shows some simple path finding. By far the simplest part of the project,
          I used both label setting(Dijkstra's algorithm) and label correcting algorithms to find the shortest path.
          I also created many different data structures to hold the data and find the smallest label
          such as a list, buckets, and a priority queue.
        `,
      },
    ],
  },
  {
    id: "SPREADSHEET",
    coverImg: `${imageButPath}SPREADSHEET${imageEnding}`,
    pageCount: 1,
    content: [
      {
        mediaType: "video",
        media: `${videoPath}spreadsheet.mp4`,
        textContent: `
            For my CS 430 class, I created a spreadsheet application that could perform basic functions such as addition, subtraction, multiplication, and division.
            As well as the ability to run my own coding language to perform more complex functions such as loops, conditionals, and variables,
            and referncing cells as variables in other cells.
            This used a combination of lexing, parsing, creating my own interpreter, GUI, and coding logic
            to allow the spreadsheet to work.
          `,
      },
    ],
  },
  {
    id: "TASYNC",
    coverImg: `${imageButPath}TASYNC${imageEnding}`,
    pageCount: 4,
    content: [
      {
        mediaType: "video",
        media: `${videoPath}educator.mp4`,
        textContent: `
          This was a website I created in a team for my CS 347 class. It was made to help us understand how
          frontend and backend communication works, as well as how to use Docker, Django, and React.
          I worked on both the frontend and backend, crate API calls, and view models to help edit, view
          delete, and create data.
        `,
      },
      {
        mediaType: "video",
        media: `${videoPath}ta.mp4`,
        textContent: `
          The site was made to help educators, students, and TAs to set up times for TA hours.
          We had the ability to visualize the TA's schedule, as well as the educator's schedules.
        `,
      },
      {
        mediaType: "video",
        media: `${videoPath}student.mp4`,
        textContent: `
          Students and TAs could join a session and lock in their slot for the TA hours. This
          was used to help orginize and streamline the process of TA hours. Students also have the
          ability to ask questions, allowing the TA or educators to answer them depending on each subject.
        `,
      },
      {
        mediaType: "video",
        media: `${videoPath}swap.mp4`,
        textContent: `
          The TAs had the ability to swap their time slots with other TAs, allowing them to
          have more flexibility in their schedules. This was done by creating a swap request, which
          would then be sent to the other TA, who could then accept or reject the request. Upon acceptance or rejection,
          the other TA would be notified, and the swap would be made, and the swap would be deleted in the backend.
        `,
      },
    ],
  },
  {
    id: "AutoRE",
    coverImg: `${imageButPath}AutoRE${imageEnding}`,
    pageCount: 2,
    content: [
      {
        mediaType: "image",
        media: `${imageButPath}AutoRE${imageEnding}`,
        textContent: `
        AutoRE is a tool I created to help automate the process of clicking through a
        site called RepostExchange. It was made to help automate the process of reposting as I used it to make connections
        with other artists. I love music and wanted an easier way to repost others music and create connections.
        It was created using JavaScript and the Chrome extension API, and it works by screening the page and
        clicking the porper buttons needed to repost campaigns and requests.
        `,
        link: "https://github.com/purejerome/AutoRE",
        linkTitle: "AutoRE Github",
        downloadable: false,
      },
      {
        mediaType: "video",
        media: `${videoPath}AutoRE_walkthrough.mp4`,
        textContent: `
          This is a short walkthrough of the extension, showing how it works.
          It handles up to six errors need be before stopping, and it sending information regarding
          the amount of reposts and errors found to the extension from the content script on the site.
        `,
      },
    ],
  },
];

// exit button functionality
exitButton.addEventListener("click", () => {
  fullInfoContainer.classList.remove("visible");
  exitButton.classList.remove("visible");
  // tm = setTimeout(() => {
  //   document.body.style.overflowY = "auto";
  // }, 500);
});

// uses page data to populate the page
function populateInfo(data) {
  const wrappers = fullInfoContainer.querySelectorAll(".infoWrapper");
  fullInfoContainer.scrollTo(0, 0);

  wrappers.forEach((wrapper) => wrapper.remove());

  const pageCount = data.pageCount;

  for (let x = 0; x < pageCount; x++) {
    let infoW = infoWrap.cloneNode();
    let imgW = imgWrap.cloneNode(true);
    let textW = textWrap.cloneNode(true);
    const media =
      data.content[x].mediaType === "image"
        ? document.createElement("img")
        : data.content[x].mediaType === "video"
        ? document.createElement("video")
        : undefined;
    let text = textW.querySelector("p");
    let link = document.createElement("a");

    if (data.content[x].mediaType === "video") {
      media.loop = true;
      media.autoplay = true;
      media.muted = true;
      media.playsInline = true;
      media.addEventListener("loadedmetadata", () => {
        media.playbackRate = 2;
      });
    }
    text.textContent = data.content[x].textContent;
    media.src = data.content[x].media;
    if (data.content[x].link !== null) {
      link.href = data.content[x].link;
      link.textContent = data.content[x].linkTitle;
      if (data.content[x].downloadable) {
        link.download = data.content[x].downloadTitle;
      } else {
        link.target = "_blank";
      }
      textW.appendChild(link);
    }
    imgW.appendChild(media);

    infoW.appendChild(x % 2 == 0 ? imgW : textW);
    infoW.appendChild(x % 2 == 0 ? textW : imgW);

    fullInfoContainer.appendChild(infoW);
  }
}

// get data based on button pressed
workButtonData.forEach((data) => {
  const button = document.getElementById(data.id);
  button.style.backgroundImage = `url(${data.coverImg})`;
  button.addEventListener("click", () => {
    // clearTimeout(tm);
    fullInfoContainer.classList.add("visible");
    exitButton.classList.add("visible");
    // document.body.style.overflowY = "hidden";
    populateInfo(data);
  });
});

let h_x = 0;
let h_y = 0;

function handleIconHover(event) {
  const icon = event.target;
  const shadow = icon.querySelector(".shadow");
  const { clientX: mouseX, clientY: mouseY } = event;
  const { left, top, width, height } = icon.getBoundingClientRect();
  let comp = window.getComputedStyle(icon);
  const matrix =
    comp.getPropertyValue("transform") || "matrix32(1, 0, 0, 0, 0, 1)";
  const scale_values = matrix
    .match(/[matrix3d, matrix]\((.+)\)/)[1]
    .split(", ");
  const scale_x = scale_values[0];
  const scale_y = scale_values[5];

  const centerX = left + width / 2;
  const centerY = top + height / 2;

  const deltaX = mouseX - centerX;
  const deltaY = mouseY - centerY;
  const rotateX = (deltaY / height) * 40;
  const rotateY = (deltaX / width) * -40;
  shadow.style.left = `${(mouseX - left - shadow.offsetWidth / 2) / scale_x}px`;
  shadow.style.top = `${(mouseY - top - shadow.offsetHeight / 2) / scale_y}px`;
  shadow.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  h_x = rotateX;
  h_y = rotateY;
}

function handleEnter(event) {
  const icon = event.target;
  icon.classList.add("hovering");
  const shadow = icon.querySelector(".shadow");
  const overlay = icon.querySelector(".overlay");
  shadow.style.opacity = "1";
  shadow.style.visibility = "visible";
  overlay.style.opacity = "1";
  overlay.style.visibility = "visible";
}

function handleLeave(event) {
  const icon = event.target;
  icon.classList.remove("hovering");
  const shadow = icon.querySelector(".shadow");
  const overlay = icon.querySelector(".overlay");

  shadow.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;
  shadow.style.opacity = "0";
  shadow.style.visibility = "hidden";
  overlay.style.opacity = "0";
  overlay.style.visibility = "hidden";
}

//icon scrolling
let hor_scroll = window.innerWidth > 800;
let proj_container = document.querySelector(".projContainer");
let container_dim = hor_scroll
  ? proj_container.clientWidth
  : proj_container.clientHeight;
let icon_dim = hor_scroll ? icons[0].clientWidth : icons[0].clientHeight * 2;
let total_dim = icons.length * icon_dim;

let cur_scroll_pos = 0;
let last_scroll_pos = 0;
let smooth_scroll = 0;

const lin_interp = (start, end, factor) => start * (1 - factor) + end * factor;

const adjustIcons = (scroll) => {
  let main_dir = hor_scroll ? "x" : "y";
  gsap.set(icons, {
    [main_dir]: (index) => index * icon_dim + scroll,
    modifiers: {
      [main_dir]: (dir) => {
        const wrapped_dir = gsap.utils.wrap(
          -icon_dim,
          total_dim - icon_dim,
          parseInt(dir)
        );
        return `${wrapped_dir}px`;
      },
    },
  });
};
adjustIcons(0);

const onWheelScroll = (event) => {
  if (hor_scroll) {
    cur_scroll_pos -= event.deltaX;
  } else {
    cur_scroll_pos -= event.deltaY;
  }
};

let startPos = 0;
let cur_pos = 0;
let isDragging = false;

const onDragStart = (event) => {
  if (hor_scroll) {
    startPos = event.clientX || event.touches[0].clientX;
  } else {
    startPos = event.clientY || event.touches[0].clientY;
  }
  isDragging = true;
  proj_container.classList.add("is_dragging");
};

const onDragMove = (event) => {
  if (!isDragging) return;
  if (hor_scroll) {
    cur_pos = event.clientX || event.touches[0].clientX;
  } else {
    cur_pos = event.clientY || event.touches[0].clientY;
  }
  cur_scroll_pos += (cur_pos - startPos) * 3;
  startPos = cur_pos;
};
const onDragEnd = () => {
  isDragging = false;
  proj_container.classList.remove("is_dragging");
};

let count = 0;
let lastCall = 0;
const throttleTime = 40;
let cache = [];

const animate = () => {
  smooth_scroll = lin_interp(smooth_scroll, cur_scroll_pos, 0.1);
  adjustIcons(smooth_scroll);

  const scroll_speed = smooth_scroll - last_scroll_pos;
  last_scroll_pos = smooth_scroll;
  let currentTime = performance.now();
  if (currentTime - lastCall > throttleTime) {
    lastCall = currentTime;
    gsap.to(icons, {
      scale: (index) => {
        const rect = icons[index].getBoundingClientRect();
        const dis = Math.abs(rect.x + rect.width / 2 - window.innerWidth / 2);

        const raw = 1 - (dis * 0.6) / (window.innerWidth / 2);

        return gsap.utils.clamp(0.6, 1, raw);
      },
      rotation: (index) => {
        return !icons[index].classList.contains("hovering")
          ? scroll_speed * 0.2
          : 0;
      },
      rotationX: (index) => {
        return icons[index].classList.contains("hovering") ? h_x : 0;
      },
      rotationY: (index) => {
        return icons[index].classList.contains("hovering") ? h_y : 0;
      },
    });
  }
  requestAnimationFrame(animate);
};

animate();

proj_container.addEventListener("mousewheel", onWheelScroll);
proj_container.addEventListener("touchstart", onDragStart);
proj_container.addEventListener("touchmove", onDragMove);
proj_container.addEventListener("touchend", onDragEnd);
proj_container.addEventListener("mousedown", onDragStart);
proj_container.addEventListener("mousemove", onDragMove);
proj_container.addEventListener("mouseleave", onDragEnd);
proj_container.addEventListener("mouseup", onDragEnd);
proj_container.addEventListener("selectstart", () => false);
proj_container.addEventListener("mousewheel", handleScrollLeave);
proj_container.addEventListener("scroll", handleScrollLeave);

function handleScrollLeave(event) {
  icons.forEach((icon) => {
    icon.style.pointerEvents = "none";
  });
  icons.forEach((icon, index) => {
    if (icon.classList.contains("hovering")) {
      let { left, top, width, height } = icon.getBoundingClientRect();
      let del_x = event.clientX;
      let del_y = event.clientY;
      if (
        del_x < left ||
        del_x > left + width ||
        del_y < top ||
        del_y > top + height
      ) {
        icon.classList.remove("hovering");
        const shadow = icon.querySelector(".shadow");
        const overlay = icon.querySelector(".overlay");
        setTimeout(() => {
          shadow.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;
          shadow.style.opacity = "0";
          shadow.style.visibility = "hidden";
          overlay.style.opacity = "0";
          overlay.style.visibility = "hidden";
        }, 130);
      }
    }
  });
  setTimeout(() => {
    icons.forEach((icon) => {
      icon.style.pointerEvents = "auto";
    });
  }, 130);
}

window.addEventListener("resize", () => {
  let old_hor_scroll = hor_scroll;
  if (window.innerWidth > 800) {
    hor_scroll = true;
    icon_dim = icons[0].clientWidth;
    container_dim = proj_container.clientWidth;
  } else {
    hor_scroll = false;
    icon_dim = icons[0].clientHeight * 2;
    container_dim = proj_container.clientHeight;
  }
  if (old_hor_scroll != hor_scroll) {
    gsap.set(icons, {
      x: 0,
      y: 0,
    });
  }
  total_dim = icons.length * icon_dim;
  adjustIcons(0);
});
