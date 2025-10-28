// PWA Service Worker Registration and Management
// Progressive Web App functionality for Felix Oyeleke's website

class PWAManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.deferredPrompt = null;
    this.installButton = null;
    
    this.init();
  }

  async init() {
    // Register service worker
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        
        console.log('✅ Service Worker registered:', registration.scope);
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
        
      } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
      }
    }

    // Setup PWA install functionality
    this.setupInstallPrompt();
    
    // Setup offline/online detection
    this.setupNetworkDetection();
    
    // Setup background sync
    this.setupBackgroundSync();
  }

  setupInstallPrompt() {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('📱 PWA install prompt available');
      
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Save the event for later use
      this.deferredPrompt = e;
      
      // Show custom install button
      this.showInstallButton();
    });

    // Listen for successful installation
    window.addEventListener('appinstalled', (e) => {
      console.log('✅ PWA installed successfully');
      this.hideInstallButton();
      
      // Track installation
      if (window.trackEvent) {
        window.trackEvent('pwa_install', {
          'installation_method': 'prompt',
          'content_category': 'pwa'
        });
      }
    });
  }

  showInstallButton() {
    // Create install button if it doesn't exist
    if (!this.installButton) {
      this.installButton = document.createElement('button');
      this.installButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Install App
      `;
      this.installButton.className = 'pwa-install-btn';
      this.installButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #D4AF37;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 1000;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(100px);
      `;
      
      // Add click handler
      this.installButton.addEventListener('click', () => this.promptInstall());
      
      // Add to page
      document.body.appendChild(this.installButton);
    }
    
    // Animate in
    setTimeout(() => {
      this.installButton.style.opacity = '1';
      this.installButton.style.transform = 'translateY(0)';
    }, 100);
  }

  hideInstallButton() {
    if (this.installButton) {
      this.installButton.style.opacity = '0';
      this.installButton.style.transform = 'translateY(100px)';
      
      setTimeout(() => {
        if (this.installButton && this.installButton.parentNode) {
          this.installButton.parentNode.removeChild(this.installButton);
          this.installButton = null;
        }
      }, 300);
    }
  }

  async promptInstall() {
    if (!this.deferredPrompt) return;

    // Show the install prompt
    this.deferredPrompt.prompt();
    
    // Wait for the user to respond
    const { outcome } = await this.deferredPrompt.userChoice;
    
    console.log(`👤 User choice: ${outcome}`);
    
    // Track user choice
    if (window.trackEvent) {
      window.trackEvent('pwa_install_prompt', {
        'user_choice': outcome,
        'content_category': 'pwa'
      });
    }
    
    // Clear the deferred prompt
    this.deferredPrompt = null;
    
    // Hide install button
    this.hideInstallButton();
  }

  setupNetworkDetection() {
    // Update online status
    const updateOnlineStatus = () => {
      this.isOnline = navigator.onLine;
      this.showNetworkStatus();
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }

  showNetworkStatus() {
    // Remove existing notification
    const existing = document.querySelector('.network-status');
    if (existing) existing.remove();

    if (!this.isOnline) {
      const notification = document.createElement('div');
      notification.className = 'network-status offline';
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #f44336;
          color: white;
          text-align: center;
          padding: 12px;
          font-size: 14px;
          z-index: 9999;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        ">
          📡 You're offline. Some features may be limited.
        </div>
      `;
      document.body.appendChild(notification);
    }
  }

  setupBackgroundSync() {
    // Handle background sync for forms and data
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      // Register for background sync when forms are submitted offline
      navigator.serviceWorker.ready.then(registration => {
        // This will be used by forms to sync when online
        window.backgroundSync = (action, data) => {
          return registration.sync.register(`${action}-${Date.now()}`);
        };
      });
    }
  }

  showUpdateNotification() {
    // Disabled per user request: perform silent update with no UI
    try {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistration().then(reg => {
          if (reg && reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      }
    } catch (_) {}
  }

  // Public methods for manual control
  async checkForUpdates() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.update();
      }
    }
  }

  async unregister() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.unregister();
        console.log('🗑️ Service Worker unregistered');
      }
    }
  }
}

// Initialize PWA when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.pwaManager = new PWAManager();
  });
} else {
  window.pwaManager = new PWAManager();
}

// Export for global access
window.PWAManager = PWAManager;
