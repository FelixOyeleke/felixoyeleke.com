/**
 * Module Loader - loads header/footer snippets and shared scripts.
 */

try {
  if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations()
      .then((regs) => regs.forEach((reg) => reg.unregister()))
      .catch(() => {});
  }
} catch (_) {}

const ASSET_VERSION = '20251201-1';

// Clear any caches left by previous service workers or fetch caches
try {
  if (typeof caches !== 'undefined') {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).catch(() => {});
  }
} catch (_) {}

class ModuleLoader {

  /**
   * Fallback header markup used if the fetched header.html fragment
   * arrives truncated or incomplete (for example, when only WORKS/BLOG
   * show up and STORE/RESUME/ABOUT/CONTACT are missing).
   *
   * This guarantees a complete navigation even if caching or network
   * issues interfere with loading /components/header.html.
   */
  static getHeaderFallbackHTML() {
    return `<!-- Sidebar Header Component -->
<aside class="site-sidebar" role="banner">
  <div class="sidebar-inner">
    <div class="nav-brand">
      <a href="/" class="brand-link" aria-label="Felix Oyeleke - Home">
        <h1 class="brand-name">Felix Oyeleke</h1>
      </a>
      <button id="mobileMenuToggle"
              class="mobile-menu-toggle"
              type="button"
              aria-label="Toggle navigation"
              aria-controls="navMenu"
              aria-expanded="false">
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
      </button>
    </div>

    <nav class="nav-vertical is-open" id="navMenu" aria-label="Primary navigation">
      <div class="nav-group">
        <a href="/" class="nav-btn">
          <span class="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></g></svg>
          </span>
          <span class="nav-label">WORKS</span>
        </a>
        <a href="/blog.html" class="nav-btn">
          <span class="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><rect x="6" y="8" width="5" height="4" rx="1"/><path d="M13 8h5M13 12h5M6 16h12"/></g></svg>
          </span>
          <span class="nav-label">BLOG</span>
        </a>
        <a href="/store.html" class="nav-btn">
          <span class="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l-1 12H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></g></svg>
          </span>
          <span class="nav-label">STORE</span>
        </a>
      </div>

      <div class="nav-group">
        <a href="/documents/Felix Oyeleke - Property Management.pdf"
           class="nav-btn"
           target="_blank"
           rel="noopener noreferrer">
          <span class="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v6h6"/><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M8 13h8M8 17h8"/></g></svg>
          </span>
          <span class="nav-label">RESUME</span>
        </a>
      </div>

      <div class="nav-group">
        <a href="/about.html" class="nav-btn">
          <span class="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></g></svg>
          </span>
          <span class="nav-label">ABOUT</span>
        </a>
        <a href="/contact.html" class="nav-btn">
          <span class="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></g></svg>
          </span>
          <span class="nav-label">CONTACT</span>
        </a>
      </div>
    </nav>
  </div>
</aside>`;
  }
  static async loadModules() {
    await Promise.all([this.loadHeader(), this.loadFooter()]);
    try { this.ensureFonts(); } catch (_) {}

    this.setActiveNavigation();
    try { await this.ensureAppInit(); } catch (err) { console.warn('ensureAppInit failed', err); }
    if (typeof window !== 'undefined' && typeof window.NavigationManager === 'function') {
      new window.NavigationManager();
    }
    try { this.initCookieConsent(); } catch (_) {}
  }

  static async loadHeader() {
    try {
      const base = (location && location.protocol === 'file:') ? '' : '/';
      const url = `${base}components/header.html?v=${ASSET_VERSION}`;
      const response = await fetch(url, { cache: 'no-store' });
      const headerHTML = await response.text();

      let headerContainer = document.getElementById('header-placeholder');
      if (!headerContainer) {
        headerContainer = document.createElement('div');
        headerContainer.id = 'header-placeholder';
        document.body.insertBefore(headerContainer, document.body.firstChild);
      }

      // First, try to use the server-provided header fragment.
      headerContainer.innerHTML = headerHTML;

      // Validate header completeness. If we don't see all 6 labels,
      // fall back to a known-good inline header so WORKS/BLOG/STORE/
      // RESUME/ABOUT/CONTACT always show up.
      try {
        const expectedCount = 6;
        const labels = headerContainer.querySelectorAll('#navMenu a.nav-btn .nav-label');
        if (!labels || labels.length < expectedCount) {
          console.warn('[modules] Header fragment incomplete (labels:', labels ? labels.length : 0, '), using inline fallback header');
          headerContainer.innerHTML = ModuleLoader.getHeaderFallbackHTML();
        }
      } catch (e) {
        console.warn('[modules] Header completeness check failed, using inline fallback header:', e);
        headerContainer.innerHTML = ModuleLoader.getHeaderFallbackHTML();
      }


      if (location && location.protocol === 'file:') {
        const map = {
          '/': 'index.html',
          '/index.html': 'index.html',
          '/about.html': 'about.html',
          '/contact.html': 'contact.html',
          '/blog.html': 'blog.html',
          '/store.html': 'store.html',
          '/privacy.html': 'privacy.html',
          '/cookies.html': 'cookies.html',
          '/documents/Felix Oyeleke - Property Management.pdf': 'documents/Felix Oyeleke - Property Management.pdf'
        };
        headerContainer.querySelectorAll('a[href^="/"]').forEach((anchor) => {
          const href = anchor.getAttribute('href');
          anchor.setAttribute('href', map[href] || href.replace(/^\//, ''));
        });
      }

      this.bindMobileToggle();
      this.highlightActiveNav();
      console.log('[modules] Header module loaded');
    } catch (error) {
      console.error('[modules] Failed to load header:', error);
    }
  }

  static bindMobileToggle() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

    const setState = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    // Keep the menu open by default on small screens so all links are visible.
    setState(isMobile());

    // Sync menu visibility if the viewport is resized.
    window.addEventListener('resize', () => setState(isMobile()), { passive: true });

    toggle.addEventListener('click', () => setState(!menu.classList.contains('is-open')));
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 900px)').matches) setState(false);
      });
    });
  }

  static highlightActiveNav() {
    try {
      const links = document.querySelectorAll('#navMenu a.nav-btn[href]');
      if (!links || !links.length) return;
      const current = location.pathname.replace(/\/index\.html$/, '/');
      links.forEach((a) => {
        const href = a.getAttribute('href') || '';
        const normalized = href.replace(/\/index\.html$/, '/');
        const active = normalized === current;
        a.classList.toggle('active', active);
        if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
    } catch (_) {}
  }


  static async loadFooter() {
    try {
      const base = (location && location.protocol === 'file:') ? '' : '/';
      const url = `${base}components/footer.html?v=${ASSET_VERSION}`;
      const response = await fetch(url, { cache: 'no-store' });
      const footerHTML = await response.text();

      const main = document.querySelector('main.main-content');
      let footerContainer = document.getElementById('footer-placeholder');

      if (main) {
        if (footerContainer && !main.contains(footerContainer)) main.appendChild(footerContainer);
        if (!footerContainer || !main.contains(footerContainer)) {
          footerContainer = document.createElement('div');
          footerContainer.id = 'footer-placeholder';
          main.appendChild(footerContainer);
        }
      } else if (!footerContainer) {
        footerContainer = document.createElement('div');
        footerContainer.id = 'footer-placeholder';
        document.body.appendChild(footerContainer);
      }

      footerContainer.innerHTML = footerHTML;

      if (location && location.protocol === 'file:') {
        const map = {
          '/': 'index.html',
          '/index.html': 'index.html',
          '/about.html': 'about.html',
          '/contact.html': 'contact.html',
          '/blog.html': 'blog.html',
          '/store.html': 'store.html',
          '/privacy.html': 'privacy.html',
          '/cookies.html': 'cookies.html'
        };
        footerContainer.querySelectorAll('a[href^="/"]').forEach((anchor) => {
          const href = anchor.getAttribute('href');
          anchor.setAttribute('href', map[href] || href.replace(/^\//, ''));
        });
      }

      console.log('[modules] Footer module loaded');
      try { this.initScrollToTop(); } catch (_) {}
    } catch (error) {
      console.error('[modules] Failed to load footer:', error);
    }

  }

  static ensureFonts() {
    try {
      const head = document.head;
      if (!head) return;
      if (head.querySelector('link[href*="fonts.googleapis.com"]')) return;

      const pre1 = document.createElement('link');
      pre1.rel = 'preconnect';
      pre1.href = 'https://fonts.googleapis.com';
      head.appendChild(pre1);

      const pre2 = document.createElement('link');
      pre2.rel = 'preconnect';
      pre2.href = 'https://fonts.gstatic.com';
      pre2.crossOrigin = 'anonymous';
      head.appendChild(pre2);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;1,400;1,600&family=JetBrains+Mono:wght@400;500&family=Oswald:wght@500;600&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap';
      head.appendChild(link);
    } catch (_) {}
  }



  static setActiveNavigation() {
    setTimeout(() => {
      const links = document.querySelectorAll('#navMenu .nav-link');
      const sections = Array.from(links)
        .map((link) => link.getAttribute('href'))
        .filter((href) => href && href.startsWith('#'))
        .map((id) => document.querySelector(id));

      function updateActive() {
        const scrollPos = window.scrollY + 120;
        let current = null;
        sections.forEach((section) => {
          if (!section) return;
          if (scrollPos >= section.offsetTop) current = section.id;
        });
        links.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
      }

      updateActive();
      window.addEventListener('scroll', updateActive, { passive: true });
    }, 150);
  }
  static initScrollToTop() {
    try {
      const button = document.getElementById('scrollToTop');
      if (!button) return;
      if (button.dataset.inited === '1') return;
      button.dataset.inited = '1';

      const toggleVisibility = () => {
        if (window.scrollY > 400) {
          button.classList.add('visible');
        } else {
          button.classList.remove('visible');
        }
      };

      button.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.addEventListener('scroll', toggleVisibility, { passive: true });
      toggleVisibility();
    } catch (_) {}
  }


  static async ensureAppInit() {
    const base = (location && location.protocol === 'file:') ? '' : '/';

    const load = (src) => new Promise((resolve, reject) => {
      const withVersion = (s) => s + (s.includes('?') ? `&v=${ASSET_VERSION}` : `?v=${ASSET_VERSION}`);
      const targetSrc = withVersion(src);
      if (document.querySelector(`script[src="${src}"]`) || document.querySelector(`script[src="${targetSrc}"]`)) return resolve();
      const script = document.createElement('script');
      script.src = targetSrc;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });

    if (!window.Utils) {
      try { await load(`${base}js/utils.js`); } catch (err) { console.warn('utils.js failed to load', err); }
    }

    const pending = [];
    if (!window.AppCore) pending.push(load(`${base}js/app-core.js`));
    if (!window.AppEffects) pending.push(load(`${base}js/effects.js`));
    if (pending.length) {
      try { await Promise.all(pending); } catch (err) { console.warn('app modules failed to load', err); }
    }

    try {
      if (window.AppCore && !window.__appCoreInitDone) window.AppCore.init();
    } catch (err) {
      console.warn('AppCore.init failed', err);
    }
    try {
      if (window.AppEffects && !window.__appEffectsInitDone) window.AppEffects.init();
    } catch (err) {
      console.warn('AppEffects.init failed', err);
    }

  }

  static initCookieConsent() {
    try {
      const KEY = 'cookieConsent';
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      if (window.localStorage && window.localStorage.getItem(KEY)) return;

      const banner = document.createElement('div');
      banner.className = 'cookie-consent';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-live', 'polite');
      banner.innerHTML = `
        <p>
          We use only essential cookies for reliability. See our
          <a href="/privacy.html">Privacy Policy</a> and <a href="/cookies.html">Cookie Policy</a>.
        </p>
        <div class="cookie-actions">
          <button type="button" class="cookie-btn" id="cookieDismiss">Dismiss</button>
          <button type="button" class="cookie-btn primary" id="cookieAccept">Accept</button>
        </div>
      `;
      document.body.appendChild(banner);

      const accept = banner.querySelector('#cookieAccept');
      const dismiss = banner.querySelector('#cookieDismiss');
      const close = (value) => {
        try {
          if (window.localStorage) window.localStorage.setItem(KEY, value);
          document.cookie = `consent=${value}; Max-Age=31536000; Path=/`;
        } catch (_) {}
        if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
      };
      if (accept) accept.addEventListener('click', () => close('accepted'));
      if (dismiss) dismiss.addEventListener('click', () => close('dismissed'));
    } catch (e) {
      console.warn('cookie consent init failed', e);
    }
  }

}

ModuleLoader.initAuthUI = function initAuthUI() { /* auth removed */ };

document.addEventListener('DOMContentLoaded', () => {
  ModuleLoader.loadModules();
});
