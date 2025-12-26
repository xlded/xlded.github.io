/* -------------------
   SEASONAL BUTTON (TEMP: CHRISTMAS FOREVER)
   - Before Dec 25: countdown until Christmas
   - After Dec 25: "X days since Christmas"
   Delete/replace later to restore normal seasonal logic.
------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const seasonBlock = document.getElementById("seasonBlock");
  const seasonText = document.getElementById("seasonText");
  const seasonCountdown = document.getElementById("seasonCountdown");
  if (!seasonBlock || !seasonText || !seasonCountdown) return;

  seasonText.textContent = "Christmas🎄";
  seasonBlock.onclick = () => {
    window.location.href = "/lakida/christmas";
  };

  function getChristmas(year) {
    return new Date(year, 11, 25, 0, 0, 0, 0); // Dec 25, midnight
  }

  function formatCountdown(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  function tick() {
    const now = new Date();
    const christmasThisYear = getChristmas(now.getFullYear());
    const christmasNextYear = getChristmas(now.getFullYear() + 1);

    // If before Christmas
    if (now < christmasThisYear) {
      const diff = christmasThisYear - now;
      seasonCountdown.textContent =
        `${formatCountdown(diff)} until Christmas🎄`;
      return;
    }

    // After Christmas → days since
    const diffMs = now - christmasThisYear;
    const daysSince = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    seasonCountdown.textContent =
      `${daysSince} day${daysSince === 1 ? "" : "s"} since Christmas 🎄`;
  }

  tick();
  setInterval(tick, 1000);
});
