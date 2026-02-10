const API_URL = 'https://randomuser.me/api/';

const elements = {
    img: document.getElementById('user-img'),
    name: document.getElementById('user-name'),
    email: document.getElementById('user-email'),
    location: document.getElementById('user-location'),
    btn: document.getElementById('generate-btn'),
    errorMsg: document.getElementById('error-msg')
};

async function fetchUser() {
    setLoadingState(true);
    
    try {
        // 1. Fetch Data
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const user = data.results[0];

        // 2. Update UI
        updateProfile(user);

    } catch (error) {
        console.error('Error fetching user:', error);
        elements.errorMsg.style.display = 'block';
        elements.errorMsg.textContent = '⚠️ Network error. Please check your connection.';
    } finally {
        setLoadingState(false);
    }
}

function updateProfile(user) {
    elements.img.src = user.picture.large;
    elements.name.textContent = `${user.name.first} ${user.name.last}`;
    elements.email.textContent = user.email;
    elements.location.textContent = `${user.location.city}, ${user.location.country}`;
}

function setLoadingState(isLoading) {
    elements.btn.disabled = isLoading;
    elements.errorMsg.style.display = 'none';

    if (isLoading) {
        elements.btn.textContent = 'Fetching...';
        // Add skeleton classes for loading effect
        elements.name.classList.add('skeleton-text');
        elements.email.classList.add('skeleton-text');
        elements.location.classList.add('skeleton-text');
        elements.img.classList.add('skeleton');
    } else {
        elements.btn.textContent = 'Generate New User';
        // Remove skeleton classes
        elements.name.classList.remove('skeleton-text');
        elements.email.classList.remove('skeleton-text');
        elements.location.classList.remove('skeleton-text');
        elements.img.classList.remove('skeleton');
    }
}

// Event Listeners
elements.btn.addEventListener('click', fetchUser);

// Initial Load
document.addEventListener('DOMContentLoaded', fetchUser);
