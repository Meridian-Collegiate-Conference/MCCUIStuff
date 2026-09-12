document.getElementById("HSlogo").src = HomeLogo;
document.getElementById("away-logo").src = AwayLogo;

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    HomeWins++;
    document.getElementById("homeScore").textContent = HomeWins;
  }

  if (e.key === "ArrowRight") {
    AwayWins++;
    document.getElementById("awayScore").textContent = AwayWins;
  }
  if (e.key === "ArrowDown") {
    HomeWins = 0;
    AwayWins = 0;
    document.getElementById("homeScore").textContent = HomeWins;
    document.getElementById("awayScore").textContent = AwayWins;
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