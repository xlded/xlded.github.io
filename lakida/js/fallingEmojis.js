/* -------------------
   FALLING EMOJIS (MAIN DASHBOARD)
------------------- */
const mainEmojis = ["🌹", "❤️"];

function createMainEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = mainEmojis[Math.floor(Math.random() * mainEmojis.length)];

  emoji.style.left = Math.random() * (window.innerWidth - 30) + "px";
  emoji.style.fontSize = 18 + Math.random() * 14 + "px";

  const angle = Math.random() * 360;
  const spinDuration = 25 + Math.random() * 20;   // slower spin
  const fallDuration = 16 + Math.random() * 10;   // MUCH longer fall

  emoji.style.transform = `rotate(${angle}deg)`;
  emoji.style.animation = `
    fall ${fallDuration}s linear,
    spin ${spinDuration}s linear infinite
  `;

  document.body.appendChild(emoji);

  setTimeout(() => emoji.remove(), fallDuration * 1000 + 2000);
}

setInterval(createMainEmoji, 600);
