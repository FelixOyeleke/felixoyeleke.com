/**
 * Main JS bootstrap - loads modular scripts and initializes them.
 */
(function bootstrap() {
  function addUAClasses() {
    try {
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      if (/CriOS/i.test(ua)) {
        document.documentElement.classList.add('ua-ios-chrome');
      } else if (/Safari/i.test(ua) && !/CriOS/i.test(ua)) {
        document.documentElement.classList.add('ua-ios-safari');
      }
    } catch (_) {}
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  function initScrollToTop() {
    const button = document.getElementById('scrollToTop');
    if (!button) return;

    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    };

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
  }

  async function init() {
    addUAClasses();

    await Promise.all([
      loadScript('/js/app-core.js'),
      loadScript('/js/effects.js')
    ]);

    try {
      if (window.AppCore && typeof window.AppCore.init === 'function') {
        window.AppCore.init();
      }
    } catch (err) {
      if (window.Utils) {
        try {
          Utils.initializeMobileMenu();
          Utils.initializeNewsletterForm();
          Utils.initializeSmoothScrolling();
          Utils.initializeFadeInAnimations();
          Utils.initializeStaggeredReveal();
          Utils.initializeParallaxHero();
          Utils.initializeScrollSpy();
          Utils.updateFooterTimestamp();
          Utils.protectImages();
          Utils.initializeServicesAutoScroll();
          if (Utils.initializeYouTubeLiveStats) Utils.initializeYouTubeLiveStats();
          if (Utils.initializeVideoLazyPlay) Utils.initializeVideoLazyPlay();
          if (Utils.fixServiceIcons) Utils.fixServiceIcons();
        } catch (_) {}
      }
      try {
        const projectVideo = document.querySelector('video.project-video');
        if (projectVideo) {
          projectVideo.removeAttribute('poster');
          projectVideo.muted = true;
          projectVideo.autoplay = true;
          projectVideo.play().catch(() => {});
        }
      } catch (_) {}
    }

    try {
      if (window.AppEffects && typeof window.AppEffects.init === 'function') {
        window.AppEffects.init();
      }
    } catch (_) {}

    initScrollToTop();
    console.log('[main] Felix Oyeleke website loaded successfully');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


