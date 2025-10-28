/**
 * Module Loader - Loads header and footer across all pages
 */
class ModuleLoader {
    /**
     * Load header and footer modules
     */
    static async loadModules() {
        await Promise.all([
            this.loadHeader(),
            this.loadFooter()
        ]);

        // Set active navigation state
        this.setActiveNavigation();

        // Ensure app scripts/effects run on every page (HTML remains unchanged)
        try { await this.ensureAppInit(); } catch (e) { console.warn('ensureAppInit failed', e); }

        // Initialize navigation after header is loaded
        if (typeof window !== 'undefined' && typeof window.NavigationManager !== 'undefined') {
            new window.NavigationManager();
        }
    }


    /**
     * Load header module
     */
    static async loadHeader() {
        try {
            const base = (location && location.protocol === 'file:') ? '' : '/';
            const response = await fetch(`${base}components/header.html`);
            const headerHTML = await response.text();

            // Find header placeholder or create one
            let headerContainer = document.getElementById('header-placeholder');
            if (!headerContainer) {
                headerContainer = document.createElement('div');
                headerContainer.id = 'header-placeholder';
                document.body.insertBefore(headerContainer, document.body.firstChild);
            }

            headerContainer.innerHTML = headerHTML;

            // Adjust absolute root links for local file:// browsing
            if (location && location.protocol === 'file:') {
                const map = {
                    '/': 'index.html',
                    '/index.html': 'index.html',
                    '/about.html': 'about.html',
                    '/contact.html': 'contact.html',
                    '/blog.html': 'blog.html',
                    '/store.html': 'store.html',
                    '/documents/Felix Oyeleke - Property Management.pdf': 'documents/Felix Oyeleke - Property Management.pdf'
                };
                headerContainer.querySelectorAll('a[href^="/"]').forEach(a => {
                    const href = a.getAttribute('href');
                    a.setAttribute('href', map[href] || href.replace(/^\//, ''));
                });
            }
            // Wire up mobile menu toggle immediately after header injection
            // Ensure mobile hamburger works even if NavigationManager didn’t init yet
            const toggle = document.getElementById('mobileMenuToggle');
            const menu = document.getElementById('navMenu');
            if (toggle && menu && !toggle.dataset.bound) {
                toggle.addEventListener('click', () => {
                    menu.classList.toggle('active');
                    toggle.classList.toggle('active');
                });
                toggle.dataset.bound = '1';
            }
            console.log('✅ Header module loaded');

        } catch (error) {
            console.error('❌ Failed to load header:', error);
        }
    }


    /**
     * Load footer module
     */
    static async loadFooter() {
        try {
            const base = (location && location.protocol === 'file:') ? '' : '/';
            const response = await fetch(`${base}components/footer.html`);
            const footerHTML = await response.text();

            // Find footer placeholder or create one
            let footerContainer = document.getElementById('footer-placeholder');
            if (!footerContainer) {
                footerContainer = document.createElement('div');
                footerContainer.id = 'footer-placeholder';
                document.body.appendChild(footerContainer);
            }

            // After footer loads, nothing extra for now
            footerContainer.innerHTML = footerHTML;
            // Adjust absolute root links for local file:// browsing
            if (location && location.protocol === 'file:') {
                const map = {
                    '/': 'index.html',
                    '/index.html': 'index.html',
                    '/about.html': 'about.html',
                    '/contact.html': 'contact.html',
                    '/blog.html': 'blog.html',
                    '/store.html': 'store.html'
                };
                footerContainer.querySelectorAll('a[href^="/"]').forEach(a => {
                    const href = a.getAttribute('href');
                    a.setAttribute('href', map[href] || href.replace(/^\//, ''));
                });
            }

            console.log('✅ Footer module loaded');
        } catch (error) {
            console.error('❌ Failed to load footer:', error);
        }
    }
    /**
     * Set active navigation state based on current page
     */
    static setActiveNavigation() {
        // After sidebar injection
        setTimeout(() => {
            const links = document.querySelectorAll('#navMenu .nav-link');
            const sections = Array.from(links)
                .map(l => l.getAttribute('href'))
                .filter(h => h && h.startsWith('#'))
                .map(id => document.querySelector(id));

            function updateActive() {
                const scrollPos = window.scrollY + 120; // offset
                let current = null;
                sections.forEach(sec => {
                    if (!sec) return;
                    if (scrollPos >= sec.offsetTop) current = sec.id;
                });
                links.forEach(l => {
                    l.classList.remove('active');
                    const href = l.getAttribute('href');
                    if (href === `#${current}`) l.classList.add('active');
                });
            }
            updateActive();
            window.addEventListener('scroll', updateActive, { passive: true });
        }, 150);
    }

    /**
     * Ensure Utils/AppCore/AppEffects are available and initialized once
     */
    static async ensureAppInit() {
        const base = (location && location.protocol === 'file:') ? '' : '/';

        const load = (src) => new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) return resolve();
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(s);
        });

        // Make sure Utils is present for shared helpers
        if (!window.Utils) {
            try { await load(`${base}js/utils.js`); } catch (e) { console.warn('utils.js failed to load', e); }
        }

        // Load modular app scripts if missing
        const pending = [];
        if (!window.AppCore) pending.push(load(`${base}js/app-core.js`));
        if (!window.AppEffects) pending.push(load(`${base}js/effects.js`));
        if (pending.length) {
            try { await Promise.all(pending); } catch (e) { console.warn('app modules failed to load', e); }
        }

        // Initialize once
        try { if (window.AppCore && !window.__appCoreInitDone) window.AppCore.init(); } catch (e) { console.warn('AppCore.init failed', e); }
        try { if (window.AppEffects && !window.__appEffectsInitDone) window.AppEffects.init(); } catch (e) { console.warn('AppEffects.init failed', e); }
    }
}
/* Auth UI removed */
ModuleLoader.initAuthUI = function() { return; }

// Auto-load modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ModuleLoader.loadModules();
});
