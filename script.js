// Horde RP V5 — Manuale Vampiri
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
        if (navLinksContainer) navLinksContainer.classList.remove('nav-open');
        if (hamburger) hamburger.classList.remove('is-open');
    }
    window.showSection = showSection;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            if (section) showSection(section);
        });
    });

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-open');
            navLinksContainer.classList.toggle('nav-open');
        });
    }

    if (location.hash) {
        const id = location.hash.replace('#', '');
        if (document.getElementById(id)) showSection(id);
    }

    document.querySelectorAll('.storia-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const key = tab.getAttribute('data-storia');
            document.querySelectorAll('.storia-tab').forEach(t => t.classList.remove('is-active'));
            document.querySelectorAll('.storia-panel').forEach(p => p.classList.remove('is-active'));
            tab.classList.add('is-active');
            const panel = document.getElementById('storia-' + key);
            if (panel) panel.classList.add('is-active');
        });
    });

    initManuale();
});

function initManuale() {
    const coverView = document.getElementById('manuale-cover-view');
    const inside = document.getElementById('manuale-inside');
    const closeBtn = document.getElementById('manuale-close');
    if (!coverView || !inside) return;

    function setVolume(vol) {
        document.querySelectorAll('.manuale-vol-pane').forEach(p => {
            p.classList.toggle('is-on', p.id === 'manuale-v' + vol);
        });
    }

    function openManuale(vol) {
        coverView.style.display = 'none';
        inside.hidden = false;
        inside.style.display = 'block';
        setVolume(vol || 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function closeManuale() {
        inside.hidden = true;
        inside.style.display = 'none';
        coverView.style.display = 'flex';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const openV1 = document.getElementById('manuale-open-v1');
    const ctaV1 = document.getElementById('manuale-cta-v1');
    const openV2 = document.getElementById('manuale-open-v2');
    const ctaV2 = document.getElementById('manuale-cta-v2');

    if (openV1) openV1.addEventListener('click', () => openManuale(1));
    if (ctaV1) ctaV1.addEventListener('click', () => openManuale(1));
    if (openV2) openV2.addEventListener('click', () => openManuale(2));
    if (ctaV2) ctaV2.addEventListener('click', () => openManuale(2));
    if (closeBtn) closeBtn.addEventListener('click', closeManuale);

    function showPage(id) {
        document.querySelectorAll('.manuale-nav-btn').forEach(b => {
            b.classList.toggle('is-on', b.getAttribute('data-page') === id);
        });
        document.querySelectorAll('.manuale-page').forEach(p => {
            p.classList.toggle('is-on', p.id === 'mp-' + id);
        });
    }

    document.querySelectorAll('.manuale-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => showPage(btn.getAttribute('data-page')));
    });

    document.querySelectorAll('.manuale-toc button[data-goto]').forEach(btn => {
        btn.addEventListener('click', () => showPage(btn.getAttribute('data-goto')));
    });

    document.addEventListener('keydown', (e) => {
        const sec = document.getElementById('libro');
        if (!sec || !sec.classList.contains('active')) return;
        if (!inside.hidden && e.key === 'Escape') closeManuale();
    });

    closeManuale();
}
