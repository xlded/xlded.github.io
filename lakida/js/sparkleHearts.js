const timeBlock = document.querySelector('[data-function="time"]');

export function createTopHeart() {
  if (!timeBlock) return;

  const heart = document.createElement("div");
  heart.classList.add("emoji");
  heart.innerText = "💖";

  const rect = timeBlock.getBoundingClientRect();
  heart.style.left = rect.left + Math.random() * rect.width + "px";
  heart.style.top = rect.top + Math.random() * rect.height + "px";
  heart.style.fontSize = 16 + Math.random() * 10 + "px";

  const angle = Math.random() * 360;
  const spinDuration = 12 + Math.random() * 18;

  heart.style.transform = `rotate(${angle}deg)`;
  heart.style.animation = `spin ${spinDuration}s linear infinite`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 9000);
}

setInterval(createTopHeart, 900);
