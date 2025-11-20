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