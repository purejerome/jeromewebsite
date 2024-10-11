//add buttons on screen
const fullInfoContainer = document.querySelector(".fullInfoContainer");
const imagePath = "../images/";
const imageButPath = `${imagePath}button_images/`;
const imageContPath = `${imagePath}contact_images/`;
const videoPath = "../videos/";
const imageEnding = "_image.png";
const exitButton = fullInfoContainer.querySelector(".exit");
const tempDiv = document.createElement("div");
const p = document.createElement("p");

const infoWrap = tempDiv.cloneNode();
infoWrap.classList.add("infoWrapper");

const imgWrap = tempDiv.cloneNode();
imgWrap.classList.add("innerFullInfoContainer");
imgWrap.classList.add("imgContainer");

const textWrap = tempDiv.cloneNode();
textWrap.classList.add("innerFullInfoContainer");
textWrap.classList.add("textContainer");
textWrap.appendChild(p);

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
          "MusicCPR is a research project I volunteered on with my professor Michael Stewart." +
          " The site was made to help music professors effectively teach their classes, and research which methods best improve quality of learning with students." +
          " I worked a front end web developer and helped improve the look and funcionality of the site.",
      },
      {
        mediaType: "video",
        media: `${videoPath}aboutpage.mp4`,
        textContent:
          "Specifically, I worked on things such as adding wave forms to audio submissions" +
          " improving the look of the landing page, as well as the about page, adding a carousel for the contributers," +
          " and using eslint to fix style errors and bugs found in the code." +
          " My branch of the repository can be found in the link below, and the offical site can be found on my GitHub page",
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
          "SHOWSCOPE is a group project I worked on in my CS 343(Application Development) class." +
          " We wanted to make a website to explore popular shows, movies, and anime for the user to explore and rate. ",
      },
      {
        mediaType: "video",
        media: `${videoPath}SHOWSCOPElanding.mp4`,
        textContent:
          "In this project, I worked on the landing page and its carousel, the API's to display the top anime and movies," +
          " the JSON functionality of reviews on the profile page, and the about page.",
      },
      {
        mediaType: "video",
        media: `${videoPath}SHOWSCOPEprofile.mp4`,
        textContent:
          "Below is a link to the page where you can visit and play around with it yourself." +
          " The most impressive part in my opinion is adding and changing the reviews, as well as having them save each visit.",
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
          "UnitED was a group project I worked on in my CS 345(Software Development) class." +
          " We were tasked to build a calculator that could not only perform caluclations, but save a history of them," +
          " and print as well, as well as creating custom settings, work with units and custom units, and a custom help page for the calculator.",
      },
      {
        mediaType: "video",
        media: `${videoPath}calchelp.mp4`,
        textContent:
          "The main parts of the project I worked on were the custom help page, about page, the button logic, as well as" +
          "  the logic for multiplcation, exponents, simplification, decimals, and some of the custom settings." +
          " We worked in an agile enviornment, having scrum meetings every week to show our progress, and discuss our next moves. ",
        // link: "../misc/united.jar",
        // linkTitle: "UnitED Jar File",
        // downloadable: true,
        // downloadTitle: "UnitED.jar",
      },
      {
        mediaType: "video",
        media: `${videoPath}calcdemo.mp4`,
        textContent: "Here is most of the other features of the calculator!",
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
          "This project was made in my CS 261(Computer Systems I) class which was split into four cumulitve parts over the whole semester." +
          " We basically simluated everything that had to do with the Y86 architecture, which include memory," +
          " the instruction set, the CPU and much more. Below is a link to download the source code for part four of the porject.",
        link: "../misc/CS261PROJ.zip",
        linkTitle: "CS 261 PROJECT",
        downloadable: true,
        downloadTitle: "CS261PROJ.zip",
      },
    ],
  },
];

// exit button functionality
exitButton.addEventListener("click", () => {
  fullInfoContainer.classList.remove("visible");
  tm = setTimeout(() => {
    document.body.style.overflowY = "auto";
  }, 500);
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
    clearTimeout(tm);
    fullInfoContainer.classList.add("visible");
    document.body.style.overflowY = "hidden";
    populateInfo(data);
  });
});
