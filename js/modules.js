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

class ModuleLoader {
  static async loadModules() {
    await Promise.all([this.loadHeader(), this.loadFooter()]);
    this.setActiveNavigation();
    try { await this.ensureAppInit(); } catch (err) { console.warn('ensureAppInit failed', err); }
    if (typeof window !== 'undefined' && typeof window.NavigationManager === 'function') {
      new window.NavigationManager();
    }
  }

  static async loadHeader() {
    try {
      const base = (location && location.protocol === 'file:') ? '' : '/';
      const response = await fetch(`${base}components/header.html`);
      const headerHTML = await response.text();

      let headerContainer = document.getElementById('header-placeholder');
      if (!headerContainer) {
        headerContainer = document.createElement('div');
        headerContainer.id = 'header-placeholder';
        document.body.insertBefore(headerContainer, document.body.firstChild);
      }
      headerContainer.innerHTML = headerHTML;

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
        headerContainer.querySelectorAll('a[href^="/"]').forEach((anchor) => {
          const href = anchor.getAttribute('href');
          anchor.setAttribute('href', map[href] || href.replace(/^\//, ''));
        });
      }

      this.bindMobileToggle();
      console.log('[modules] Header module loaded');
    } catch (error) {
      console.error('[modules] Failed to load header:', error);
    }
  }

  static bindMobileToggle() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    const setState = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    setState(false);
    toggle.addEventListener('click', () => setState(!menu.classList.contains('is-open')));
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 900px)').matches) setState(false);
      });
    });
  }

  static async loadFooter() {
    try {
      const base = (location && location.protocol === 'file:') ? '' : '/';
      const response = await fetch(`${base}components/footer.html`);
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
          '/store.html': 'store.html'
        };
        footerContainer.querySelectorAll('a[href^="/"]').forEach((anchor) => {
          const href = anchor.getAttribute('href');
          anchor.setAttribute('href', map[href] || href.replace(/^\//, ''));
        });
      }

      console.log('[modules] Footer module loaded');
    } catch (error) {
      console.error('[modules] Failed to load footer:', error);
    }
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

  static async ensureAppInit() {
    const base = (location && location.protocol === 'file:') ? '' : '/';

    const load = (src) => new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const script = document.createElement('script');
      script.src = src;
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
}

ModuleLoader.initAuthUI = function initAuthUI() { /* auth removed */ };

document.addEventListener('DOMContentLoaded', () => {
  ModuleLoader.loadModules();
});

