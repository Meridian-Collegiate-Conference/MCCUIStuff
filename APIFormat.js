const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

// Renders all the functions and stuff
function Render() {
    if (UpdateType === "UpdateState") {
        DataProcess();
        DetermineFollowedColor();
        UpdateScorebug();
        UpdateSideBoost();
        FollowedBoost();
        ReplayScorecardVis();
        TargetVisibility();
        UpdateScorecard();
        updateSeries();
    }
    if (UpdateType === "GoalScored" && !isReplay) {
        GoalStinger();
        UpdateScorecardReplay();
    }
    if (UpdateType === "MatchEnded") {
        updateSeries();
    }
}

// Set Team info in Bar
function TeamInfoSet() {
    document.getElementById("HImage").src = HomeLogo
    document.getElementById("hometeam").innerHTML = HomeName
    document.getElementById("AImage").src = AwayLogo
    document.getElementById("awayteam").innerHTML = AwayName
}

// Sets top bottom bar text
function BarsSet() {
    document.getElementById("TopBarText").innerHTML = TopBarYap;
    document.getElementById("BottomBarText").innerHTML = BottomBarYap;
}

// Sets the correct media for stinger
function GoalStinger() {
    if (blueName.includes(gameData.Scorer.Name)) {
        document.getElementById("StingerImage").src = HomeLogo;
        document.getElementById("StingTest").style.backgroundColor = HomeColor;
        document.getElementById("StingTest").innerHTML = HomeName;
    }
    else if (orangeName.includes(gameData.Scorer.Name)) {
        document.getElementById("StingerImage").src = AwayLogo;
        document.getElementById("StingTest").style.backgroundColor = AwayColor;
        document.getElementById("StingTest").innerHTML = AwayName;
    }
    else {
        document.getElementById("StingerImage").src = "https://meridiancollegiatehub.com/logos/mcc-shield.png";
        document.getElementById("StingerTest").style.backgroundColor = TertiaryColor;
    }
    setTimeout(GoalStingerAnimation, 2250);
}
// Actual animation run
function GoalStingerAnimation() {
    const box = document.getElementById("StingerTest");
    box.classList.remove("slide-in-left");
    void box.offsetWidth;
    box.classList.add("slide-in-left");
}

// Scorebug Update
function UpdateScorebug() {
    const timesec = gameData.Game.TimeSeconds;
    const minutes = Math.floor(timesec / 60);
    const seconds = timesec % 60;
    let formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    if (gameData.Game.bOvertime) {
        formattedTime = `+${formattedTime}`;
    }
    document.getElementById("time").innerHTML = formattedTime;
    document.getElementById("home_score").innerHTML = gameData.Game.Teams[0].Score;
    document.getElementById("away_score").innerHTML = gameData.Game.Teams[1].Score;
}

// Player Boost Sidebars
function UpdateSideBoost() {
    const h_container = document.getElementById("testside");
    const a_container = document.getElementById("away-testside");
    h_container.innerHTML = "";
    a_container.innerHTML = "";
    blue.forEach(p => {
        const div = document.createElement("div");
    div.classList.add("name-box");

        div.innerHTML = `
    <div class="player-info">
      <span class="player-name">${p.Name}</span>
      <span class="player-boost">${p.Boost ?? 0}</span>
    </div>
    <div class="boost-bar-container">
      <div class="boost-bar-fill" style="width: ${p.Boost ?? 0}%"></div>
    </div>`;
        h_container.appendChild(div);
    });

    orange.forEach(p => {
        const div = document.createElement("div");
    div.classList.add("away-name-box");

        div.innerHTML = `
    <div class="player-info away-player-info">
      <span class="player-name">${p.Name}</span>
      <span class="player-boost">${p.Boost ?? 0}</span>
    </div>
    <div class="boost-bar-container container-away">
      <div class="away-boost-bar-fill" style="width: ${p.Boost ?? 0}%"></div>
    </div>`;
        a_container.appendChild(div);
    });
}

// Determine Color of The boost meter and scorecard
function DetermineFollowedColor() {
    if (followed === null) {
        return;
    }
    if (gameData.Game.Target.TeamNum === 0) {
        BoostFill = HomeColor + "44";
        PlayerBoostColor = HomeColor;
        document.getElementById("boost-number").style.fill = HomeColor;
        document.getElementById("BoostTick").style.stroke = HomeColor;
        document.getElementById("StatbugItem").style.backgroundColor = HomeColor;
    }
    if (gameData.Game.Target.TeamNum === 1) {
        BoostFill = AwayColor + "44";
        PlayerBoostColor = AwayColor;
        document.getElementById("boost-number").style.fill = AwayColor;
        document.getElementById("BoostTick").style.stroke = AwayColor;
        document.getElementById("StatbugItem").style.backgroundColor = AwayColor;
    }
}


// Followed Player Boost
function FollowedBoost() {
    if (followed === null) {
        return;
    }
    const targetboost = players.filter(p => p.Name === followed)[0].Boost;
    // let percent = followed.Boost / 100;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.arc(1720, 750, 118, 0.498 * Math.PI, 2 * Math.PI);
    ctx.strokeStyle = BoostFill;
    ctx.lineWidth = 15;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(1720, 750, 118, 0.498 * Math.PI, (0.5 * Math.PI) + (targetboost / 100) * 1.5 * Math.PI);
    ctx.strokeStyle = PlayerBoostColor;
    ctx.lineWidth = 15;
    ctx.stroke();
    // adjust boost-number
    document.getElementById("boost-number").innerHTML = targetboost ?? 0;
}

// Determine Scorecard/Boost Visibility
function TargetVisibility() {
    if (gameData.Game.bHasTarget && !isReplay) {
        document.getElementById("StatbugItem").style.visibility = "visible";
        document.getElementById("boost-meter").style.visibility = "visible";
    }
    else {
        document.getElementById("StatbugItem").style.visibility = "hidden";
        document.getElementById("boost-meter").style.visibility = "hidden";
        ctx.clearRect(0, 0, c.width, c.height);
    }
}

// Update Player Scorecard
function UpdateScorecard() {
    if (followed === null) {
        return;
    }
    document.getElementById("StatbugName").innerHTML = followed;
    document.getElementById("score").innerHTML = (players.filter(p => p.Name === followed)[0].Score ?? 0);
    document.getElementById("goals").innerHTML = (players.filter(p => p.Name === followed)[0].Goals ?? 0);
    document.getElementById("assists").innerHTML = (players.filter(p => p.Name === followed)[0].Assists ?? 0);
    document.getElementById("shots").innerHTML = (players.filter(p => p.Name === followed)[0].Shots ?? 0);
    document.getElementById("saves").innerHTML = (players.filter(p => p.Name === followed)[0].Saves ?? 0);
    document.getElementById("demos").innerHTML = (players.filter(p => p.Name === followed)[0].Demos ?? 0);
}

//Set Ticks

function CreateTicks() {
    const h_container = document.getElementById("home-series");
    const a_container = document.getElementById("away-series");
    h_container.innerHTML = "";
    a_container.innerHTML = "";
    for (let i = 1; i <= maxWins; i++) {
        const h_tick = document.createElement("div");
        h_tick.classList.add("hhtick");
        h_tick.id = `h-tick-${maxWins - i + 1}`;
        h_container.appendChild(h_tick);
        const a_tick = document.createElement("div");
        a_tick.classList.add("aatick");
        a_tick.id = `a-tick-${i}`;
        a_container.appendChild(a_tick);
    }
}

// Upadte Scorecard Replayer
function UpdateScorecardReplay() {
    let NameScore = document.getElementById("ScoreAssist");
    let GoalThing = document.getElementById("GoalSpeed");
    document.getElementById("ScorerName").innerHTML = gameData.Scorer.Name;
    document.getElementById("ScoreAssist").innerHTML = "";
    document.getElementById("ScoreAssist").style.display = "flex";
    console.log(gameData.Scorer.TeamNum);

    if (gameData.Scorer.TeamNum === 1) {
        NameScore.style.backgroundColor = AwayColor;
        GoalThing.style.backgroundColor = AwayColor;
    }
    if (gameData.Scorer.TeamNum === 0) {
        NameScore.style.backgroundColor = HomeColor;
        GoalThing.style.backgroundColor = HomeColor;
    }

    if (!gameData.Assister || gameData.Assister === "") {
        document.getElementById("ScoreAssist").style.display = "none";
    }
    else {
        document.getElementById("ScoreAssist").innerHTML = `<img src="Assist_points_icon.webp">${gameData.Assister.Name}`;
    }

    document.getElementById("GoalSpeed").innerHTML = `${Math.round(gameData.GoalSpeed)} kph`;
}
// Set Replay ScorecardS
function ReplayScorecardVis() {
    let replayscore = document.getElementById("ReplayScorecard").innerHTML
    if (isReplay) {
        document.getElementById("ReplayScorecard").style.visibility = "visible";
    }
    else {
        document.getElementById("ReplayScorecard").style.visibility = "hidden";
    }
}

// Update Series Score
function updateSeries() {
    // home series
    for (let i = 1; i <= maxWins; i++) {
        const tick = document.getElementById(`h-tick-${i}`)
        if (i <= HomeWins) tick.classList.add('h-win');
        else tick.classList.remove('h-win');
    }
    // away series
    for (let i = 1; i <= maxWins; i++) {
        const tick = document.getElementById(`a-tick-${i}`)
        if (i <= AwayWins) tick.classList.add('a-win');
        else tick.classList.remove('a-win');
    }
}


// The actual thing that'll run


window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        HomeWins++;
        updateSeries()
    }
    if (e.key === "ArrowRight") {
        AwayWins++;
        updateSeries()
    }
    if (e.key === "ArrowDown") {
        HomeWins = 0;
        AwayWins = 0;
        updateSeries()
    }
});

window.addEventListener('MCCDataUpdate', () => {
    Render();
});





// Player Boost Sidebars
// function UpdateSideBoost() {
//     const h_container = document.getElementById("testside");
//     const a_container = document.getElementById("away-testside");
//     h_container.innerHTML = "";
//     a_container.innerHTML = "";
//     blue.forEach(p => {
//         const div = document.createElement("div");
//     div.classList.add(gameData?.Game?.Target?.Name === p.Name ? "h-sel-name-box" : "name-box");

//         div.innerHTML = `
//     <div class="player-info">
//       <span class="player-name">${p.Name}</span>
//       <span class="player-boost">${p.Boost ?? 0}</span>
//     </div>
//     <div class="boost-bar-container">
//       <div class="${(gameData?.Game?.Target?.Name === p.Name) ? "tertiary-fill" : "boost-bar-fill"}" style="width: ${p.Boost ?? 0}%"></div>
//     </div>`;
//         h_container.appendChild(div);
//     });

//     orange.forEach(p => {
//         const div = document.createElement("div");
//     div.classList.add(gameData?.Game?.Target?.Name === p.Name ? "a-sel-name-box" : "away-name-box");

//         div.innerHTML = `
//     <div class="player-info away-player-info">
//       <span class="player-name">${p.Name}</span>
//       <span class="player-boost">${p.Boost ?? 0}</span>
//     </div>
//     <div class="boost-bar-container container-away">
//       <div class="${(gameData?.Game?.Target?.Name === p.Name) ? "tertiary-fill" : "away-boost-bar-fill"}" style="width: ${p.Boost ?? 0}%"></div>
//     </div>`;
//         a_container.appendChild(div);
//     });
// }