// Play the song from the local MP3 file. Browsers may block audible autoplay
// until the visitor interacts with the page, so the surprise button also starts it.
const introScreen = document.getElementById("introScreen");
const enterSurprise = document.getElementById("enterSurprise");
const musicToggle = document.getElementById("musicToggle");
const songPlayer = document.getElementById("songPlayer");
const birthdaySong = document.getElementById("birthdaySong");
let musicOn = false;

async function startMusic() {
  songPlayer.hidden = false;
  try {
    await birthdaySong.play();
    musicOn = true;
    musicToggle.textContent = "♫ Sun Saawariya: On";
  } catch (error) {
    musicOn = false;
    musicToggle.textContent = "♫ Tap to play Sun Saawariya";
  }
}
function stopMusic() {
  birthdaySong.pause();
  birthdaySong.currentTime = 0;
  musicOn = false;
  musicToggle.textContent = "♫ Sun Saawariya: Off";
}

enterSurprise.addEventListener("click", () => {
  introScreen.classList.add("leaving");
  startMusic();
  setTimeout(() => { introScreen.style.display = "none"; }, 950);
});

musicToggle.addEventListener("click", () => {
  if (!birthdaySong.paused) {
    birthdaySong.pause();
    musicOn = false;
    musicToggle.textContent = "♫ Sun Saawariya: Off";
  } else {
    startMusic();
  }
});

// Try autoplay when the website opens. If the browser blocks it, the visitor
// can start the song by clicking the surprise button or music control.
window.addEventListener("load", () => {
  startMusic();
});

const envelope = document.getElementById("envelope");
function openSurprise() {
  if (envelope.classList.contains("open")) return;
  envelope.classList.add("open");
  document.querySelector(".tap-hint").classList.add("hidden");
  document.getElementById("heroCopy").classList.remove("hidden");
  document.getElementById("scrollNote").classList.remove("hidden");
  burstConfetti(55);
}
envelope.addEventListener("click", openSurprise);
envelope.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSurprise(); }
});
const hearts = document.querySelector(".floating-hearts");
const symbols = ["💗", "💕", "💖", "🌸", "✨", "💘"];
function addFloatingHeart() {
  const el = document.createElement("span");
  el.className = "float-heart";
  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = (14 + Math.random() * 22) + "px";
  el.style.animationDuration = (7 + Math.random() * 7) + "s";
  hearts.appendChild(el);
  setTimeout(() => el.remove(), 15000);
}
setInterval(addFloatingHeart, 650);
function burstConfetti(amount = 35) {
  const symbols = ["💖", "✨", "🌸", "💕", "🎉", "🎂"];
  for (let i = 0; i < amount; i++) {
    const el = document.createElement("span");
    el.className = "confetti";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = (14 + Math.random() * 18) + "px";
    el.style.animationDelay = (Math.random() * .7) + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}
document.getElementById("wishButton").addEventListener("click", () => {
  document.getElementById("wishMessage").textContent = "May your wish find its way to you, Sophanjali — may your year be full of lovely surprises! 💫";
  burstConfetti(75);
});
document.getElementById("secretButton").addEventListener("click", () => {
  const message = document.getElementById("secretMessage");
  message.classList.toggle("hidden");
  document.getElementById("secretButton").textContent = message.classList.contains("hidden") ? "Open my secret message 💌" : "Hide my secret message 💗";
  if (!message.classList.contains("hidden")) burstConfetti(35);
});
