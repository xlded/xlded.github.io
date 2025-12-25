/* -------------------
   FAVORITES OVERLAY
------------------- */
const favoritesBlock = document.querySelector('[data-function="favorites"]');
const overlay = document.getElementById("favoritesOverlay");
const closeBtn = document.getElementById("closeOverlay");

if (favoritesBlock && overlay && closeBtn) {
  favoritesBlock.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  });
}
