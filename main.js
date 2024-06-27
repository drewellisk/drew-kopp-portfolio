document.addEventListener('DOMContentLoaded', (event) => {
    initializeDarkMode();
    sortPostsByDate();
    setupLandingPage();
    setupEventListeners();
    showPosts('home'); // Display home category posts on page load
});


// Initialize dark mode
function initializeDarkMode() {
    document.body.classList.add('dark-mode');
}

// Sort posts by date
function sortPostsByDate() {
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Setup the landing page
function setupLandingPage() {
    const landingPage = document.createElement('div');
    landingPage.id = 'landing-page';

    const enterButton = document.createElement('button');
    enterButton.id = 'enter-site-button';
    enterButton.textContent = 'Enter Site';

    landingPage.appendChild(enterButton);
    document.body.appendChild(landingPage);

    enterButton.addEventListener('click', () => {
        landingPage.style.display = 'none';
        document.body.classList.add('dark-mode');
        const appContainer = document.getElementById('app');
        appContainer.style.display = 'block';
        initializeSPA();
    });
}

// Setup event listeners
function setupEventListeners() {
    document.querySelectorAll(".side-column-menu ul li a").forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            handleLinkClick(link);
        });
    });
}

// SPA Initialization
function initializeSPA() {
    showRecentPosts();

    document.querySelectorAll(".side-column-menu ul li a").forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            handleLinkClick(link);
        });
    });

    initializeResumeModal();
}


// Show posts by category
function showPosts(category) {
    const mainContent = document.querySelector(".main-content-box");

    // Clear the main content
    mainContent.innerHTML = '';

    // Check if category is 'home' or another category
    if (category === 'home') {
        // Find the 'home' category post
        const homePost = posts.find(post => post.category === 'home');
        
        // Display 'home' category content
        if (homePost) {
            mainContent.innerHTML += `
                <h6>${homePost.title}</h6>
                <p>${homePost.date}</p>
                ${homePost.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
                ${homePost.media ? homePost.media.map(mediaItem => {
                    if (mediaItem.type === "image") {
                        return `<img src="${mediaItem.src}" alt="${mediaItem.alt}" />`;
                    }
                    return '';
                }).join('') : ''}
                <hr />
            `;
        }
    } else {
        // Display posts for other categories
        const categoryPosts = posts.filter(post => post.category === category);
        categoryPosts.forEach(post => {
            mainContent.innerHTML += `
                <h6>${post.title}</h6>
                <p>${post.date}</p>
                ${post.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
                ${post.media ? post.media.map(mediaItem => {
                    if (mediaItem.type === "image") {
                        return `<img src="${mediaItem.src}" alt="${mediaItem.alt}" />`;
                    }
                    return '';
                }).join('') : ''}
                <hr />
            `;
        });
    }
}



// Show recent posts
function showRecentPosts() {
    const container = document.querySelector(".recent-posts-container");
    container.innerHTML = '';

    const recentPosts = posts.slice(0, 5);
    recentPosts.forEach(post => {
        container.innerHTML += `
            <h6>${post.title}</h6>
            <p>${post.date}</p>
            ${post.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
            ${post.media ? post.media.map(mediaItem => {
            if (mediaItem.type === "image") {
                return `<img src="${mediaItem.src}" alt="${mediaItem.alt}" />`;
            }
            return '';
        }).join('') : ''}
            <hr />
        `;
    });
}





function handleLinkClick(link) {
    const category = link.getAttribute('href').replace('#', '');

    document.querySelectorAll(".side-column-menu ul li a").forEach(link => {
        link.classList.remove('current-page');
    });

    link.classList.add('current-page');

    showPosts(category);
}


// Initialize the resume modal
function initializeResumeModal() {
    const modal = document.getElementById('resume-modal');
    const span = document.querySelector('.close');
    const resumeBtn = document.getElementById('resume-link');

    resumeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'block';
    });

    span.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
