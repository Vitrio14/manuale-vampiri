// Horde RP V5 — Manuale Vampiri
// Section navigation + mobile hamburger + storia sub-tabs

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.getElementById('nav-hamburger');
    const navLinksContainer = document.getElementById('nav-links');

    function showSection(id) {
        sections.forEach(s => s.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));

        const target = document.getElementById(id);
        if (target) {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Close mobile menu
        if (navLinksContainer) navLinksContainer.classList.remove('nav-open');
        if (hamburger) hamburger.classList.remove('is-open');
    }

    // Expose globally for onclick cards
    window.showSection = showSection;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            if (section) showSection(section);
        });
    });

    // Hamburger
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-open');
            navLinksContainer.classList.toggle('nav-open');
        });
    }

    // Hash support
    if (location.hash) {
        const id = location.hash.replace('#', '');
        if (document.getElementById(id)) showSection(id);
    }

    // ===== STORIA SUB-TABS =====
    const storiaTabs = document.querySelectorAll('.storia-tab');
    const storiaPanels = document.querySelectorAll('.storia-panel');

    storiaTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const key = tab.getAttribute('data-storia');
            storiaTabs.forEach(t => t.classList.remove('is-active'));
            storiaPanels.forEach(p => p.classList.remove('is-active'));
            tab.classList.add('is-active');
            const panel = document.getElementById('storia-' + key);
            if (panel) panel.classList.add('is-active');
        });
    });
});
