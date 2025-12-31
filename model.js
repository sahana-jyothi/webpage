const person = document.getElementById("person");
const lid = document.getElementById("lid");
const waste = document.getElementById("waste");
const status = document.getElementById("status");
const wave = document.querySelector(".wave");
const alertSound = document.getElementById("alertSound");

// Add this button to your HTML (after <p id="status">)
const startBtn = document.createElement("button");
startBtn.textContent = "Start Demo";
startBtn.style.cssText = `
  display: block; margin: 20px auto; padding: 12px 24px; 
  font-size: 18px; background: #4CAF50; color: white; 
  border: none; border-radius: 8px; cursor: pointer;
`;
document.body.insertBefore(startBtn, status);

let wasteLevel = 0;

startBtn.addEventListener("click", function() {
  // User clicked = audio now allowed [attached_file:1]
  startBtn.remove(); // Clean up button
  status.innerText = "Demo started! Person approaching...";
  
  // Person moves RIGHT ➜ LEFT
  setTimeout(() => {
    person.style.right = "420px";
    status.innerText = "Person approaching dustbin...";
  }, 1000);

  // Sensor detects person
  setTimeout(() => {
    status.innerText = "Sensor detected person!";
    wave.style.opacity = "1";
    lid.style.transform = "rotate(-30deg)";
    alertSound.play().catch(e => console.log("Audio blocked:", e)); // Safe [attached_file:1]
  }, 5500);

  // Lid closes & waste fills
  setTimeout(() => {
    lid.style.transform = "rotate(0deg)";
    status.innerText = "Waste being added...";
    fillWaste();
  }, 7000);
});

function fillWaste() {
  const interval = setInterval(() => {
    if (wasteLevel < 100) {
      wasteLevel += 25;
      waste.style.height = wasteLevel + "%";
    } else {
      clearInterval(interval);
      status.innerText = "⚠ Dustbin Full! Alert generated.";
      alertSound.play().catch(e => console.log("Audio blocked:", e)); // Still allowed after click [attached_file:1]
    }
  }, 1000);
}
