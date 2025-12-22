const mainEmojis = ["🌹", "❤️"];

function createMainEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = mainEmojis[Math.floor(Math.random() * mainEmojis.length)];

  // Ensure proper left position on desktop and mobile
  const maxLeft = document.body.clientWidth - 30;
  emoji.style.left = Math.random() * maxLeft + "px";

  emoji.style.fontSize = 18 + Math.random() * 14 + "px";

  // random rotation & slow spin
  const angle = Math.random() * 360;
  const spinDuration = 20 + Math.random() * 15;
  const fallDuration = 8 + Math.random() * 6;
  emoji.style.transform = `rotate(${angle}deg)`;
  emoji.style.animation = `fall ${fallDuration}s linear, spin ${spinDuration}s linear infinite`;

  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), fallDuration * 1000);
}

setInterval(createMainEmoji, 500);

/* Top timer hearts */
const timeBlock = document.querySelector('[data-function="time"]');
function createTopHeart() {
  const heart = document.createElement("div");
  heart.classList.add("emoji");
  heart.innerText = "💖";

  const rect = timeBlock.getBoundingClientRect();
  heart.style.left = rect.left + Math.random() * rect.width + "px";
  heart.style.top = rect.top + Math.random() * rect.height + "px";
  heart.style.fontSize = 18 + Math.random() * 10 + "px";

  const angle = Math.random() * 360;
  const spinDuration = 10 + Math.random() * 15;
  heart.style.transform = `rotate(${angle}deg)`;
  heart.style.animation = `spin ${spinDuration}s linear infinite`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}

setInterval(createTopHeart, 800);
