let photoList = [];
let photoIndex = 0;
const batchSize = 8;

const photoOverlay = document.getElementById("photoOverlay");
const photoGrid = document.getElementById("photoGrid");

/* -------- Load photos.txt -------- */
async function loadPhotos() {
  const res = await fetch("photos.txt");
  const text = await res.text();

  photoList = text
    .split(";")
    .map(l => l.trim())
    .filter(Boolean);

  shuffle(photoList);
  photoIndex = 0;

  if (photoGrid) photoGrid.innerHTML = "";
  loadMorePhotos();
}

/* -------- Shuffle -------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* -------- Lazy batch loader -------- */
function loadMorePhotos() {
  if (!photoGrid) return;

  for (let i = 0; i < batchSize && photoIndex < photoList.length; i++) {
    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = photoList[photoIndex++];

    img.onclick = () => openViewer(img.src);

    photoGrid.appendChild(img);
  }
}

/* -------- Infinite scroll -------- */
if (photoOverlay) {
  photoOverlay.addEventListener("scroll", () => {
    if (
      photoOverlay.scrollTop + photoOverlay.clientHeight >=
      photoOverlay.scrollHeight - 200
    ) {
      loadMorePhotos();
    }
  });
}

/* -------- Open / Close -------- */
const photosBlock = document.querySelector('[data-function="photos"]');
if (photosBlock && photoOverlay) {
  photosBlock.onclick = () => {
    photoOverlay.classList.remove("hidden");
    loadPhotos();
  };
}

if (photoOverlay) {
  photoOverlay.onclick = e => {
    if (e.target === photoOverlay) {
      photoOverlay.classList.add("hidden");
    }
  };
}
