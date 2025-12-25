const LETTER_PASSWORD = "0976";
const LETTER_KEY = "loveLetterIndex";
const LETTER_DATE_KEY = "loveLetterDate";

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

fetch("love letter.txt")
  .then(res => res.text())
  .then(text => {
    const letters = text.split(";").map(l => l.trim()).filter(Boolean);
    if (!letters.length) return;

    const textEl = document.getElementById("loveLetterText");
    const block = document.getElementById("loveLetterBlock");
    if (!textEl || !block) return;

    const today = getTodayString();
    let savedDate = localStorage.getItem(LETTER_DATE_KEY);
    let index = localStorage.getItem(LETTER_KEY);

    if (savedDate !== today || index === null) {
      index = Math.floor(Math.random() * letters.length);
      localStorage.setItem(LETTER_KEY, index);
      localStorage.setItem(LETTER_DATE_KEY, today);
    }

    textEl.innerText = letters[index];

    block.addEventListener("click", () => {
      const pass = prompt("💌 Enter password to change today’s love letter:");
      if (pass !== LETTER_PASSWORD) return;

      let newIndex;
      do newIndex = Math.floor(Math.random() * letters.length);
      while (newIndex == index && letters.length > 1);

      index = newIndex;
      localStorage.setItem(LETTER_KEY, index);
      textEl.innerText = letters[index];
    });
  })
  .catch(err => console.error("Love letter failed to load:", err));
