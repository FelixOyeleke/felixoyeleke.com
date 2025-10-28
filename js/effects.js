// UI effects and YouTube section enhancements extracted from main.js
(function(){
  const AppEffects = {
    init() {
      if (window.__appEffectsInitDone) return;
      window.__appEffectsInitDone = true;
      try {
        this.initCounterAnimations();
        this.initTopicTagAnimations();
        this.initButtonEnhancements();
        this.initParallaxEffect();
        this.initTypingEffect();

        // Fallback: Start typing after 3 seconds if not already started
        setTimeout(() => {
          const title = document.querySelector('.youtube-hero h3');
          if (title && !title.classList.contains('typed')) {
            title.classList.add('typed');
            this.typeTitle(title);
          }
        }, 3000);
      } catch (e) {
        console.warn('AppEffects init encountered an issue:', e);
      }
      console.log('\u2728 AppEffects initialized');
    },

    initCounterAnimations() {
      const metrics = document.querySelectorAll('.metric-value');
      if (!metrics.length) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            this.animateCounter(entry.target);
          }
        });
      }, { threshold: 0.5 });
      metrics.forEach(metric => observer.observe(metric));
    },

    animateCounter(element) {
      const text = element.textContent;
      if (text.includes('K+')) {
        this.countUp(element, 0, 10, 1500, 'K+');
      } else if (text.includes('+')) {
        this.countUp(element, 0, 50, 1200, '+');
      } else if (text === 'Weekly') {
        this.typeText(element, 'Weekly', 100);
      }
    },

    countUp(element, start, end, duration, suffix) {
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        element.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    },

    typeText(element, text, speed) {
      element.textContent = '';
      let i = 0;
      const type = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      };
      type();
    },

    initTopicTagAnimations() {
      const tags = document.querySelectorAll('.topic-tag');
      if (!tags.length) return;
      tags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => {
          tag.style.opacity = '1';
          tag.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
        tag.addEventListener('click', (e) => this.createRipple(e, tag));
      });
    },

    createRipple(event, element) {
      const ripple = document.createElement('span');
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 0;
      `;
      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    },

    initButtonEnhancements() {
      const buttons = document.querySelectorAll('.youtube-button');
      if (!buttons.length) return;
      buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-2px)`;
        });
        button.addEventListener('mouseleave', () => { button.style.transform = ''; });
        button.addEventListener('mousedown', () => { button.style.transform = 'scale(0.95)'; });
        button.addEventListener('mouseup', () => { button.style.transform = ''; });
      });
    },

    initParallaxEffect() {
      const youtubeSection = document.getElementById('youtube');
      if (!youtubeSection) return;
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rect = youtubeSection.getBoundingClientRect();
        const speed = scrolled * 0.5;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const badge = youtubeSection.querySelector('.youtube-badge');
          if (badge) badge.style.transform = `translateY(${speed * 0.1}px)`;
        }
      }, { passive: true });
    },

    initTypingEffect() {
      const startTyping = () => {
        const title = document.querySelector('.youtube-hero h3');
        if (!title) return;
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
              entry.target.classList.add('typed');
              this.typeTitle(entry.target);
            }
          });
        }, { threshold: 0.3 });
        observer.observe(title);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startTyping);
      } else {
        setTimeout(startTyping, 100);
      }
    },

    typeTitle(element) {
      const text = 'Learn. Build. Create.';
      element.textContent = '';
      element.classList.add('typing');
      let i = 0;
      const type = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, 120);
        } else {
          setTimeout(() => { element.classList.remove('typing'); }, 1500);
        }
      };
      type();
    }
  };

  window.AppEffects = AppEffects;
})();

