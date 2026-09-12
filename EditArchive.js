const socket = new WebSocket('ws://localhost:2026');

// DONT TOUCH
var r = document.querySelector(':root')

// Global Variables
let parsed = null;
let gameData = null;
let players = null;
let blue = null;
let orange = null;
let followed = null;
let UpdateType = null;
let BoostFill = "";
let PlayerBoostColor = "";
let isReplay = false;
let HomeWins = 0;
let AwayWins = 0;

// Sets colors in CSS
function ColorSet() {
    r.style.setProperty('--HomeColor', HomeColor);
    r.style.setProperty('--AwayColor', AwayColor);
    r.style.setProperty('--TertiaryColor', TertiaryColor);
}


//Grabs Data Info, this be regex 
function DataGrab(event) {
    try {
        const chunks = event.data.match(/\{"Event":.+?\}(?=\{"Event"|$)/g) || [event.data];
        chunks.forEach(chunk => {
            parsed = JSON.parse(chunk);
            gameData = JSON.parse(parsed.Data);
        });
    }
    catch (error) {
        console.error("Error parsing JSON:", error);
        return;
    }
}

// Process all Game Data
function DataProcess() {
    if (UpdateType === "UpdateState") {
        players = gameData.Players;
        blue = players.filter(p => p.TeamNum === 0);
        blueName = blue.map(blue => blue.Name);
        orange = players.filter(p => p.TeamNum === 1);
        orangeName = orange.map(orange => orange.Name);
        if (gameData.Game.bHasTarget) {
            followed = gameData.Game.Target.Name;
        }
        else {
            followed = null;
        }
        if (gameData.Game.bReplay) {
            isReplay = true;
        }
        else {
            isReplay = false;
        }
    }
    if (UpdateType === "MatchEnded") {
        GameWinner();
    }
}

// Get Event Type
function EventType() {
    try {
        UpdateType = parsed.Event;
    }
    catch (error) {
        console.error("Error determining event type:", error);
        return;
    }
}

function GameWinner() {
    if (gameData.WinnerTeamNum === 0) {
        HomeWins++;
    }
    else if (gameData.WinnerTeamNum === 1) {
        AwayWins++;
    }
}


ColorSet();
socket.onmessage = (event) => {
    DataGrab(event);
    EventType();
    DataProcess();
    const dataEvent = new CustomEvent('MCCDataUpdate');
    window.dispatchEvent(dataEvent);
}