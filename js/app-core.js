// Core app initialization separated from main.js
// Uses shared Utils functions only (no DOM markup assumptions)
(function(){
  const AppCore = {
    init() {
      if (window.__appCoreInitDone) return;
      window.__appCoreInitDone = true;
      try {
        if (window.Utils) {
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
        }

        // Ensure no stale poster is showing on the project video
        try {
          const avVideo = document.querySelector('video.project-video');
          if (avVideo) {
            if (avVideo.hasAttribute('poster')) avVideo.removeAttribute('poster');
            avVideo.muted = true;
            avVideo.autoplay = true;
            avVideo.play().catch(() => {});
          }
        } catch (_) {}
      } catch (e) {
        console.warn('AppCore init encountered an issue:', e);
      }

      console.log('✅ AppCore initialized');
    }
  };

  window.AppCore = AppCore;
})();

