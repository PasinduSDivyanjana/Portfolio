// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Contact card functions (use PERSONAL_DATA from data-loader)
function openEmail() {
    const email = (window.PERSONAL_DATA && window.PERSONAL_DATA.email) || 'pasindushehan0927@gmail.com';
    window.open('mailto:' + email, '_blank');
}

function openLinkedIn() {
    const url = (window.PERSONAL_DATA && window.PERSONAL_DATA.social && window.PERSONAL_DATA.social.linkedin) || 'https://www.linkedin.com/in/pasindu-s-divyanjana/';
    window.open(url, '_blank');
}

function openGitHub() {
    const url = (window.PERSONAL_DATA && window.PERSONAL_DATA.social && window.PERSONAL_DATA.social.github) || 'https://github.com/PasinduSDivyanjana';
    window.open(url, '_blank');
}

function copyPhone() {
    navigator.clipboard.writeText('+94763995297').then(() => {
        alert('Phone number copied to clipboard!');
    });
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const subject = `Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    const email = (window.PERSONAL_DATA && window.PERSONAL_DATA.email) || 'pasindushehan0927@gmail.com';
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
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