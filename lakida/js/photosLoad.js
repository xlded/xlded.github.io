import { photoList, photoIndex, batchSize, photoGrid, viewerImg } from "./photosCore.js";

export async function loadPhotos() {
  const res = await fetch("photos.txt");
  const text = await res.text();

  photoList.length = 0;
  photoList.push(...text.split(";").map(l => l.trim()).filter(Boolean));
  shuffle(photoList);

  photoIndex.value = 0;
  photoGrid.innerHTML = "";
  loadMorePhotos();
}

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function loadMorePhotos() {
  for (let i = 0; i < batchSize && photoIndex < photoList.length; i++) {
    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = photoList[photoIndex++];
    img.onclick = () => openViewer(img.src);
    photoGrid.appendChild(img);
  }
}

export function openViewer(src) {
  viewerImg.src = src;
  document.getElementById("photoViewer").classList.remove("hidden");
}
