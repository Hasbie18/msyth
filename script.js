const canvas = document.getElementById('shootingStarCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function ShootingStar() {
    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height / 2);
    this.length = random(80, 150);
    this.speed = random(5, 10);
    this.angle = Math.PI / 4;
    this.size = random(1, 3);
    this.opacity = Math.random();

    this.update = () => {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        if (this.x > canvas.width || this.y > canvas.height) {
            this.x = random(0, canvas.width);
            this.y = random(0, canvas.height / 2);
        }
    };

    this.draw = () => {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x - this.length * Math.cos(this.angle),
            this.y - this.length * Math.sin(this.angle)
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = this.size;
        ctx.stroke();
    };
}

const shootingStars = [];
for (let i = 0; i < 10; i++) {
    shootingStars.push(new ShootingStar());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shootingStars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

animate();

// Music section
const music = document.getElementById('backgroundMusic');

// Function to save the current playback time in localStorage
function saveMusicPosition() {
    localStorage.setItem('musicTime', music.currentTime);
}

// Load saved playback time from localStorage and set it
window.addEventListener('load', () => {
    const savedTime = localStorage.getItem('musicTime');
    if (savedTime) {
        music.currentTime = parseFloat(savedTime); // Set the saved playback position
    }
    
    // Try to play the music after loading
    playMusic();
});

// Function to play the music
function playMusic() {
    music.play().catch(error => {
        console.error("Audio playback failed: ", error);
        // You can also display a message to the user here if desired
    });
}

// Save the playback position when the page is being unloaded
window.addEventListener('beforeunload', saveMusicPosition);

// Add a click event to start the audio playback on user interaction
document.addEventListener('click', () => {
    if (music.paused) {
        music.muted = false; // Ensure sound is unmuted
        playMusic(); // Play music on user interaction
    }
});

// end music section

// carousel
// JavaScript untuk carousel
const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
let index = 0;

function slideCarousel() {
    // Pindah gambar
    index = (index + 1) % images.length;
    const translateX = -index * 100; // Pindahkan 100% untuk tiap gambar
    carouselImages.style.transform = `translateX(${translateX}%)`;
}

// Jalankan slide setiap 3 detik
setInterval(slideCarousel, 3000);


// typewritter effect
const text = "Wish you all the best"; // Teks yang akan ditampilkan
let idx = 0;

function type() {
    if (index < text.length) {
        document.getElementById('typewriter-text').innerHTML += text.charAt(idx);
        idx++;
        setTimeout(type, 200); // Waktu delay antara huruf
    }
}

// Mulai efek ketik setelah halaman dimuat
window.onload = () => {
    type();
};