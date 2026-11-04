/* ============================================================
   MAIN.JS — Orchestrates all modules, intro overlay, hero
   ============================================================ */

(function () {
  'use strict';

  // ── Intro Overlay ─────────────────────────────────────────
  function initIntro() {
    // Start all modules immediately so the page is 100% interactive & ready
    startApp();

    const overlay = document.getElementById('introOverlay');
    if (!overlay) return;

    function dismissOverlay() {
      if (overlay.classList.contains('fade-out')) return;
      overlay.classList.add('fade-out');
      setTimeout(() => {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 1000);
    }

    // Auto-dismiss after 1.4 seconds
    setTimeout(dismissOverlay, 1400);

    // Also dismiss immediately if user clicks, touches, or presses any key
    overlay.addEventListener('click', dismissOverlay, { once: true });
    window.addEventListener('keydown', dismissOverlay, { once: true });
    window.addEventListener('scroll', dismissOverlay, { once: true });
  }

  // ── Populate hero name & text ─────────────────────────────
  function populateHero() {
    const nameEl = document.getElementById('heroName');
    if (nameEl && typeof CONFIG !== 'undefined') {
      nameEl.textContent = CONFIG.girlfriendName || 'My Beautiful Girl';
    }

    const tagEl = document.querySelector('.hero-tagline');
    if (tagEl && typeof CONFIG !== 'undefined' && CONFIG.heroTagline) {
      tagEl.textContent = CONFIG.heroTagline;
    }

    const subEl = document.querySelector('.hero-subtitle');
    if (subEl && typeof CONFIG !== 'undefined' && CONFIG.heroTitle) {
      subEl.textContent = CONFIG.heroTitle;
    }

    const sub2El = document.querySelector('.hero-sub2');
    if (sub2El && typeof CONFIG !== 'undefined' && CONFIG.heroSubtitle) {
      sub2El.textContent = CONFIG.heroSubtitle;
    }
  }

  // ── Open Surprise Button ──────────────────────────────────
  function initOpenSurprise() {
    const btn = document.getElementById('openSurpriseBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      // Dispatch user interaction event for music
      document.dispatchEvent(new Event('userInteracted'));

      // Start music
      if (typeof MusicPlayer !== 'undefined') {
        MusicPlayer.startOnInteraction();
      }

      // Launch hearts from button
      if (typeof Animations !== 'undefined') {
        Animations.launchHearts(btn, 10);
      }

      // Replay the countdown so she sees 11:59:57 ➔ 12:00:00!
      if (typeof Countdown !== 'undefined' && typeof Countdown.replay === 'function') {
        Countdown.replay();
      }

      // Switch to countdown page (page-by-page view)
      if (typeof PageManager !== 'undefined') {
        PageManager.goToPage('countdown');
      } else {
        const countdown = document.getElementById('countdown');
        if (countdown) countdown.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ── Add reveal classes to key elements ───────────────────
  function addRevealClasses() {
    // Clock cards
    document.querySelectorAll('.clock-digit-card, .countdown-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.12}s`;
    });

    // Section titles
    document.querySelectorAll('.section-title, .section-subtitle, .memories-main-title, .memories-sub-title').forEach(el => {
      el.classList.add('reveal');
    });

    // Special Memories portrait cards
    document.querySelectorAll('.memory-portrait-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 3) * 0.15}s`;
    });

    // Beauty cards
    document.querySelectorAll('.beauty-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 3) * 0.12}s`;
    });

    // Celebration elements
    document.querySelectorAll('.celebration-message > *').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.2}s`;
    });
  }

  // ── Performance: pause animations when hidden ─────────────
  function initVisibilityOptimization() {
    document.addEventListener('visibilitychange', () => {
      const petals = document.querySelectorAll('.rose-petal');
      const stars  = document.querySelectorAll('.star');
      const pause  = document.hidden ? 'paused' : 'running';

      [...petals, ...stars].forEach(el => {
        el.style.animationPlayState = pause;
      });
    });
  }

  // ── Responsive image error fallback ──────────────────────
  function initImageFallbacks() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function () {
        this.style.background = 'linear-gradient(135deg, #2a0e1b, #3d1324)';
        this.style.border = '1px solid rgba(232,166,184,0.2)';
        this.removeAttribute('src');
      });
    });
  }

  // ── Keyboard: escape closes modals ───────────────────────
  function initGlobalKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(m => {
          if (typeof bootstrap !== 'undefined') {
            const instance = bootstrap.Modal.getInstance(m);
            if (instance) instance.hide();
          }
        });
      }
    });
  }

  // ── Start all modules ─────────────────────────────────────
  let appStarted = false;
  function startApp() {
    if (appStarted) return;
    appStarted = true;

    // 1. Populate config-driven content first
    populateHero();

    // 2. Initialize interactive content sections (generates 100 reasons, populates beauty)
    if (typeof Surprises !== 'undefined') Surprises.init();

    // 3. Initialize Special Memories side-scrolling carousel
    if (typeof Gallery !== 'undefined') Gallery.init();

    // 4. Initialize 11:59:57 ➔ 12:00:00 midnight countdown clock
    if (typeof Countdown !== 'undefined') Countdown.init();

    // 5. Initialize background music player
    if (typeof MusicPlayer !== 'undefined') MusicPlayer.init();

    // 6. Bind hero "Open Your Surprise" button
    initOpenSurprise();

    // 7. Add scroll-reveal classes to all generated DOM elements
    addRevealClasses();

    // 8. Initialize animations & observe all reveal elements
    if (typeof Animations !== 'undefined') {
      Animations.init();
      if (typeof Animations.observeAll === 'function') {
        Animations.observeAll();
      }
    }

    // 9. Initialize PageManager (Page-by-Page presentation view)
    if (typeof PageManager !== 'undefined') {
      PageManager.init();
    }

    // 10. Additional event listeners & optimizations
    initVisibilityOptimization();
    initImageFallbacks();
    initGlobalKeyboard();
  }

  // ── Boot ──────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntro);
  } else {
    initIntro();
  }

  // ── Cleanup on unload ─────────────────────────────────────
  window.addEventListener('beforeunload', () => {
    if (typeof Countdown !== 'undefined') Countdown.destroy();
  });

})();
