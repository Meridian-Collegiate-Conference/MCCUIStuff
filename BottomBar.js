const listContainer = document.getElementById("list");
var r = document.querySelector(':root')
let topicElements = [];
let currentIndex = 0;

function updateTopics(index) {
    topicElements.forEach((t, i) => {
        t.classList.toggle("active", i === index);
    });
}
window.nextTopic = () => {
    currentIndex = (currentIndex + 1) % topicElements.length;
    updateTopics(currentIndex);
};
window.prevTopic = () => {
    currentIndex = (currentIndex - 1 + topicElements.length) % topicElements.length;
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
    topicElements = [];
    TopicName.forEach((text, index) => {
        const li = document.createElement("li");
        li.classList.add("topic");
        if (index === 0) {
            li.classList.add("active");
            currentIndex = 0;
        }
        li.textContent = text;
        listContainer.appendChild(li);
        topicElements.push(li);
    });
    UIColors();
}

init();