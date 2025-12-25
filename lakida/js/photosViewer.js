let photoList = [];
let photoIndex = 0;
const batchSize = 20;

const photoOverlay = document.getElementById("photoOverlay");
const photoPanel = document.getElementById("photoPanel"); // <-- add id in HTML
const photoGrid = document.getElementById("photoGrid");

let loadingMore = false;
let loadedOnceThisOpen = false;

/* -------- Load photos.txt -------- */
async function loadPhotos() {
  const res = await fetch("photos.txt", { cache: "no-store" });
  const text = await res.text();

  photoList = text
    .split(";")
    .map(l => l.trim())
    .filter(Boolean);

  shuffle(photoList);
  photoIndex = 0;

  if (photoGrid) photoGrid.innerHTML = "";
  loadedOnceThisOpen = true;

  loadMorePhotos(); // first batch
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
  if (loadingMore) return;
  if (photoIndex >= photoList.length) return;

  loadingMore = true;

  // Add one batch
  for (let i = 0; i < batchSize && photoIndex < photoList.length; i++) {
    const src = photoList[photoIndex++];

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = src;

    // click-to-zoom (requires photosViewer.js loaded before this file)
    img.addEventListener("click", () => openViewer(src));

    photoGrid.appendChild(img);
  }

  loadingMore = false;
}

/* -------- Infinite scroll (on the actual scroll container) -------- */
function onPanelScroll() {
  if (!photoPanel) return;

  const nearBottom =
    photoPanel.scrollTop + photoPanel.clientHeight >= photoPanel.scrollHeight - 300;

  if (nearBottom) {
    loadMorePhotos();
  }
}

if (photoPanel) {
  photoPanel.addEventListener("scroll", onPanelScroll);
}

/* -------- Open / Close -------- */
const photosBlock = document.querySelector('[data-function="photos"]');

if (photosBlock && photoOverlay) {
  photosBlock.addEventListener("click", async () => {
    photoOverlay.classList.remove("hidden");

    // reset scroll position each open (optional but nice)
    if (photoPanel) photoPanel.scrollTop = 0;

    // fetch/reload fresh each open
    loadedOnceThisOpen = false;
    await loadPhotos();
  });
}

if (photoOverlay) {
  // click outside panel closes
  photoOverlay.addEventListener("click", e => {
    if (e.target === photoOverlay) {
      photoOverlay.classList.add("hidden");
    }
  });
}
