const roles = ["Web Developer", "Web Designer", "Security Analyst", "App Developer"];
const typingDelay = 100;
const erasingDelay = 60;
const newTextDelay = 2000;
let charIndex = 0;
let roleIndex = 0;
const typingTextElement = document.querySelector(".typing-text");

function type() {
    if (charIndex < roles[roleIndex].length) {
        typingTextElement.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typingTextElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        roleIndex++;
        if (roleIndex >= roles.length) roleIndex = 0;
        setTimeout(type, typingDelay + 500);
    }
}

// Scroll Animation Observer setup
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            
            // Setup Circular Progress animation on reveal
            const progressCircle = entry.target.querySelector('.progress-ring-circle');
            if (progressCircle) {
                const percentAttr = entry.target.querySelector('.circular-progress').getAttribute('data-percent');
                const percent = Math.abs(parseInt(percentAttr, 10)); // absolute to handle -50
                const radius = progressCircle.r.baseVal.value;
                const circumference = radius * 2 * Math.PI;
                const offset = circumference - (percent / 100) * circumference;
                
                setTimeout(() => {
                    progressCircle.style.strokeDashoffset = offset;
                }, 400); 
            }
            
            observer.unobserve(entry.target); // Unobserve once animated
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function() {
    // Start typing animation
    if(roles.length && typingTextElement) {
        setTimeout(type, 1500); 
    }
    
    // Smooth scrolling active state update
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialize Observer for scroll
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Dark Mode Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on load
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});
