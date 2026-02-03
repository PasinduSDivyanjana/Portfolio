/**
 * Data Loader - Injects personal data into pages
 * Load this AFTER personal-data.js on every page
 * Exposes runDataLoader() for re-running after async content (e.g. navigation) loads
 */
(function() {
    let data = (typeof PERSONAL_DATA !== 'undefined') ? PERSONAL_DATA : {};
    function applyDataToDOM() {
    // Text content replacements
    document.querySelectorAll('[data-profile]').forEach(el => {
        const key = el.getAttribute('data-profile');
        let value = data[key];
        
        if (value === undefined && key.startsWith('aboutParagraph')) {
            const num = key.replace('aboutParagraph', '');
            value = data['aboutParagraph' + num];
        }
        
        if (value !== undefined) {
            if (el.tagName === 'IMG') {
                if (key === 'profileImage') el.src = value;
                if (key === 'profileImageAlt') el.alt = value;
            } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (key === 'email') el.placeholder = value;
            } else {
                el.textContent = value;
            }
        }
    });
    
    // Stat number replacements (data-stat="yearsOfStudy" etc.)
    document.querySelectorAll('[data-stat]').forEach(el => {
        const statKey = el.getAttribute('data-stat');
        if (data.stats && data.stats[statKey] !== undefined) {
            el.textContent = data.stats[statKey];
            el.setAttribute('data-count', data.stats[statKey]);
        }
    });
    
    // Link href replacements
    document.querySelectorAll('[data-profile-href]').forEach(el => {
        const key = el.getAttribute('data-profile-href');
        let href = '';
        if (key === 'email') {
            href = 'mailto:' + data.email;
        } else if (data.social && data.social[key]) {
            href = data.social[key];
        }
        if (href) el.href = href;
    });
    
    // Image src for profile
    document.querySelectorAll('[data-profile-img]').forEach(el => {
        const key = el.getAttribute('data-profile-img');
        if (key === 'profileImage' && data.profileImage) {
            el.src = data.profileImage;
            if (data.profileImageAlt) el.alt = data.profileImageAlt;
        }
    });
    
    // Page title
    const pageSuffix = document.documentElement.getAttribute('data-page-suffix') || 
                       document.body.getAttribute('data-page-suffix');
    if (pageSuffix && data.name) {
        document.title = data.name + ' | ' + pageSuffix;
    }
    }

    function runDataLoader() {
        if (typeof PERSONAL_DATA === 'undefined') return;
        data = PERSONAL_DATA;
        try {
            const preview = localStorage.getItem('portfolio_preview_data');
            if (preview) data = { ...PERSONAL_DATA, ...JSON.parse(preview) };
        } catch (e) {}
        window.PERSONAL_DATA = data;
        applyDataToDOM();
    }

    runDataLoader();
    window.runDataLoader = runDataLoader;
})();
