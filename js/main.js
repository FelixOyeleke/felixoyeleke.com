/**
 * Main JS bootstrap — now loads modular scripts and initializes them
 */
(function(){
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
      const s = document.createElement('script');
      s.src = src;
      s.defer = true;
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false); // resolve to continue even if a script fails
      document.head.appendChild(s);
    });
  }

  async function init() {
    addUAClasses();

    // Load modular scripts in parallel; keep HTML unchanged
    await Promise.all([
      loadScript('/js/app-core.js'),
      loadScript('/js/effects.js')
    ]);

    // Initialize modules if available
    try { if (window.AppCore && typeof AppCore.init === 'function') AppCore.init(); } catch (e) {
      // Minimal fallback using Utils (keeps previous behavior intact)
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
      // Ensure project video isn't stuck on poster
      try {
        const avVideo = document.querySelector('video.project-video');
        if (avVideo) {
          if (avVideo.hasAttribute('poster')) avVideo.removeAttribute('poster');
          avVideo.muted = true; avVideo.autoplay = true; avVideo.play().catch(() => {});
        }
      } catch (_) {}
    }

    try { if (window.AppEffects && typeof AppEffects.init === 'function') AppEffects.init(); } catch (_) {}

    console.log('✨ Felix Oyeleke website loaded successfully!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
