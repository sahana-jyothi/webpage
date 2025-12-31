const person = document.getElementById("person");
const lid = document.getElementById("lid");
const waste = document.getElementById("waste");
const status = document.getElementById("status");
const wave = document.querySelector(".wave");
const alertSound = document.getElementById("alertSound");

let wasteLevel = 0;
let demoRunning = false;
let wasteInterval = null; // Track the filling interval

// Start button
const startBtn = document.createElement("button");
startBtn.id = "startBtn";
startBtn.textContent = "Start Demo";
startBtn.style.cssText = `
  display: block; margin: 20px auto; padding: 12px 24px; 
  font-size: 18px; background: #4CAF50; color: white; 
  border: none; border-radius: 8px; cursor: pointer;
`;
document.body.insertBefore(startBtn, status);

// Reset button (initially hidden)
const resetBtn = document.createElement("button");
resetBtn.id = "resetBtn";
resetBtn.textContent = "Reset";
resetBtn.style.cssText = `
  display: none; margin: 20px auto; padding: 12px 24px; 
  font-size: 18px; background: #f44336; color: white; 
  border: none; border-radius: 8px; cursor: pointer;
`;
document.body.insertBefore(resetBtn, status);

function resetDemo() {
  demoRunning = false;
  wasteLevel = 0;

  // STOP AUDIO immediately
  alertSound.pause();
  alertSound.currentTime = 0; // Reset audio position

  // Clear any running waste interval
  if (wasteInterval) {
    clearInterval(wasteInterval);
    wasteInterval = null;
  }

  // Reset all elements to initial state
  person.style.right = "0px";
  lid.style.transform = "rotate(0deg)";
  waste.style.height = "0%";
  wave.style.opacity = "0";
  status.innerText = "Person is far away...";

  // Show start button, hide reset
  startBtn.style.display = "block";
  resetBtn.style.display = "none";

  console.log("Demo reset complete! Audio stopped.");
}

function startDemo() {
  if (demoRunning) return;

  demoRunning = true;
  startBtn.style.display = "none";
  resetBtn.style.display = "block";
  status.innerText = "Demo started! Person approaching...";

  setTimeout(() => {
    person.style.right = "420px";
    status.innerText = "Person approaching dustbin...";
  }, 1000);

  setTimeout(() => {
    status.innerText = "Sensor detected person!";
    wave.style.opacity = "1";
    lid.style.transform = "rotate(-30deg)";
    alertSound.play().catch(e => console.log("Audio blocked:", e));
  }, 5500);

  setTimeout(() => {
    lid.style.transform = "rotate(0deg)";
    status.innerText = "Waste being added...";
    fillWaste();
  }, 7000);
}

startBtn.addEventListener("click", startDemo);
resetBtn.addEventListener("click", resetDemo);

function fillWaste() {
  wasteInterval = setInterval(() => {
    if (wasteLevel < 100) {
      wasteLevel += 25;
      waste.style.height = wasteLevel + "%";
    } else {
      clearInterval(wasteInterval);
      status.innerText = "⚠ Dustbin Full! Alert generated.";
      alertSound.play().catch(e => console.log("Audio blocked:", e));
    }
  }, 1000);
}
