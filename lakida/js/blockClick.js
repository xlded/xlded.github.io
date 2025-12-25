/* -------------------
   BLOCK CLICK FEEDBACK
------------------- */
document.querySelectorAll(".block").forEach(block => {
  block.addEventListener("click", () => {
    block.style.transform = "scale(0.97)";
    setTimeout(() => {
      block.style.transform = "";
    }, 150);
  });
});
