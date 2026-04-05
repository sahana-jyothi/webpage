document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("openbtn");
  const wrapper = document.querySelector(".carpet-wrapper");
  const page2 = document.getElementById("page2");
  const music = document.getElementById("bgMusic");

  const revealbtn = document.getElementById("revealbtn");
  const dayText = document.getElementById("dayText");

  const petalsContainer = document.querySelector(".petals");

  const sections = document.querySelectorAll(
    ".couple-section, .events-section, .venue-section, .rsvp-section"
  );

  function createPetals() {
    for (let i = 0; i < 30; i++) {
      const petal = document.createElement("div");
      petal.classList.add("petal");

      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = (6 + Math.random() * 6) + "s";
      petal.style.opacity = Math.random();

      petalsContainer.appendChild(petal);
    }
  }

  btn.addEventListener("click", () => {
    wrapper.classList.add("open");

    music.volume = 0.3;
    music.play();

    setTimeout(() => {
      page2.classList.add("show");

      // ✅ SHOW ALL SECTIONS AFTER OPEN
      sections.forEach(section => {
        section.classList.add("show-sections");
      });

      createPetals();
      document.body.style.overflowY = "auto";
    }, 1500);
  });

  if (revealbtn && dayText) {
    revealbtn.addEventListener("click", () => {
      dayText.classList.toggle("show");
    });
  }
});

const storyLines = document.querySelectorAll(".story-text span");

function revealStory() {
  storyLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add("show");
    }, index * 700);
  });
}

let storyPlayed = false;

window.addEventListener("scroll", () => {
  const story = document.querySelector(".story-text");
  if (!story) return;

  const rect = story.getBoundingClientRect();

  if (rect.top < window.innerHeight - 100 && !storyPlayed) {
    revealStory();
    storyPlayed = true;
  }
});

const cards = document.querySelectorAll(".event-card");

function revealCards() {
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {
      setTimeout(() => {
        card.classList.add("show");

        const items = card.querySelectorAll(".multi-events p");
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add("show");
          }, i * 300);
        });

      }, index * 200);
    }
  });
}

window.addEventListener("scroll", revealCards);

const rsvpBtn = document.querySelector(".rsvp-btn");

if (rsvpBtn) {
  rsvpBtn.addEventListener("click", () => {
    const name = document.querySelector('input[type="text"]').value.trim();
    const email = document.querySelector('input[type="email"]').value.trim();

    if (name === "" || email === "") {
      showMessage("Please fill all details 💛");
      return;
    }

    showMessage(`💖 Thank you ${name}! Your RSVP is confirmed 💍`);

    document.querySelector('input[type="text"]').value = "";
    document.querySelector('input[type="email"]').value = "";
  });
}

function showMessage(text) {
  const msg = document.getElementById("rsvp-message");
  if (!msg) return;

  msg.innerText = text;
  msg.classList.add("show");

  setTimeout(() => {
    msg.classList.remove("show");
  }, 3000);
}
const targetDate = new Date("May 3, 2026 12:30:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const gap = targetDate - now;

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));
  const hours = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((gap / (1000 * 60)) % 60);
  const seconds = Math.floor((gap / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
