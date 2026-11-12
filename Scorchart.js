function checkFilter() {
  if (document.getElementById("homeScore").textContent >= maxWins) {
    document.getElementById("away-logo").style.filter = "grayscale(100%)";
  }
  else if (document.getElementById("awayScore").textContent >= maxWins) {
    document.getElementById("HSlogo").style.filter = "grayscale(100%)";
  }
  else {
    document.getElementById("HSlogo").style.filter = "grayscale(0%)";
    document.getElementById("away-logo").style.filter = "grayscale(0%)";
  }
}
document.getElementById("HSlogo").src = HomeLogo;
document.getElementById("away-logo").src = AwayLogo;

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    HomeWins++;
    document.getElementById("homeScore").textContent = HomeWins;
    checkFilter();
  }

  if (e.key === "ArrowRight") {
    AwayWins++;
    document.getElementById("awayScore").textContent = AwayWins;
    checkFilter();

  }
  if (e.key === "ArrowDown") {
    HomeWins = 0;
    AwayWins = 0;
    document.getElementById("homeScore").textContent = HomeWins;
    document.getElementById("awayScore").textContent = AwayWins;
    checkFilter();

  }
});

window.addEventListener('MCCDataUpdate', () => {
  if (UpdateType === "MatchEnded") {
    if (gameData.WinnerTeamNum === 0) {
      document.getElementById("homeScore").textContent = HomeWins;
    }
    if (gameData.WinnerTeamNum === 1) {
      document.getElementById("awayScore").textContent = AwayWins;
    }
  }
});