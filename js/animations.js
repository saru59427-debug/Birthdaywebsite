/* ============================================================
   ANIMATIONS.JS — Particle, confetti, fireworks, scroll reveal
   ============================================================ */

const Animations = (() => {

  // ── Scroll Reveal via IntersectionObserver ────────────────
  let scrollObserver = null;

  function observeAll() {
    if (!scrollObserver) return;
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      if (!el.classList.contains('visible')) {
        scrollObserver.observe(el);
      }
    });
    // Check elements already in or near viewport immediately
    checkInViewport();
  }

  function checkInViewport() {
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      if (!el.classList.contains('visible')) {
        const rect = el.getBoundingClientRect();
        // If element is in viewport or close to it
        if (rect.top <= vh + 100 && rect.bottom >= -50) {
          el.classList.add('visible');
        }
      }
    });
  }

  function initScrollReveal() {
    const options = {
      root: null,
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.05
    };

    if ('IntersectionObserver' in window) {
      scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const children = entry.target.querySelectorAll('[data-stagger]');
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 80);
            });
            scrollObserver.unobserve(entry.target);
          }
        });
      }, options);
    }

    observeAll();

    // Listen to scroll & resize as guaranteed fallback
    window.addEventListener('scroll', checkInViewport, { passive: true });
    window.addEventListener('resize', checkInViewport, { passive: true });

    // Safety checks: ensure elements in viewport are made visible
    setTimeout(checkInViewport, 150);
    setTimeout(checkInViewport, 600);
    setTimeout(checkInViewport, 1200);

    // Guaranteed ultimate fallback: after 2.5s, show any remaining hidden elements
    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        el.classList.add('visible');
      });
    }, 2500);
  }

  // ── Star Field ────────────────────────────────────────────
  function createStars(container, count = 80) {
    if (!container) return;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const dur = (Math.random() * 4 + 2).toFixed(1);
      const del = (Math.random() * 4).toFixed(1);
      const opacity = (Math.random() * 0.6 + 0.2).toFixed(2);

      Object.assign(star.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        '--duration': `${dur}s`,
        '--delay': `${del}s`,
        opacity
      });
      fragment.appendChild(star);
    }
    container.appendChild(fragment);
  }

  // ── Rose Petals ───────────────────────────────────────────
  function createRosePetals(container, count = 18) {
    if (!container) return;

    function spawnPetal() {
      const petal = document.createElement('div');
      petal.className = 'rose-petal';
      const x = Math.random() * 100;
      const dur = (Math.random() * 5 + 5).toFixed(1);
      const del = (Math.random() * 4).toFixed(1);
      const scale = (Math.random() * 0.8 + 0.5).toFixed(2);
      const hue = Math.random() > 0.5 ? '#f4c0cc' : '#d67a90';

      Object.assign(petal.style, {
        left: `${x}%`,
        '--duration': `${dur}s`,
        '--delay': `${del}s`,
        transform: `scale(${scale})`,
        background: `radial-gradient(ellipse at 40% 30%, ${hue}, #9e4060)`,
      });

      container.appendChild(petal);
      setTimeout(() => petal.remove(), (parseFloat(dur) + parseFloat(del)) * 1000 + 500);
    }

    // Initial batch
    for (let i = 0; i < count; i++) {
      setTimeout(spawnPetal, Math.random() * 3000);
    }

    // Continuous spawn
    return setInterval(() => {
      if (document.visibilityState === 'visible') spawnPetal();
    }, 800);
  }

  // ── Floating Heart Burst ──────────────────────────────────
  function launchHearts(origin, count = 8) {
    const hearts = ['💗', '💕', '💖', '💝', '❤️', '🌸'];
    const rect = (origin && origin.getBoundingClientRect)
      ? origin.getBoundingClientRect()
      : { left: window.innerWidth / 2, top: window.innerHeight / 2 };

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const h = document.createElement('div');
        h.className = 'floating-heart';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        Object.assign(h.style, {
          left: `${rect.left + Math.random() * (rect.width || 60) - 20}px`,
          top:  `${rect.top + window.scrollY}px`,
          fontSize: `${Math.random() * 1.5 + 1}rem`,
          animationDuration: `${Math.random() * 1 + 2}s`
        });
        document.body.appendChild(h);
        h.addEventListener('animationend', () => h.remove());
      }, i * 80);
    }
  }

  // ── Confetti ─────────────────────────────────────────────
  function launchBirthdayConfetti(count = 120) {
    const colors = ['#E8A6B8', '#D9B77E', '#FFF4EB', '#ff6b8a', '#ffcc00', '#a8e6a3', '#8eb4ff'];

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * 100;
        const dur = (Math.random() * 2 + 2).toFixed(1);
        const del = (Math.random() * 1).toFixed(2);
        const size = Math.floor(Math.random() * 10 + 6);
        const shape = Math.random() > 0.5 ? '50%' : '2px';

        Object.assign(piece.style, {
          left: `${x}vw`,
          top: `-20px`,
          width: `${size}px`,
          height: `${size}px`,
          background: color,
          borderRadius: shape,
          '--dur': `${dur}s`,
          '--delay': `${del}s`,
          animationDelay: `${del}s`,
          animationDuration: `${dur}s`,
        });

        document.body.appendChild(piece);
        piece.addEventListener('animationend', () => piece.remove());
      }, i * 20);
    }
  }

  // ── Fireworks ─────────────────────────────────────────────
  function launchFirework(x, y) {
    const colors = ['#E8A6B8', '#D9B77E', '#fff', '#ff6b8a', '#ffcc00'];
    const count = 24;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'firework-particle';
      const angle = (i / count) * Math.PI * 2;
      const dist = Math.random() * 80 + 40;
      const color = colors[Math.floor(Math.random() * colors.length)];

      Object.assign(particle.style, {
        left: `${x}px`,
        top: `${y}px`,
        background: color,
        transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`,
      });

      document.body.appendChild(particle);
      particle.addEventListener('animationend', () => particle.remove());
    }
  }

  function launchFireworks(duration = 4000) {
    const interval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.6;
      launchFirework(x, y);
    }, 300);

    setTimeout(() => clearInterval(interval), duration);
  }

  // ── Shooting Star ─────────────────────────────────────────
  function shootStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    Object.assign(star.style, {
      left:  `${Math.random() * 60}vw`,
      top:   `${Math.random() * 40}vh`,
    });
    document.body.appendChild(star);
    star.addEventListener('animationend', () => star.remove());
  }

  function scheduleShootingStars() {
    const intervals = [];

    function shoot() {
      shootStar();
      const next = Math.random() * 5000 + 3000;
      intervals.push(setTimeout(shoot, next));
    }

    shoot();
    return intervals;
  }

  // ── Typewriter ────────────────────────────────────────────
  function typewriter(el, lines, speed = 40, lineDelay = 600) {
    if (!el) return;
    el.innerHTML = '';
    let lineIdx = 0;
    let charIdx = 0;

    function typeLine() {
      if (lineIdx >= lines.length) {
        // Remove cursor blink class when done
        const cursors = el.querySelectorAll('.typewriter-text');
        cursors.forEach(c => c.classList.remove('typewriter-text'));
        return;
      }

      const para = document.createElement('p');
      para.className = 'letter-body-para typewriter-text';
      el.appendChild(para);

      const line = lines[lineIdx];
      charIdx = 0;

      function typeChar() {
        if (charIdx < line.length) {
          para.textContent += line[charIdx];
          charIdx++;
          setTimeout(typeChar, speed);
        } else {
          para.classList.remove('typewriter-text');
          lineIdx++;
          setTimeout(typeLine, lineDelay);
        }
      }

      typeChar();
    }

    typeLine();
  }

  // ── Navbar scroll behavior (gracefully skipped — no navbar) ──
  function initNavbar() {
    // Navbar removed per user request. This function is a no-op.
  }

  // ── Init all animations ───────────────────────────────────
  function init() {
    // Scroll reveal
    initScrollReveal();

    // Stars
    const starsContainer = document.querySelector('.stars-container');
    createStars(starsContainer, 80);

    // Rose petals
    const petalsContainer = document.querySelector('.rose-petals-container');
    createRosePetals(petalsContainer, 15);

    // Navbar
    initNavbar();

    // Shooting stars - random intervals
    scheduleShootingStars();
  }

  return {
    init,
    observeAll,
    launchHearts,
    launchBirthdayConfetti,
    launchFireworks,
    launchFirework,
    typewriter,
    shootStar,
  };
})();
