/**
 * Loads navigation from components/navigation.html into #nav-container
 * Sets active link based on current page
 */
(function() {
    const NAV_FALLBACK = `<nav id="navbar">
    <div class="nav-header">
        <div class="nav-logo" data-profile="name">Pasindu S Divyanjana</div>
        <div class="nav-subtitle" data-profile="title">Undergraduate</div>
    </div>
    <ul>
        <li><a href="index.html"><i class="fas fa-home"></i> <span>Home</span></a></li>
        <li><a href="About_Me.html"><i class="fas fa-user"></i> <span>About</span></a></li>
        <li><a href="Experience.html"><i class="fas fa-layer-group"></i> <span>Experiences</span></a></li>
        <li><a href="Education.html"><i class="fa-solid fa-graduation-cap"></i> <span>Education</span></a></li>
        <li><a href="Project.html"><i class="fas fa-project-diagram"></i> <span>Projects</span></a></li>
        <li><a href="Certificates.html"><i class="fa-solid fa-award"></i> <span>Certificates & Achievements</span></a></li>
        <li><a href="Contact_Me.html"><i class="fas fa-envelope"></i> <span>Contact Me</span></a></li>
    </ul>
    <div class="nav-footer">
        <div class="nav-subtitle-footer" data-profile="copyright">© Pasindu S Divyanjana 2025</div>
    </div>
</nav>`;

    function loadNav() {
        const container = document.getElementById('nav-container');
        if (!container) return;

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        function insertNav(html) {
            container.innerHTML = html;
            container.querySelectorAll('a[href]').forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                    link.classList.add('active');
                }
            });
            if (typeof window.runDataLoader === 'function') window.runDataLoader();
            document.dispatchEvent(new CustomEvent('navLoaded'));
        }

        fetch('components/navigation.html')
            .then(r => r.ok ? r.text() : Promise.reject())
            .then(insertNav)
            .catch(() => insertNav(NAV_FALLBACK));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNav);
    } else {
        loadNav();
    }
})();
