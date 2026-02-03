// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrollPercent + '%';
});

// Mobile Navigation Toggle (waits for nav to load if async)
function initNavToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    const navOverlay = document.getElementById('navOverlay');
    if (!menuToggle || !navbar) return;
    const menuIcon = menuToggle.querySelector('i');

    function toggleNav() {
        navbar.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');
        if (menuIcon) {
            if (navbar.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    }

    menuToggle.addEventListener('click', toggleNav);
    if (navOverlay) navOverlay.addEventListener('click', toggleNav);

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) toggleNav();
        });
        link.setAttribute('tabindex', '0');
        link.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbar.classList.contains('active')) toggleNav();
    });
}

if (document.getElementById('navbar')) {
    initNavToggle();
} else {
    document.addEventListener('navLoaded', initNavToggle);
}

// Typewriter Effect
const typewriterText = document.getElementById('typewriter');
const words = (window.PERSONAL_DATA && window.PERSONAL_DATA.titleVariations) || ['Undergraduate', 'Innovator', 'Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const speed = isDeleting ? 100 : 200;
    setTimeout(typeWriter, speed);
}

// Start typewriter effect
typeWriter();

// Dynamic particles generation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = window.innerWidth <= 768 ? 8 : 15;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
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

// Recreate particles on resize
window.addEventListener('resize', createParticles);

// Performance optimized scroll effects
let ticking = false;

function updateScrollEffects() {
    const scrollTop = window.pageYOffset;
    
    // Update floating elements with better performance
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        if (window.innerWidth > 768) { // Only animate on larger screens
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${scrollTop * speed}px) rotate(${scrollTop * 0.02}deg)`;
        }
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Enhanced social media hover effects
document.querySelectorAll('.social-media a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) {
            this.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)';
        }
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.home-content, .home-img').forEach(el => {
    observer.observe(el);
});

// Add button click effects with ripple
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Responsive handling
window.addEventListener('resize', () => {
    const navbar = document.getElementById('navbar');
    if (navbar && window.innerWidth > 1024 && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        const navOverlay = document.getElementById('navOverlay');
        if (navOverlay) navOverlay.classList.remove('active');
        const menuIcon = document.querySelector('#menuToggle i');
        if (menuIcon) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    }
    createParticles();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent horizontal scroll
document.addEventListener('touchstart', function() {}, {passive: true});
document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, {passive: false});

console.log('✨ Enhanced Mobile-Friendly Portfolio Loaded Successfully!');