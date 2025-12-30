const person = document.getElementById("person");
const lid = document.getElementById("lid");
const waste = document.getElementById("waste");
const status = document.getElementById("status");
const wave = document.querySelector(".wave");
const alertSound = document.getElementById("alertSound");

let wasteLevel = 0;

// Person moves RIGHT ➜ LEFT and stops near dustbin
setTimeout(() => {
  person.style.right = "420px";
  status.innerText = "Person approaching dustbin...";
}, 1000);

// Sensor detects person
setTimeout(() => {
  status.innerText = "Sensor detected person!";
  wave.style.opacity = "1";
  lid.style.transform = "rotate(-30deg)";
  alertSound.play();
}, 5500);

// Lid closes & waste fills
setTimeout(() => {
  lid.style.transform = "rotate(0deg)";
  status.innerText = "Waste being added...";
  fillWaste();
}, 7000);

function fillWaste() {
  const interval = setInterval(() => {
    if (wasteLevel < 100) {
      wasteLevel += 25;
      waste.style.height = wasteLevel + "%";
    } else {
      clearInterval(interval);
      status.innerText = "⚠ Dustbin Full! Alert generated.";
      alertSound.play();
    }
  }, 1000);
}
