// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (3 + Math.random() * 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Mobile menu toggle
// function toggleMenu() {
//     const nav = document.getElementById('nav');
//     const menuToggle = document.querySelector('.menu-toggle');
    
//     nav.classList.toggle('active');
    
//     const icon = menuToggle.querySelector('i');
//     if (nav.classList.contains('active')) {
//         icon.classList.remove('fa-bars');
//         icon.classList.add('fa-times');
//     } else {
//         icon.classList.remove('fa-times');
//         icon.classList.add('fa-bars');
//     }
// }

// Highlight card function
function highlightCard(dot) {
    // Remove highlight from all cards
    document.querySelectorAll('.Education-Card').forEach(card => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
    
    // Highlight the clicked card
    const card = dot.nextElementSibling.querySelector('.Education-Card');
    card.style.transform = 'translateY(-15px) scale(1.02)';
    card.style.boxShadow = '0 25px 50px rgba(34, 210, 230, 0.3)';
    
    // Reset after 3 seconds
    setTimeout(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
    }, 3000);
}

// Animate progress bars on scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-bar');
            if (progressBar) {
                // Trigger the animation by re-applying the CSS variable
                const progress = entry.target.getAttribute('data-progress');
                progressBar.style.setProperty('--progress', progress + '%');
            }
        }
    });
}, observerOptions);

// Observe all education cards
document.querySelectorAll('.Education-Card').forEach(card => {
    observer.observe(card);
});

// Responsive handling
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        document.getElementById('nav').classList.remove('active');
        document.querySelector('.menu-toggle i').classList.remove('fa-times');
        document.querySelector('.menu-toggle i').classList.add('fa-bars');
    }
});

// Add scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const timeline = document.querySelector('.Education-Timeline');
    
    if (timeline) {
        const timelineOffset = scrolled * 0.1;
        timeline.style.transform = `translateY(${timelineOffset}px)`;
    }
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const current = parseInt(counter.textContent);
        const increment = target / 50;
        
        if (current < target) {
            counter.textContent = Math.ceil(current + increment);
            setTimeout(() => animateCounters(), 50);
        }
    });
}

// Start counter animation when page loads
window.addEventListener('load', () => {
    setTimeout(animateCounters, 1000);
});

// Add mobile menu toggle functionality
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
menuToggle.style.cssText = `
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1001;
    background: var(--gradient-primary);
    border: none;
    border-radius: 10px;
    padding: 0.8rem;
    color: var(--bg-color);
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
`;

document.body.appendChild(menuToggle);

// Show menu toggle on mobile
if (window.innerWidth <= 1024) {
    menuToggle.style.display = 'block';
}

menuToggle.addEventListener('click', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
    
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Responsive handling
window.addEventListener('resize', () => {
    if (window.innerWidth <= 1024) {
        menuToggle.style.display = 'block';
    } else {
        menuToggle.style.display = 'none';
        document.querySelector('nav').classList.remove('active');
    }
});