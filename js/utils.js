/**
 * Shared Utility Functions
 * Common functions used across multiple components to eliminate redundancy
 */

class Utils {
    /**
     * Update footer timestamp with current date
     */
    static updateFooterTimestamp() {
        const lastUpdatedElement = document.getElementById('lastUpdated');
        if (lastUpdatedElement) {
            const now = new Date();
            lastUpdatedElement.textContent = now.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }

    /**
     * Initialize mobile menu functionality
     * @param {string} toggleId - ID of the mobile menu toggle button
     * @param {string} menuId - ID of the mobile menu
     */
    static initializeMobileMenu(toggleId = 'mobileMenuToggle', menuId = 'navMenu') {
        const mobileMenuToggle = document.getElementById(toggleId);
        const navMenu = document.getElementById(menuId);

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                const isOpen = navMenu.classList.contains('active');

                if (isOpen) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                } else {
                    navMenu.classList.add('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'true');
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

	/**
	 * Initialize newsletter form functionality
	 * @param {string} linkSelector - Selector for newsletter link
	 * @param {string} formId - ID of the newsletter form
	 */
    static initializeNewsletterForm(linkSelector = '.newsletter-link', formId = 'newsletterForm') {
        const newsletterLink = document.querySelector(linkSelector);
        const newsletterForm = document.getElementById(formId);

        if (newsletterLink && newsletterForm) {
            newsletterLink.addEventListener('click', (e) => {
                e.preventDefault();
                newsletterForm.classList.toggle('hidden');
            });

            // Handle form submission
            const form = newsletterForm.querySelector('form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = form.querySelector('input[type="email"]').value;

                    // Placeholder for newsletter signup
                    alert(`Thanks for subscribing with email: ${email}\nNewsletter integration coming soon!`);

                    // Reset form
                    form.reset();
                    newsletterForm.classList.add('hidden');
                });
            }
        }
    }

    /**
     * Initialize smooth scrolling for anchor links
     * @param {string} headerSelector - Selector for the header element
     */
    static initializeSmoothScrolling(headerSelector = '.site-header') {
        const header = document.querySelector(headerSelector);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);

                if (target) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Initialize fade-in animations for elements
     * @param {string} selector - Selector for elements to animate
     */
    static initializeFadeInAnimations(selector = '.fade-in') {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    /**
     * Show notification message
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, error, info)
     */
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#30D158' : type === 'error' ? '#FF3B30' : '#007AFF'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, "Segoe UI", Roboto, Arial, sans-serif;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Debounce function to limit function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function to limit function calls
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Aggressively fix ALL hardcoded font sizes and ensure correct font family
     */
    static fixFontSizes() {
        // Get the correct font family from CSS variables
        const correctFontFamily = getComputedStyle(document.documentElement).getPropertyValue('--font-family').trim();

        // Remove ALL hardcoded font-size styles and fix font family
        document.querySelectorAll('*').forEach(element => {
            if (element.style.fontSize && !element.style.fontSize.includes('var(--')) {
                element.style.removeProperty('font-size');
            }
            // Force correct font family
            if (correctFontFamily) {
                element.style.fontFamily = correctFontFamily;
            }
        });
        // Ensure all headings use consistent font sizes
        document.querySelectorAll('h1').forEach(h1 => {
            if (!h1.style.fontSize && !h1.classList.contains('text-hero')) {
                h1.style.fontSize = 'var(--font-size-h1)';
                h1.style.fontWeight = 'var(--font-weight-semibold)';
                h1.style.lineHeight = '1.3';
                h1.style.letterSpacing = '-0.3px';
            }
        });

        document.querySelectorAll('h2').forEach(h2 => {
            if (!h2.style.fontSize) {
                h2.style.fontSize = 'var(--font-size-h2)';
                h2.style.fontWeight = 'var(--font-weight-semibold)';
                h2.style.lineHeight = '1.3';
                h2.style.letterSpacing = '-0.2px';
            }
        });

        document.querySelectorAll('h3').forEach(h3 => {
            if (!h3.style.fontSize) {
                h3.style.fontSize = 'var(--font-size-h3)';
                h3.style.fontWeight = 'var(--font-weight-semibold)';
                h3.style.lineHeight = '1.4';
                h3.style.letterSpacing = '-0.1px';
            }
        });

        document.querySelectorAll('h4').forEach(h4 => {
            if (!h4.style.fontSize) {
                h4.style.fontSize = 'var(--font-size-h4)';
                h4.style.fontWeight = 'var(--font-weight-semibold)';
                h4.style.lineHeight = '1.4';
            }
        });

        document.querySelectorAll('h5').forEach(h5 => {
            if (!h5.style.fontSize) {
                h5.style.fontSize = 'var(--font-size-h5)';
                h5.style.fontWeight = 'var(--font-weight-medium)';
                h5.style.lineHeight = '1.4';
            }
        });

        document.querySelectorAll('h6').forEach(h6 => {
            if (!h6.style.fontSize) {
                h6.style.fontSize = 'var(--font-size-small)';
                h6.style.fontWeight = 'var(--font-weight-medium)';
                h6.style.lineHeight = '1.4';
                h6.style.textTransform = 'uppercase';
                h6.style.letterSpacing = '0.05em';
            }
        });

        // Ensure body text uses consistent sizing and normal weight
        document.querySelectorAll('p, span, div, li, td, th').forEach(element => {
            if (!element.style.fontSize && !element.classList.contains('text-small') && !element.classList.contains('text-caption')) {
                element.style.fontSize = 'var(--font-size-body)';
                element.style.fontWeight = 'var(--font-weight-normal)';
                element.style.lineHeight = '1.5';
            }
        });

        // Fix button font sizes
        document.querySelectorAll('.btn, .button-primary, .button-secondary').forEach(btn => {
            if (!btn.style.fontSize) {
                btn.style.fontSize = 'var(--font-size-body)';
                btn.style.fontWeight = 'var(--font-weight-medium)';
            }
        });

        // Fix small text elements
        document.querySelectorAll('.text-small, .small, small').forEach(small => {
            if (!small.style.fontSize) {
                small.style.fontSize = 'var(--font-size-small)';
                small.style.lineHeight = '1.4';
            }
        });

        // Fix caption text elements
        document.querySelectorAll('.text-caption, .caption').forEach(caption => {
            if (!caption.style.fontSize) {
                caption.style.fontSize = 'var(--font-size-caption)';
                caption.style.lineHeight = '1.3';
            }
        });

        // Fix section headings to be consistent and sleek
        document.querySelectorAll('.section-heading, h6.section-heading').forEach(heading => {
            heading.style.fontSize = '14px';
            heading.style.fontWeight = '600';
            heading.style.color = 'var(--text-secondary)';
            heading.style.textTransform = 'uppercase';
            heading.style.letterSpacing = '0.1em';
            heading.style.lineHeight = '1.2';
            heading.style.fontFamily = '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, "Segoe UI", Roboto, Arial, sans-serif';
        });

        console.log('✅ Font sizes and section headings normalized across the website');
    }

    /**
     * Protect all images from downloading and right-click saving
     */
    static protectImages() {
        // Disable right-click context menu on images
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });

        // Disable drag and drop for all images
        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });

        // Disable image selection
        document.addEventListener('selectstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });

        // Apply protection to all existing images
        document.querySelectorAll('img').forEach(img => {
            img.draggable = false;
            img.ondragstart = () => false;
            img.onselectstart = () => false;
            img.oncontextmenu = () => false;

            // Disable keyboard shortcuts on images
            img.addEventListener('keydown', (e) => {
                // Disable Ctrl+S, Ctrl+A, F12, etc.
                if (e.ctrlKey && (e.key === 's' || e.key === 'a')) {
                    e.preventDefault();
                    return false;
                }
                if (e.key === 'F12') {
                    e.preventDefault();
                    return false;
                }
            });
        });

        // Disable common keyboard shortcuts for saving images
        document.addEventListener('keydown', (e) => {
            // Disable Ctrl+S (Save), Ctrl+Shift+S (Save As), Ctrl+A (Select All)
            if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
                if (document.activeElement && document.activeElement.tagName === 'IMG') {
                    e.preventDefault();
                    return false;
                }
            }

            // Disable F12 (Developer Tools) when focused on images
            if (e.key === 'F12' && document.activeElement && document.activeElement.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }

            // Disable Ctrl+Shift+I (Developer Tools) when focused on images
            if (e.ctrlKey && e.shiftKey && e.key === 'I' && document.activeElement && document.activeElement.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });

        console.log('🔒 Image protection enabled');
    }

    /**
     * Initialize auto-scrolling for services section
     */
    static initializeServicesAutoScroll() {
        const scrollContainer = document.getElementById('servicesAutoScroll');

        if (!scrollContainer) return;

        // Clone all service cards to create infinite scroll effect
        const originalCards = scrollContainer.children;
        const cardCount = originalCards.length;

        // Clone each card and append to create seamless loop
        for (let i = 0; i < cardCount; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); // Hide from screen readers
            scrollContainer.appendChild(clone);
        }

        // Slow down animation on hover/focus for better UX
        const originalDuration = getComputedStyle(scrollContainer).animationDuration;

        const setDuration = (seconds) => {
            scrollContainer.style.animationDuration = `${seconds}s`;
        };

        scrollContainer.addEventListener('mouseenter', () => {
            setDuration(90);
        });

        scrollContainer.addEventListener('mouseleave', () => {
            scrollContainer.style.animationDuration = originalDuration;
        });

        // Slow down on focus for accessibility
        scrollContainer.addEventListener('focusin', () => {
            setDuration(90);
        });

        scrollContainer.addEventListener('focusout', () => {
            scrollContainer.style.animationDuration = originalDuration;
        });

        console.log('🔄 Services auto-scroll initialized with infinite loop');
    }

    /**
     * Initialize YouTube live stats (subscribers, videos)
     * Uses YouTube Data API v3: channels and search endpoints
     * Requires window.YouTubeConfig with apiKey and channelId
     */
    static async initializeYouTubeLiveStats() {
        try {
            if (!window.YouTubeConfig || !YouTubeConfig.apiKey) {
                console.warn('YouTubeConfig missing. Skipping live stats.');
                return;
            }
            const apiKey = YouTubeConfig.apiKey;
            const channelId = YouTubeConfig.channelId;

            const subsEl = document.getElementById('ytSubscribers');
            const videosEl = document.getElementById('ytVideos');
            if (!subsEl && !videosEl) return; // nothing to update

            // 1) Fetch channel statistics (subscribers, videoCount)
            const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${encodeURIComponent(channelId)}&key=${encodeURIComponent(apiKey)}`;
            const channelRes = await fetch(channelUrl);
            if (!channelRes.ok) throw new Error(`YouTube API (channels) failed: ${channelRes.status}`);
            const channelData = await channelRes.json();
            const stats = channelData.items && channelData.items[0] ? channelData.items[0].statistics : null;

            // 2) Populate subscribers and video count
            if (stats) {
                if (subsEl && stats.subscriberCount !== undefined) {
                    subsEl.textContent = Utils.formatCompactNumber(stats.subscriberCount);
                }
                if (videosEl && stats.videoCount !== undefined) {
                    videosEl.textContent = Utils.formatCompactNumber(stats.videoCount);
                }
            }
            // Fallback: if no stats returned, try resolving channel ID from @handle
            if ((!stats || (!stats.subscriberCount && !stats.videoCount)) && YouTubeConfig.usernameHandle) {
                const handle = YouTubeConfig.usernameHandle.replace(/^@/, '');
                const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&maxResults=1&key=${encodeURIComponent(apiKey)}`;
                const searchRes = await fetch(searchUrl);
                if (searchRes.ok) {
                    const searchData = await searchRes.json();
                    const found = searchData.items && searchData.items[0];
                    const resolvedId = found?.snippet?.channelId || found?.id?.channelId;
                    if (resolvedId) {
                        const channelUrl2 = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${encodeURIComponent(resolvedId)}&key=${encodeURIComponent(apiKey)}`;
                        const channelRes2 = await fetch(channelUrl2);
                        if (channelRes2.ok) {
                            const data2 = await channelRes2.json();
                            const stats2 = data2.items && data2.items[0] ? data2.items[0].statistics : null;
                            if (stats2) {
                                if (subsEl && stats2.subscriberCount !== undefined) subsEl.textContent = Utils.formatCompactNumber(stats2.subscriberCount);
                                if (videosEl && stats2.videoCount !== undefined) videosEl.textContent = Utils.formatCompactNumber(stats2.videoCount);
                            }
                        }
                    }
                }
            }
        } catch (err) {
            console.error('YouTube live stats error:', err);
        }
    }

    /**
     * Helper: Compact number formatting (e.g., 12500 -> 12.5K)
     */
    static formatCompactNumber(value) {
        const n = Number(value);
        if (!isFinite(n)) return '—';
        return new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(n);
    }

    /**
     * (Legacy) Service icon fixer – retained if any service sections remain elsewhere
     */
    static fixServiceIcons() {
        const iconMap = {
            'Real Estate Photography': '🏠',
            'Agricultural Monitoring': '🚜',
            'Drone Inspections': '🔍',
            'Landscape Photography': '🌲',
            'Construction Monitoring': '🏗️',
            'AI and Data Processing': '🤖'
        };

        document.querySelectorAll('.service-item').forEach(item => {
            const title = item.querySelector('h4');
            const icon = item.querySelector('.service-icon');
            if (title && icon && iconMap[title.textContent]) {
                icon.textContent = iconMap[title.textContent];
            }
        });
    }

    /**
     * Load and populate social meta tags
     * @param {Object} config - Configuration object with title, description, url
     */
    static async loadSocialMeta(config) {
        try {
            const response = await fetch('components/social-meta.html');
            if (!response.ok) return;

            let html = await response.text();

            // Replace placeholders
            html = html.replace(/\{\{TITLE\}\}/g, config.title || 'Felix Oyeleke - Developer and Creator');
            html = html.replace(/\{\{DESCRIPTION\}\}/g, config.description || 'Building modern web applications and sharing knowledge with the community.');
            html = html.replace(/\{\{URL\}\}/g, config.url || window.location.href);

            // Create temporary container and extract meta tags
            const temp = document.createElement('div');
            temp.innerHTML = html;

            // Add meta tags to head
            const metaTags = temp.querySelectorAll('meta');
            metaTags.forEach(tag => {
                const existing = document.querySelector(`meta[property="${tag.getAttribute('property')}"]`);
                if (existing) {
                    existing.setAttribute('content', tag.getAttribute('content'));
                } else {
                    document.head.appendChild(tag.cloneNode(true));
                }
            });
        } catch (error) {
            console.warn('Failed to load social meta tags:', error);
        }
    }
    /**
     * Scrollspy: highlights nav links based on current section in view
     */
    static initializeScrollSpy(navLinkSelector = '.nav-link', sectionSelector = 'section[id]') {
        const links = Array.from(document.querySelectorAll(navLinkSelector));
        if (!links.length) return;
        const sections = Array.from(document.querySelectorAll(sectionSelector));
        if (!sections.length) return;
        const header = document.querySelector('.site-header');
        const getOffset = () => (header ? header.offsetHeight + 16 : 16);
        const onScroll = () => {
            const scrollPos = window.scrollY + getOffset();
            let currentId = null;
            for (const sec of sections) {
                if (sec.offsetTop <= scrollPos) currentId = sec.id;
            }
            links.forEach(a => {
                const href = a.getAttribute('href') || '';
                const id = href.startsWith('#') ? href.slice(1) : null;
                if (id && id === currentId) a.classList.add('active'); else a.classList.remove('active');
            });
        };
        onScroll();
        window.addEventListener('scroll', Utils.throttle(onScroll, 100));
    }

    /**
     * Staggered reveal for children inside each section for a resume-like flow
     */
    static initializeStaggeredReveal(sectionSelector = '.content-section', childSelector = '> *') {
        const sections = document.querySelectorAll(sectionSelector);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const children = entry.target.querySelectorAll(childSelector);
                children.forEach((el, i) => {
                    el.style.transition = 'opacity 600ms ease, transform 600ms ease';
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(12px)';
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, i * 80);
                    });
                });
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.2 });
        sections.forEach(sec => observer.observe(sec));
    }

    /**
     * Subtle parallax for hero/profile section
     */
    static initializeParallaxHero(heroSelector = '.profile-section') {
        const hero = document.querySelector(heroSelector);
        if (!hero) return;
        const el = hero.querySelector('.profile-image img') || hero;
        const onScroll = () => {
            const rect = hero.getBoundingClientRect();
            const progress = Math.min(1, Math.max(0, 1 - (rect.top / (window.innerHeight || 1))));
            const translate = Math.round((1 - progress) * 12);
            el.style.transform = `translateY(${translate}px)`;
            el.style.transition = 'transform 120ms ease-out';
        };
        window.addEventListener('scroll', Utils.throttle(onScroll, 50));
        onScroll();
    }

    /**
     * Tilt-on-hover for cards
     */
    static initializeTiltOnHover(selector = '.card, .featured-card, .blog-card, .youtube-card') {
        const cards = document.querySelectorAll(selector);
        cards.forEach(card => {
            const onMove = (e) => {
                const r = card.getBoundingClientRect();
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                const dx = (e.clientX - cx) / (r.width / 2);
                const dy = (e.clientY - cy) / (r.height / 2);
                const rotateX = Math.max(-6, Math.min(6, -dy * 6));
                const rotateY = Math.max(-6, Math.min(6, dx * 6));
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                card.style.transition = 'transform 80ms ease-out';
            };
            const onLeave = () => {
                card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
                card.style.transition = 'transform 200ms ease-out';
            };
            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
        });
    }


// Export for use in other modules
    /**
     * Play/pause videos only when in view to save CPU/bandwidth
     */
    static initializeVideoLazyPlay(selector = 'video.project-video', threshold = 0.5) {
        try {
            const videos = document.querySelectorAll(selector);
            if (!videos.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const video = entry.target;
                    if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: [0, threshold, 1] });

            videos.forEach(v => {
                v.setAttribute('playsinline', '');
                v.muted = true; // ensure programmatic play works on mobile
                observer.observe(v);
            });
        } catch (e) {
            console.warn('Video lazy play init failed:', e);
        }
    }

}

window.Utils = Utils;
