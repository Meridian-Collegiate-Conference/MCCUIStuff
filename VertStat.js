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
  let HScore = 0, HGoals = 0, HShots = 0, HAssists = 0, HSaves = 0, HDemos = 0;
  let AScore = 0, AGoals = 0, AShots = 0, AAssists = 0, ASaves = 0, ADemos = 0;
  
  const h_container = document.getElementById("HomeData");
  const a_container = document.getElementById("AwayData");
  h_container.innerHTML = "";
  a_container.innerHTML = "";
  
  blue.forEach(p => {
    HScore += p.Score ?? 0;
    HGoals += p.Goals ?? 0;
    HShots += p.Shots ?? 0;
    HAssists += p.Assists ?? 0;
    HSaves += p.Saves ?? 0;
    HDemos += p.Demos ?? 0;
  });
  
  const Hdiv = document.createElement("div");
  Hdiv.classList.add("PlayerColumn");
  Hdiv.innerHTML = `
    <div class="PlayerStats">${HScore}</div>
    <div class="PlayerStats">${HGoals}</div>
    <div class="PlayerStats">${HShots}</div>
    <div class="PlayerStats">${HAssists}</div>
    <div class="PlayerStats">${HSaves}</div>
    <div class="PlayerStats">${HDemos}</div>`;
  h_container.appendChild(Hdiv);
  
  orange.forEach(p => {
    AScore += p.Score ?? 0;
    AGoals += p.Goals ?? 0;
    AShots += p.Shots ?? 0;
    AAssists += p.Assists ?? 0;
    ASaves += p.Saves ?? 0;
    ADemos += p.Demos ?? 0;
  });
  
  const Adiv = document.createElement("div");
  Adiv.classList.add("PlayerColumn");
  Adiv.innerHTML = `
    <div class="PlayerStats">${AScore}</div>
    <div class="PlayerStats">${AGoals}</div>
    <div class="PlayerStats">${AShots}</div>
    <div class="PlayerStats">${AAssists}</div>
    <div class="PlayerStats">${ASaves}</div>
    <div class="PlayerStats">${ADemos}</div>`;
  a_container.appendChild(Adiv);
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