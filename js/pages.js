/* ============================================================
   PAGES.JS — Discrete Multi-Page Presentation Controller
   Replaces vertical scrolling with true page-by-page view.
   Only the active page is visible. Next/Back buttons switch pages.
   ============================================================ */

const PageManager = (() => {
  const pages = [
    { id: 'hero', title: 'Welcome', icon: 'bi-stars' },
    { id: 'countdown', title: 'Midnight Countdown', icon: 'bi-clock' },
    { id: 'memoriesSection', title: 'Our Memories', icon: 'bi-images' },
    { id: 'letterSection', title: 'Birthday Letter', icon: 'bi-envelope-heart' },
    { id: 'beauty', title: 'What Makes You Beautiful', icon: 'bi-heart' },
    { id: 'celebration', title: 'Birthday Celebration', icon: 'bi-cake2' }
  ];

  let currentIndex = 0;

  function getPageIndex(idOrIndex) {
    if (typeof idOrIndex === 'number') {
      return Math.max(0, Math.min(pages.length - 1, idOrIndex));
    }
    const cleanId = String(idOrIndex).replace('#', '');
    const idx = pages.findIndex(p => p.id === cleanId);
    return idx !== -1 ? idx : 0;
  }

  function goToPage(idOrIndex) {
    const targetIndex = getPageIndex(idOrIndex);
    if (targetIndex === currentIndex && document.getElementById(pages[currentIndex].id)?.classList.contains('active-page')) {
      window.scrollTo(0, 0);
      return;
    }

    const prevPage = document.getElementById(pages[currentIndex].id);
    const nextPage = document.getElementById(pages[targetIndex].id);

    // Hide all pages to ensure no accidental double display
    pages.forEach((p, idx) => {
      const el = document.getElementById(p.id);
      if (el) {
        if (idx === targetIndex) {
          el.classList.add('page-view-section', 'active-page');
          el.style.display = (p.id === 'hero' || p.id === 'memoriesSection') ? 'flex' : 'block';
        } else {
          el.classList.remove('active-page');
          el.style.display = 'none';
        }
      }
    });

    currentIndex = targetIndex;

    // Reset scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Update top indicator bar
    updateIndicator();

    // Trigger page-specific logic
    onPageEntered(pages[currentIndex].id);
  }

  function nextPage() {
    if (currentIndex < pages.length - 1) {
      goToPage(currentIndex + 1);
    }
  }

  function prevPage() {
    if (currentIndex > 0) {
      goToPage(currentIndex - 1);
    }
  }

  function updateIndicator() {
    const stepText = document.getElementById('indicatorStepText');
    const pageName = document.getElementById('indicatorPageName');
    const dotsContainer = document.getElementById('indicatorDots');

    if (stepText) {
      stepText.textContent = `PAGE ${currentIndex + 1} OF ${pages.length}`;
    }

    if (pageName) {
      pageName.textContent = pages[currentIndex].title;
    }

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.page-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function buildIndicatorDots() {
    const dotsContainer = document.getElementById('indicatorDots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';

    pages.forEach((p, idx) => {
      const dot = document.createElement('button');
      dot.className = 'page-dot' + (idx === 0 ? ' active' : '');
      dot.setAttribute('type', 'button');
      dot.setAttribute('title', `Go to ${p.title}`);
      dot.setAttribute('aria-label', `Page ${idx + 1}: ${p.title}`);
      dot.addEventListener('click', () => goToPage(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function onPageEntered(pageId) {
    // 1. Reveal elements on the active page immediately
    const activeSection = document.getElementById(pageId);
    if (activeSection) {
      activeSection.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('active');
      });
    }

    // 2. Page-specific triggers
    if (pageId === 'countdown') {
      if (typeof Countdown !== 'undefined' && typeof Countdown.replay === 'function') {
        Countdown.replay();
      }
    } else if (pageId === 'memoriesSection') {
      if (typeof Gallery !== 'undefined') {
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (typeof Gallery.scrollToCard === 'function') {
              Gallery.scrollToCard(0, 'auto');
            }
          }, 60);
        });
      }
    } else if (pageId === 'celebration') {
      if (typeof Animations !== 'undefined' && typeof Animations.fireworksExplosion === 'function') {
        Animations.fireworksExplosion();
      }
    }
  }

  function bindNavigationEvents() {
    // Intercept all clicks on elements with .page-nav-btn, .btn-prev-page, .scroll-next, or data-target
    document.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('[data-target], .page-nav-btn, .btn-prev-page, .scroll-next');
      if (!targetBtn) return;

      const targetId = targetBtn.getAttribute('data-target') || targetBtn.getAttribute('href');
      if (!targetId) return;

      e.preventDefault();
      goToPage(targetId);
    });

    // Keyboard navigation (PageUp / PageDown)
    window.addEventListener('keydown', (e) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'PageDown') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        prevPage();
      }
    });
  }

  function init() {
    buildIndicatorDots();
    bindNavigationEvents();
    // Start on Page 0 (Hero)
    goToPage(0);
  }

  return {
    init,
    goToPage,
    nextPage,
    prevPage,
    getCurrentIndex: () => currentIndex
  };
})();

if (typeof window !== 'undefined') window.PageManager = PageManager;
if (typeof module !== 'undefined') module.exports = PageManager;

