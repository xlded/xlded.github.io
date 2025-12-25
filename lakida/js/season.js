document.addEventListener("DOMContentLoaded", () => {
  const seasonBlock = document.getElementById("seasonBlock");
  const seasonText = document.getElementById("seasonText");
  if (!seasonBlock || !seasonText) return;

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

  const events = [
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

  events.forEach(e => {
    if (Math.abs(e.date - now) > 183 * 24 * 60 * 60 * 1000) {
      e.date.setFullYear(e.date.getFullYear() + (e.date < now ? 1 : -1));
    }
  });

  const closest = events.reduce((a, b) =>
    Math.abs(b.date - now) < Math.abs(a.date - now) ? b : a
  );

  seasonText.textContent = closest.name;
  seasonBlock.onclick = () => window.location.href = closest.path;
});
