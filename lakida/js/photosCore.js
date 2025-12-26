// /lakida/js/photosCore.js

let photoList = [];
let photoIndex = 0;
const batchSize = 20;
let loading = false;

const photoOverlay = document.getElementById("photoOverlay");
const photoPanel = document.getElementById("photoPanel");
const photoGrid = document.getElementById("photoGrid");

/* ---------- Load photos.txt ---------- */
async function loadPhotos() {
  if (!photoGrid) return;

  const res = await fetch("photos.txt", { cache: "no-store" });
  const text = await res.text();

  photoList = text
    .split(";")
    .map(s => s.trim())
    .filter(Boolean);

  shuffle(photoList);
  photoIndex = 0;
  photoGrid.innerHTML = "";

  loadMorePhotos();
}

/* ---------- Shuffle ---------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* ---------- Load batch ---------- */
function loadMorePhotos() {
  if (loading) return;
  if (photoIndex >= photoList.length) return;
  if (!photoGrid) return;

  loading = true;

  for (let i = 0; i < batchSize && photoIndex < photoList.length; i++) {
    const src = photoList[photoIndex++];

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = src;

    img.addEventListener("click", (e) => {
      e.stopPropagation(); // VERY important
      if (typeof window.openViewer === "function") {
        window.openViewer(src);
      }
    });

    photoGrid.appendChild(img);
  }

  loading = false;
}

/* ---------- Open Photos overlay ---------- */
const photosBlock = document.querySelector('[data-function="photos"]');

if (photosBlock && photoOverlay && photoPanel) {
  photosBlock.addEventListener("click", async () => {
    photoOverlay.classList.remove("hidden");
    photoPanel.scrollTop = 0;
    await loadPhotos();
  });
}

/* ---------- Infinite scroll ---------- */
if (photoPanel) {
  photoPanel.addEventListener("scroll", () => {
    const nearBottom =
      photoPanel.scrollTop + photoPanel.clientHeight >=
      photoPanel.scrollHeight - 300;

    if (nearBottom) {
      loadMorePhotos();
    }
  });
}

/* ---------- Click outside panel to close ---------- */
if (photoOverlay) {
  photoOverlay.addEventListener("click", (e) => {
    if (e.target === photoOverlay) {
      photoOverlay.classList.add("hidden");
    }
  });
}
