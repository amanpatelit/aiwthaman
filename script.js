// Smooth scrolling for navigation links (only for hash links on same page)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.right = '20px';
        navLinks.style.backgroundColor = 'rgba(10, 14, 39, 0.98)';
        navLinks.style.padding = '1rem';
        navLinks.style.borderRadius = '5px';
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.95)';
        }
    }
});

// Animate elements on scroll with fade-in-up
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .quick-link-card').forEach(el => {
    observer.observe(el);
});

// Skill Progress Bar Animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.setProperty('--progress', progress + '%');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-bar').forEach(bar => {
    progressObserver.observe(bar);
});

// Real-time Clock in Footer (optional enhancement)
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

setInterval(updateClock, 1000);

// Typing Effect
const typedTextElement = document.getElementById('typed-text');
if (typedTextElement) {
    const textArray = ['AWS Expert', 'Cloud Architect', 'Serverless Specialist', 'Infrastructure as Code', 'AI Integration Expert'];
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, 500);
        }
    }

    // Start typing effect after page load
    setTimeout(type, 1000);
}

// Particle Animation
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(0, 204, 153, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            // Connect particles
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 204, 153, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}

// Add parallax effect to hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        hero.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
    }
});

// Dynamic Icon Color Change on Hover
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.color = '#00ff99';
            icon.style.transition = 'color 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        if (icon && !icon.style.color.includes('rgb')) {
            icon.style.color = '';
        }
    });
});

// Protection features - right-click and inspect disabled

// Disable right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+S (Save)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
    }
});

// Disable text selection
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
});

// Disable copy
document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
});

// Disable cut
document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
});

// Disable drag
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
});
