let Updates = 1;
function StatColors(){
  document.getElementById("statbackground").style.backgroundColor = TertiaryColor;
}

function updateUpper() {
  document.getElementById("statHImage").src = HomeLogo;
  document.getElementById("statAImage").src = AwayLogo;
  document.getElementById("statHName").innerHTML = HomeName;
  document.getElementById("statAName").innerHTML = AwayName;
  document.getElementById("StatTopBarText").innerHTML = TopBarYap;
  document.getElementById("StatBottomBarText").innerHTML = BottomBarYap;
}

function UpdateUpperGoal() {
  document.getElementById("stat_home_score").innerHTML = gameData.Game.Teams[0].Score;
  document.getElementById("stat_away_score").innerHTML = gameData.Game.Teams[1].Score;
  document.getElementById("statgame").innerHTML = `Game ${HomeWins + AwayWins}`;
}


function updateStatScreen() {
  const h_container = document.getElementById("HomeData");
  const a_container = document.getElementById("AwayData");
  h_container.innerHTML = "";
  a_container.innerHTML = "";
  blue.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("PlayerColumn");
    div.innerHTML = `
      <div class="PlayerStats HomeStatPlayerNames">${p.Name}</div>
      <div class="PlayerStats">${p.Score ?? 0}</div>
      <div class="PlayerStats">${p.Goals ?? 0}</div>
      <div class="PlayerStats">${p.Shots ?? 0}</div>
      <div class="PlayerStats">${p.Assists ?? 0}</div>
      <div class="PlayerStats">${p.Saves ?? 0}</div>
      <div class="PlayerStats">${p.Demos ?? 0}</div>`;
    h_container.appendChild(div);
  });

  orange.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("PlayerColumn");
    div.innerHTML = `
      <div class="PlayerStats AwayStatPlayerNames">${p.Name}</div>
      <div class="PlayerStats">${p.Score ?? 0}</div>
      <div class="PlayerStats">${p.Goals ?? 0}</div>
      <div class="PlayerStats">${p.Shots ?? 0}</div>
      <div class="PlayerStats">${p.Assists ?? 0}</div>
      <div class="PlayerStats">${p.Saves ?? 0}</div>
      <div class="PlayerStats">${p.Demos ?? 0}</div>`;
    a_container.appendChild(div);
  });
}
function CreateStatTicks() {
  const h_container = document.getElementById("home-series");
  const a_container = document.getElementById("away-series");
  h_container.innerHTML = "";
  a_container.innerHTML = "";
  for (let i = 1; i <= maxWins; i++) {
    const h_tick = document.createElement("div");
    h_tick.classList.add("hStatTick");
    h_tick.id = `sh-tick-${maxWins - i + 1}`;
    h_container.appendChild(h_tick);
    const a_tick = document.createElement("div");
    a_tick.classList.add("aStatTick");
    a_tick.id = `sa-tick-${i}`;
    a_container.appendChild(a_tick);
  }
}

function updateStatSeries() {
  // home series
  for (let i = 1; i <= maxWins; i++) {
    const StatTick = document.getElementById(`sh-tick-${i}`)
    if (i <= HomeWins) StatTick.classList.add('sh-win');
    else StatTick.classList.remove('sh-win');
  }
  // away series  
  for (let i = 1; i <= maxWins; i++) {
    const StatTick = document.getElementById(`sa-tick-${i}`)
    if (i <= AwayWins) StatTick.classList.add('sa-win');
    else StatTick.classList.remove('sa-win');
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    HomeWins++;
    updateStatSeries()
  }
  if (e.key === "ArrowRight") {
    AwayWins++;
    updateStatSeries()
  }
  if (e.key === "ArrowDown") {
    HomeWins = 0;
    AwayWins = 0;
    updateStatSeries()
  }
});

window.addEventListener('MCCDataUpdate', () => {
  if (UpdateType === "UpdateState") {
    UpdateUpperGoal();
    console.log(Updates)
    if (Updates === 1) {
      updateStatScreen();
    }
  }
  if (UpdateType === "MatchEnded") {
    Updates = 0;
    updateStatSeries();
  }
  if (UpdateType === "MatchCreated") {
    Updates = 1;
  }
});