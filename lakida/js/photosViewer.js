const photoViewer = document.getElementById("photoViewer");
const viewerImg = document.getElementById("viewerImg");

function openViewer(src) {
  if (!viewerImg || !photoViewer) return;
  viewerImg.src = src;
  photoViewer.classList.remove("hidden");
}

if (photoViewer) {
  photoViewer.onclick = () => {
    photoViewer.classList.add("hidden");
    if (viewerImg) viewerImg.src = "";
  };
}
