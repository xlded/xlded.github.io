(() => {
  console.log("✅ photosCore.js running");

  let photoList = [];
  let photoIndex = 0;
  const batchSize = 20;
  let loadingMore = false;

  function $(id) {
    return document.getElementById(id);
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  async function loadPhotos() {
    const photoGrid = $("photoGrid");
    if (!photoGrid) {
      console.error("❌ #photoGrid missing");
      return;
    }

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

  function loadMorePhotos() {
    const photoGrid = $("photoGrid");
    if (!photoGrid) return;

    if (loadingMore) return;
    if (photoIndex >= photoList.length) return;

    loadingMore = true;

    for (let i = 0; i < batchSize && photoIndex < photoList.length; i++) {
      const src = photoList[photoIndex++];

      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = src;

      img.addEventListener("click", () => {
        if (typeof openViewer === "function") {
          openViewer(src);
        } else {
          console.error("❌ openViewer() missing — check photosViewer.js is loaded BEFORE photosCore.js");
        }
      });

      photoGrid.appendChild(img);
    }

    loadingMore = false;
  }

  function openOverlay() {
    const overlay = $("photoOverlay");
    const panel = $("photoPanel");

    if (!overlay) return console.error("❌ #photoOverlay missing");
    if (!panel) return console.error("❌ #photoPanel missing (add id='photoPanel' to the slide-panel)");

    overlay.classList.remove("hidden");
    panel.scrollTop = 0;

    console.log("📸 opened photo overlay");
    loadPhotos();
  }

  // ✅ Event delegation: works regardless of layout / reordering
  document.addEventListener("click", (e) => {
    const photosBtn = e.target.closest('[data-function="photos"]');
    if (photosBtn) {
      openOverlay();
    }
  });

  // ✅ Scroll loading on the actual scroll container
  document.addEventListener("scroll", () => {
    const panel = $("photoPanel");
    if (!panel || $("photoOverlay")?.classList.contains("hidden")) return;

    const nearBottom =
      panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 300;

    if (nearBottom) loadMorePhotos();
  }, true);

  // ✅ Click outside panel to close
  document.addEventListener("click", (e) => {
    const overlay = $("photoOverlay");
    const panel = $("photoPanel");
    if (!overlay || !panel) return;

    if (!overlay.classList.contains("hidden") && e.target === overlay) {
      overlay.classList.add("hidden");
      console.log("❎ closed photo overlay");
    }
  });
})();
