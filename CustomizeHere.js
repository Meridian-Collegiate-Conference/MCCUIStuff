// CHANGE THIS FOR COLORS
let HomeColor = "#0c88fc";
let AwayColor = '#e2710e';
let TertiaryColor = '#FFFFFF';
let HomeName;
let AwayName;
let TopBarYap;
let BottomBarYap;
let maxWins;
let HomeLogo = "SheetsIO/files/TeamFaceoff/HomeLogo.png";
let AwayLogo = "SheetsIO/files/TeamFaceoff/AwayLogo.png";
let TopicName;
let CamAName;
let CamBName;
let CamCName;
let CamDName;
let CamAPredSchool;
let CamBPredSchool;
let CamCPredSchool;
let CamDPredSchool;
let CamAPredLogo = "SheetsIO/files/TeamFaceoff/CamAPredLogo.png";
let CamBPredLogo = "SheetsIO/files/TeamFaceoff/CamBPredLogo.png";
let CamCPredLogo = "SheetsIO/files/TeamFaceoff/CamCPredLogo.png";
let CamDPredLogo = "SheetsIO/files/TeamFaceoff/CamDPredLogo.png";
function SetStuff() {
    TeamInfoSet();
    BarsSet();
    CreateTicks();
}
function CamStuff() {
    UpdateCamNames();
    UpdatePreds();
    UpdateImgs();
}

function ColorSet() {
    r.style.setProperty('--HomeColor', HomeColor)
    r.style.setProperty('--AwayColor', AwayColor)
    r.style.setProperty('--TertiaryColor', TertiaryColor)
}


async function getData(pathway) {
    const response = await fetch(pathway);
    return await response.text();
}


async function loadConfig() {
    HomeColor = await getData("SheetsIO/files/TeamFaceoff/HomeColor.txt");
    AwayColor = await getData("SheetsIO/files/TeamFaceoff/AwayColor.txt");
    TertiaryColor = await getData("SheetsIO/files/TeamFaceoff/TertiaryColor.txt");
    HomeName = await getData("SheetsIO/files/TeamFaceoff/HomeName.txt");
    AwayName = await getData("SheetsIO/files/TeamFaceoff/AwayName.txt");
    TopBarYap = await getData("SheetsIO/files/TeamFaceoff/TopBar.txt");
    BottomBarYap = await getData("SheetsIO/files/TeamFaceoff/BottomBar.txt");
    maxWins = await getData("SheetsIO/files/TeamFaceoff/MaxWins.txt");
    TopicName = await getData("SheetsIO/files/TeamFaceoff/TopicName.txt");
    TopicName = TopicName.split(",");
    CamAName = await getData("SheetsIO/files/TeamFaceoff/CamAName.txt");
    CamBName = await getData("SheetsIO/files/TeamFaceoff/CamBName.txt");
    CamCName = await getData("SheetsIO/files/TeamFaceoff/CamCName.txt");
    CamDName = await getData("SheetsIO/files/TeamFaceoff/CamDName.txt");
    CamAPredSchool = await getData("SheetsIO/files/TeamFaceoff/CamAPred.txt");
    CamBPredSchool = await getData("SheetsIO/files/TeamFaceoff/CamBPred.txt");
    CamCPredSchool = await getData("SheetsIO/files/TeamFaceoff/CamCPred.txt");
    CamDPredSchool = await getData("SheetsIO/files/TeamFaceoff/CamDPred.txt");
    try {
        ColorSet();
    }
    catch (error) {
        console.error("Error updating background color:", error);
    }
    try {
        SetStuff();
    }
    catch (error) {
        console.error("Error setting up the UI:", error);
    }
    try {
        CamStuff();
    }
    catch (error) {
        console.error("Error setting up camera", error);
    }
    try {
        updateUpper();
        CreateStatTicks();
    }
    catch (error) {
        console.error("Error updating upper section:", error);
    }
}

loadConfig();
