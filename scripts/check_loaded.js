let loadContainer = document.querySelector(".loadContainer");

window.addEventListener("load", () => {
  loadContainer.classList.add("loadGone");
  setTimeout(() => {
    document.body.removeChild(loadContainer);
  }, 3000);
});
