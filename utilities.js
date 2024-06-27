

function windowResized() {
    let fontSize = 10;

    // Create a temporary element to measure character dimensions
    let tempElem = createDiv('@');
    tempElem.style('font-size', fontSize + 'px');
    tempElem.style('position', 'absolute');
    tempElem.style('visibility', 'hidden');
    tempElem.parent(document.body);

    let charWidth = tempElem.elt.offsetWidth;
    let charHeight = tempElem.elt.offsetHeight;
    tempElem.remove();

    let docWidth = document.documentElement.clientWidth;
    let docHeight = document.documentElement.clientHeight;

    cols = Math.floor(docWidth / charWidth);
    rows = Math.floor(docHeight / charHeight);

    asciiWave.style('font-size', fontSize + 'px');
    asciiWave.style('width', docWidth + 'px');
    asciiWave.style('height', docHeight + 'px');
}


/* Toggle dark mode */

document.addEventListener('DOMContentLoaded', (event) => {
    const toggleBtn = document.getElementById('mode-toggle-btn');

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            toggleBtn.textContent = '☼'; // Dark mode is on, set button to moon
        } else {
            toggleBtn.textContent = '☽︎'; // Dark mode is off, set button to sun
        }
    });
});

/* glitchy text */

window.onload = function () {
    const roles = ["Artist", "Full-Stack Developer", "Designer", "Photographer", "Writer"];
    let currentRoleIndex = 0;
    const roleTextElement = document.getElementById('role-text');

    function getRandomString(length) {
        const chars = "!@#$%^&*()-+=<>?{}[]|.,;:'";
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function ellipsisAnimation() {
        const ellipsisStates = ["", ".", "..", "..."];
        let currentStateIndex = 0;
        return setInterval(() => {
            roleTextElement.textContent = roles[currentRoleIndex] + ellipsisStates[currentStateIndex];
            currentStateIndex = (currentStateIndex + 1) % ellipsisStates.length;
        }, 400); // Adjust the speed of the ellipsis animation
    }

    let ellipsisInterval = ellipsisAnimation();

    setInterval(() => {
        clearInterval(ellipsisInterval);

        let glitchInterval = setInterval(() => {
            roleTextElement.textContent = getRandomString(roles[currentRoleIndex].length);
        }, 100); // Adjust the frequency of the glitch effect

        setTimeout(() => {
            clearInterval(glitchInterval);
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            roleTextElement.textContent = roles[currentRoleIndex];
            ellipsisInterval = ellipsisAnimation();
        }, 800); // Adjust the duration of the glitch effect
    }, 5000);
}

// Photo Gallery

const gallery = document.getElementById('gallery');
const viewer = new Viewer(gallery);