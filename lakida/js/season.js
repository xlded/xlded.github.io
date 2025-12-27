/* -------------------
   SEASONAL BUTTON (NEXT UPCOMING HOLIDAY + COUNTDOWN)
------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const seasonBlock = document.getElementById("seasonBlock");
  const seasonText = document.getElementById("seasonText");
  const seasonCountdown = document.getElementById("seasonCountdown");
  if (!seasonBlock || !seasonText || !seasonCountdown) return;

  const now = new Date();
  const year = now.getFullYear();

  function easterDate(y) {
    const f = Math.floor,
      G = y % 19,
      C = f(y / 100),
      H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
      I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
      J = (y + f(y / 4) + I + 2 - C + f(C / 4)) % 7,
      L = I - J,
      month = 3 + f((L + 40) / 44),
      day = L + 28 - 31 * f(month / 4);
    return new Date(y, month - 1, day);
  }

  function thanksgivingDate(y) {
    const d = new Date(y, 10, 1);
    const offset = (4 - d.getDay() + 7) % 7;
    return new Date(y, 10, 1 + offset + 21);
  }

  const eventsBase = [
    { name: "💖 Our Anniversary 💖", path: "/anniversary", date: new Date(year, 4, 24) },
    { name: "Christmas🎄", path: "/lakida/christmas", date: new Date(year, 11, 25) },
    { name: "Halloween🎃", path: "/halloween", date: new Date(year, 9, 31) },
    { name: "Thanksgiving🦃", path: "/thanksgiving", date: thanksgivingDate(year) },
    { name: "Valentines day💝", path: "/valentinesday", date: new Date(year, 1, 14) },
    { name: "Easter🐇", path: "/easter", date: easterDate(year) },
    { name: "new years🎉", path: "/newyears", date: new Date(year, 0, 1) },
    { name: "National Girlfriend day💖", path: "/nationalgirlfriendday", date: new Date(year, 7, 1) },
    { name: "National boyfriend day💘", path: "/nationalboyfriendday", date: new Date(year, 9, 3) }
  ];

function endOfDay(d) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

// Build a list of next-upcoming dates (if passed end-of-day, push to next year)
const upcoming = eventsBase.map(e => {
  let d = endOfDay(e.date);
  if (d < new Date()) {
    const next = new Date(e.date);
    next.setFullYear(next.getFullYear() + 1);
    d = endOfDay(next);
  }
  return { ...e, date: d };
});


  // Pick the soonest upcoming
  let nextEvent = upcoming.reduce((a, b) => (b.date - new Date() < a.date - new Date() ? b : a));

  // Set label + click
  seasonText.textContent = nextEvent.name;
  seasonBlock.onclick = () => {
    window.location.href = nextEvent.path;
  };

  function formatCountdown(ms) {
    if (ms < 0) ms = 0;

    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Keep it compact
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  function tick() {
    const diff = nextEvent.date - new Date();
    seasonCountdown.textContent = `${formatCountdown(diff)} until ${nextEvent.name}`;
  }

  tick();
  setInterval(tick, 1000);
});
