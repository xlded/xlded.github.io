// /lakida/js/photosViewer.js

const photoViewer = document.getElementById("photoViewer");
const viewerImg = document.getElementById("viewerImg");

// GLOBAL function so photosCore.js can always call it
window.openViewer = function (src) {
  if (!photoViewer || !viewerImg) return;

  viewerImg.src = src;
  photoViewer.classList.remove("hidden");
};

// Click anywhere to close viewer
if (photoViewer) {
  photoViewer.addEventListener("click", () => {
    photoViewer.classList.add("hidden");
    viewerImg.src = "";
  });
}
