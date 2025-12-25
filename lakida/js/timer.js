/* -------------------
   COUNT-UP TIMER
------------------- */
const startDate = new Date("May 24, 2025 00:00:00");

function updateTimer() {
  const now = new Date();
  let diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff %= (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  const timerEl = document.getElementById("timer");
  if (!timerEl) return;

  timerEl.innerText =
    `Together for ${days} days, ${hours}h ${minutes}m ${seconds}s 💕`;
}

updateTimer();
setInterval(updateTimer, 1000);
