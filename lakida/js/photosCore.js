(function () {
  let photoList = [];
  let photoIndex = 0;
  const batchSize = 20;

  let loadingMore = false;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  async function loadPhotos(photoGrid) {
    const res = await fetch("photos.txt");
    const text = await res.text();

    photoList = text
      .split(";")
      .map(l => l.trim())
      .filter(Boolean);

    shuffle(photoList);
    photoIndex = 0;

    photoGrid.innerHTML = "";
    loadMorePhotos(photoGrid);
  }

  function loadMorePhotos(photoGrid) {
    if (loadingMore) return;
    if (photoIndex >= photoList.length) return;

    loadingMore = true;

    for (let i = 0; i < batchSize && photoIndex < photoList.length; i++) {
      const src = photoList[photoIndex++];

      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = src;

      // click-to-zoom (photosViewer.js defines openViewer)
      img.addEventListener("click", () => {
        if (typeof openViewer === "function") {
          openViewer(src);
        } else {
          console.error("openViewer() not found — make sure photosViewer.js loads before photosCore.js");
        }
      });

      photoGrid.appendChild(img);
    }

    loadingMore = false;
  }

  function init() {
    const photosBlock = document.querySelector('[data-function="photos"]');
    const photoOverlay = document.getElementById("photoOverlay");
    const photoPanel = document.getElementById("photoPanel");
    const photoGrid = document.getElementById("photoGrid");

    // Helpful console messages if something is missing
    if (!photosBlock) console.error("Photos block not found: [data-function='photos']");
    if (!photoOverlay) console.error("Photo overlay not found: #photoOverlay");
    if (!photoPanel) console.error("Photo panel not found: #photoPanel (did you add id='photoPanel'?)");
    if (!photoGrid) console.error("Photo grid not found: #photoGrid");

    if (!photosBlock || !photoOverlay || !photoPanel || !photoGrid) return;

    photosBlock.addEventListener("click", async () => {
      photoOverlay.classList.remove("hidden");
      photoPanel.scrollTop = 0;
      await loadPhotos(photoGrid);
    });

    // infinite scroll on the scroll container
    photoPanel.addEventListener("scroll", () => {
      const nearBottom =
        photoPanel.scrollTop + photoPanel.clientHeight >= photoPanel.scrollHeight - 300;

      if (nearBottom) loadMorePhotos(photoGrid);
    });

    // click outside panel closes overlay
    photoOverlay.addEventListener("click", (e) => {
      if (e.target === photoOverlay) {
        photoOverlay.classList.add("hidden");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
