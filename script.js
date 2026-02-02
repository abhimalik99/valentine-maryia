// Music Toggle
let musicPlaying = false;
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const btn = document.querySelector('.music-toggle');
    if (musicPlaying) {
        audio.pause();
        btn.textContent = '🔇';
        musicPlaying = false;
    } else {
        audio.currentTime = 12;
        audio.play();
        btn.textContent = '🎵';
        musicPlaying = true;
    }
}

// Show Valentine Question and start music
function showValentineQuestion() {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.querySelector('.music-toggle');

    // Start the music from 12 seconds
    audio.currentTime = 12;
    audio.play();
    musicBtn.textContent = '🎵';
    musicPlaying = true;

    // Hide intro, show valentine question with animation
    const introScreen = document.getElementById('introScreen');
    const valentineScreen = document.getElementById('valentineScreen');
    const photoCollage = document.getElementById('photoCollage');

    introScreen.style.animation = 'fadeOut 0.5s ease forwards';

    setTimeout(() => {
        introScreen.classList.add('hidden');
        valentineScreen.classList.remove('hidden');
        photoCollage.classList.remove('hidden');
        valentineScreen.style.animation = 'fadeIn 0.8s ease forwards';
    }, 500);
}

// Setup evading buttons on load
window.addEventListener('DOMContentLoaded', function () {
    // Intro No button evading
    const introNoBtn = document.getElementById('introNoBtn');
    if (introNoBtn) {
        introNoBtn.addEventListener('mouseover', evadeClick);
        introNoBtn.addEventListener('mouseenter', evadeClick);
        introNoBtn.addEventListener('touchstart', evadeClick);
    }

    // Valentine No button evading
    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.addEventListener('mouseover', evadeClick);
        noBtn.addEventListener('mouseenter', evadeClick);
        noBtn.addEventListener('touchstart', evadeClick);
    }
});

// Evade count for different buttons
let evadeCounts = {};

function evadeClick(e) {
    e.preventDefault();
    const btn = e.target;
    const btnId = btn.id;

    if (!evadeCounts[btnId]) evadeCounts[btnId] = 0;
    evadeCounts[btnId]++;
    const count = evadeCounts[btnId];

    // Get button dimensions
    const btnRect = btn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    // Stay closer to center, with increasing range as count goes up
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Start with small movements, gradually increase range
    const range = Math.min(150 + count * 20, 300);

    // Calculate boundaries - keep button well within screen
    const padding = 100;
    const minX = padding;
    const minY = padding;
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    // Move in a random direction from center
    let newX = centerX - btnWidth / 2 + (Math.random() - 0.5) * range * 2;
    let newY = centerY - btnHeight / 2 + (Math.random() - 0.5) * range * 2;

    // Make sure it actually moves away from current position
    const currentX = btnRect.left;
    const currentY = btnRect.top;

    if (Math.abs(newX - currentX) < 80) {
        newX = currentX + (Math.random() > 0.5 ? 120 : -120);
    }
    if (Math.abs(newY - currentY) < 80) {
        newY = currentY + (Math.random() > 0.5 ? 100 : -100);
    }

    // Clamp to stay on screen
    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));

    // Apply the new position with smooth transition
    btn.style.position = 'fixed';
    btn.style.transition = 'left 0.2s ease, top 0.2s ease';
    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';
    btn.style.zIndex = '1000';

    // Fun text changes based on evade count
    if (count >= 2) btn.textContent = 'Hehe! 😏';
    if (count >= 4) btn.textContent = 'Nope! 🏃';
    if (count >= 6) btn.textContent = "Too slow! 😜";
    if (count >= 8) btn.textContent = 'Just say yes! 💕';
    if (count >= 10) {
        const scale = Math.max(0.6, 1 - (count - 10) * 0.08);
        btn.style.transform = `scale(${scale})`;
        btn.textContent = 'Please? 🥺';
    }
    if (count >= 14) {
        btn.textContent = '😢';
        btn.style.transform = 'scale(0.5)';
    }

    // Shake animation
    btn.classList.add('shake');
    setTimeout(() => btn.classList.remove('shake'), 300);
}

// Add animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px) rotate(-5deg); }
        75% { transform: translateX(5px) rotate(5deg); }
    }
    .shake {
        animation: shake 0.3s ease-in-out;
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
    .hidden {
        display: none !important;
    }
`;
document.head.appendChild(style);

// Yes button - takes to celebration page
function sayYes() {
    const btn = document.querySelector('#valentineScreen .yes-btn');
    btn.textContent = '💖💖💖';
    btn.style.transform = 'scale(1.3)';

    // Create heart burst effect
    for (let i = 0; i < 20; i++) {
        createHeart();
    }

    // Redirect after a short delay
    setTimeout(() => {
        window.location.href = 'yes.html';
    }, 800);
}

// Create floating hearts on yes click
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 30 + 20}px;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        pointer-events: none;
        z-index: 9999;
        animation: floatUp 1.5s ease-out forwards;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
}

// Add float up animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-200px) scale(1.5);
        }
    }
`;
document.head.appendChild(floatStyle);
