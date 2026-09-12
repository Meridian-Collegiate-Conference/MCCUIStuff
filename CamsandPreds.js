var r = document.querySelector(':root')
function UpdateCamNames() {
  document.getElementById("NameA").textContent = CamAName;
  document.getElementById("NameB").textContent = CamBName;
  document.getElementById("NameC").textContent = CamCName;
  document.getElementById("NameD").textContent = CamDName;
}

function UpdatePreds() {
  document.getElementById("APred").textContent = CamAPredSchool;
  document.getElementById("BPred").textContent = CamBPredSchool;
  document.getElementById("CPred").textContent = CamCPredSchool;
  document.getElementById("DPred").textContent = CamDPredSchool;
}

function UpdateImgs() {
  document.getElementById("AImg").src = CamAPredLogo;
  document.getElementById("BImg").src = CamBPredLogo;
  document.getElementById("CImg").src = CamCPredLogo;
  document.getElementById("DImg").src = CamDPredLogo;
}

function UIColors() {
  r.style.setProperty('--HomeColor', HomeColor);
  r.style.setProperty('--AwayColor', AwayColor);
  r.style.setProperty('--TertiaryColor', TertiaryColor);
}

UIColors();
window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "p") {
    document.getElementById("mainGrid").classList.toggle("show-prediction");
  }
});

window.togglePredictions = () => {
  document.getElementById("mainGrid").classList.toggle("show-prediction");
};