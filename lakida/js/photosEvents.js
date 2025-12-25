import { loadPhotos, loadMorePhotos, openViewer } from "./photosLoad.js";
import { photoOverlay, photoViewer, viewerImg } from "./photosCore.js";

document.querySelector('[data-function="photos"]').onclick = () => {
  photoOverlay.classList.remove("hidden");
  loadPhotos();
};

photoOverlay.addEventListener("scroll", () => {
  if (photoOverlay.scrollTop + photoOverlay.clientHeight >= photoOverlay.scrollHeight - 200) {
    loadMorePhotos();
  }
});

photoOverlay.onclick = e => {
  if (e.target === photoOverlay) photoOverlay.classList.add("hidden");
};

photoViewer.onclick = () => {
  photoViewer.classList.add("hidden");
  viewerImg.src = "";
};
