const topicDisplay = document.getElementById("topic-display");
var r = document.querySelector(':root');
let currentIndex = 0;

function updateTopics(index) {
    if (topicDisplay && TopicName[index]) {
        topicDisplay.textContent = TopicName[index];
    }
}

window.nextTopic = () => {
    if (!TopicName || TopicName.length === 0) return;
    currentIndex = (currentIndex + 1) % TopicName.length;
    updateTopics(currentIndex);
};

window.prevTopic = () => {
    if (!TopicName || TopicName.length === 0) return;
    currentIndex = (currentIndex - 1 + TopicName.length) % TopicName.length;
    updateTopics(currentIndex);
};

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") window.nextTopic();
    else if (e.key === "ArrowLeft") window.prevTopic();
});

function UIColors() {
    r.style.setProperty('--HomeColor', HomeColor);
    r.style.setProperty('--AwayColor', AwayColor);
    r.style.setProperty('--TertiaryColor', TertiaryColor);
}

async function init() {
    await loadConfig();
    await UIColors();
    
    if (TopicName && TopicName.length > 0) {
        currentIndex = 0;
        updateTopics(currentIndex);
    }
}

init();