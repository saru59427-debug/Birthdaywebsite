/* ============================================================
   SURPRISES.JS — Interactive secret surprises, gift box,
                   hidden hearts, candle blowing, celebrations
   ============================================================ */

const Surprises = (() => {
  let revealedReasons = new Set();
  let giftOpened = false;
  let candlesBlown = false;
  let currentSurpriseIdx = 0;

  // ── Get messages from CONFIG ──────────────────────────────
  function getMessages() {
    return (typeof CONFIG !== 'undefined' && CONFIG.surpriseMessages)
      ? CONFIG.surpriseMessages
      : ['You are my favourite person. ♡'];
  }

  // ── Gift Box ──────────────────────────────────────────────
  function initGiftBox() {
    const giftBox = document.getElementById('giftBox');
    const openBtn = document.getElementById('openGiftBtn');

    if (!giftBox) return;

    function openGift() {
      if (giftOpened) return;
      giftOpened = true;

      const lid  = giftBox.querySelector('.gift-lid');
      const body = giftBox.querySelector('.gift-body');

      if (lid)  lid.classList.add('open');
      if (body) body.classList.add('open');

      // Emit hearts from gift box
      setTimeout(() => {
        if (typeof Animations !== 'undefined') {
          Animations.launchHearts(giftBox, 12);
        }

        // Show surprise modal
        const messages = getMessages();
        const msg = messages[Math.floor(Math.random() * messages.length)];
        showSurpriseModal(msg);
      }, 600);
    }

    if (giftBox) giftBox.addEventListener('click', openGift);
    if (openBtn) openBtn.addEventListener('click', openGift);
  }

  // ── Show Modal (Bootstrap) ────────────────────────────────
  function showSurpriseModal(message) {
    const modalBody = document.getElementById('surpriseModalBody');
    if (modalBody) modalBody.textContent = message;

    const modalEl = document.getElementById('surpriseModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  // ── Hidden Hearts ─────────────────────────────────────────
  function initSecretHearts() {
    const messages = getMessages();

    document.querySelectorAll('.secret-heart').forEach((heart, i) => {
      heart.addEventListener('click', (e) => {
        e.stopPropagation();
        const msg = messages[i % messages.length];

        // Float up animation
        if (typeof Animations !== 'undefined') {
          Animations.launchHearts(heart, 5);
        }

        // Show heart modal
        const heartMsgEl = document.getElementById('heartModalBody');
        if (heartMsgEl) heartMsgEl.textContent = msg;

        const heartModalEl = document.getElementById('heartModal');
        if (heartModalEl && typeof bootstrap !== 'undefined') {
          const m = new bootstrap.Modal(heartModalEl);
          m.show();
        }
      });

      // Accessibility
      heart.setAttribute('tabindex', '0');
      heart.setAttribute('role', 'button');
      heart.setAttribute('aria-label', 'Discover a secret message');
      heart.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          heart.click();
        }
      });
    });
  }

  // ── 100 Reasons ───────────────────────────────────────────
  function initReasons() {
    const reasons = (typeof CONFIG !== 'undefined' && CONFIG.reasons)
      ? CONFIG.reasons
      : [];

    const grid = document.getElementById('reasonsGrid');
    if (grid && grid.children.length === 0) {
      grid.innerHTML = '';
      reasons.forEach((reason, i) => {
        const col = document.createElement('div');
        col.className = 'col-4 col-sm-3 col-md-2 col-lg-1';
        col.innerHTML = `
          <div class="reason-card" data-index="${i}" role="button" tabindex="0" aria-label="Reason ${i+1}">
            <div class="reason-inner">
              <div class="reason-front">${i + 1}</div>
              <div class="reason-back">${reason}</div>
            </div>
          </div>`;
        grid.appendChild(col);
      });
    }

    // Populate and bind reason cards
    const cards = document.querySelectorAll('.reason-card');
    cards.forEach((card, i) => {
      const backEl = card.querySelector('.reason-back');
      if (backEl && reasons[i]) {
        backEl.textContent = reasons[i];
      }

      card.addEventListener('click', () => {
        card.classList.toggle('revealed');
        if (card.classList.contains('revealed')) {
          revealedReasons.add(i);
        } else {
          revealedReasons.delete(i);
        }
        updateReasonProgress(cards.length || reasons.length);
      });

      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Reason ${i + 1}`);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  function updateReasonProgress(total) {
    const count = revealedReasons.size;
    const counter = document.getElementById('reasonsCounter');
    if (counter) counter.textContent = count;

    const bar = document.getElementById('reasonsProgressBar');
    if (bar) {
      const pct = Math.round((count / total) * 100);
      bar.style.width = `${pct}%`;
      bar.setAttribute('aria-valuenow', pct);
    }

    // Celebrate when all revealed
    if (count === total && typeof Animations !== 'undefined') {
      Animations.launchBirthdayConfetti(60);
    }
  }

  // ── Beauty Cards (flip) ────────────────────────────────────
  function initBeautyCards() {
    const cards = (typeof CONFIG !== 'undefined' && CONFIG.beautyCards) ? CONFIG.beautyCards : [];

    document.querySelectorAll('.beauty-card').forEach((card, i) => {
      const data = cards[i];
      if (data) {
        const icon  = card.querySelector('.beauty-icon');
        const title = card.querySelector('.beauty-title');
        const msg   = card.querySelector('.beauty-message');
        if (icon)  icon.className = `bi ${data.icon} beauty-icon`;
        if (title) title.textContent = data.title;
        if (msg)   msg.textContent = data.message;
      }

      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });

      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', data ? `Discover: ${data.title}` : 'Flip card');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // ── Timeline ──────────────────────────────────────────────
  function initTimeline() {
    const memories = (typeof CONFIG !== 'undefined' && CONFIG.memories) ? CONFIG.memories : [];

    document.querySelectorAll('.timeline-item').forEach((item, i) => {
      const mem = memories[i];
      if (!mem) return;

      const dateEl  = item.querySelector('.timeline-date');
      const titleEl = item.querySelector('.timeline-title');
      const descEl  = item.querySelector('.timeline-desc');
      const imgEl   = item.querySelector('.timeline-img');

      if (dateEl)  dateEl.textContent  = mem.date  || '';
      if (titleEl) titleEl.textContent = mem.title || '';
      if (descEl)  descEl.textContent  = mem.description || '';
      if (imgEl && mem.image) {
        imgEl.src = mem.image;
        imgEl.alt = mem.title || '';
      } else if (imgEl && !mem.image) {
        imgEl.remove();
      }
    });
  }

  // ── Candle Blowing ────────────────────────────────────────
  function initCandles() {
    const blowBtn = document.getElementById('blowCandlesBtn');
    if (!blowBtn) return;

    blowBtn.addEventListener('click', () => {
      if (candlesBlown) return;
      candlesBlown = true;

      const flames = document.querySelectorAll('.flame');
      flames.forEach((flame, i) => {
        setTimeout(() => {
          flame.classList.add('blown-out');
        }, i * 200);
      });

      blowBtn.textContent = '🎉 Happy Birthday! 🎉';
      blowBtn.disabled = true;

      // Confetti explosion
      setTimeout(() => {
        if (typeof Animations !== 'undefined') {
          Animations.launchBirthdayConfetti(150);
          Animations.launchFireworks(5000);
          Animations.launchHearts(blowBtn, 20);
        }
      }, 1200);
    });
  }

  // ── Envelope / Love Letter ────────────────────────────────
  function initLetter() {
    const openBtn  = document.getElementById('openEnvelopeBtn');
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letterContent');
    const letterBody    = document.getElementById('letterBody');
    let isOpen = false;

    if (!openBtn) return;

    const lines = (typeof CONFIG !== 'undefined' && CONFIG.letterBody) ? CONFIG.letterBody : [];
    const salutation = (typeof CONFIG !== 'undefined' && CONFIG.letterSalutation) ? CONFIG.letterSalutation : '';

    openBtn.addEventListener('click', () => {
      if (isOpen) return;
      isOpen = true;

      // Open envelope
      if (envelope) envelope.classList.add('open');

      // Show letter after animation
      setTimeout(() => {
        if (letterContent) letterContent.classList.add('open');

        const salEl = letterContent ? letterContent.querySelector('.letter-salutation') : null;
        if (salEl) salEl.textContent = salutation;

        // Typewriter effect
        if (letterBody && typeof Animations !== 'undefined') {
          Animations.typewriter(letterBody, lines, 35, 500);
        } else if (letterBody) {
          lines.forEach(line => {
            const p = document.createElement('p');
            p.className = 'letter-body-para';
            p.textContent = line;
            letterBody.appendChild(p);
          });
        }

        // Emit hearts
        if (typeof Animations !== 'undefined' && letterContent) {
          Animations.launchHearts(letterContent, 6);
        }
      }, 800);

      openBtn.textContent = '✓ Letter opened';
      openBtn.disabled = true;
    });
  }

  // ── Celebration Name / Message ────────────────────────────
  function initCelebration() {
    const name = (typeof CONFIG !== 'undefined' && CONFIG.girlfriendName) ? CONFIG.girlfriendName : 'Beautiful';
    const finalEl = document.getElementById('finalName');
    if (finalEl) finalEl.textContent = `Happy Birthday,`;

    const subEl = document.querySelector('.celebration-sub');
    if (subEl) subEl.textContent = `${name}! 🌹`;

    const msgEl = document.querySelector('.final-letter-text');
    if (msgEl && typeof CONFIG !== 'undefined') {
      msgEl.textContent = CONFIG.finalMessage || '';
    }

    const signEl = document.querySelector('.final-sign');
    if (signEl && typeof CONFIG !== 'undefined') {
      signEl.textContent = CONFIG.finalSign || 'With All My Love. ♡';
    }
  }

  // ── Surprise Section display msg ─────────────────────────
  function initSurpriseSection() {
    const messages = getMessages();
    const display  = document.querySelector('.surprise-message-display');

    const revealBtn = document.getElementById('revealSurpriseBtn');
    if (revealBtn && display) {
      revealBtn.addEventListener('click', () => {
        const msg = messages[currentSurpriseIdx % messages.length];
        currentSurpriseIdx++;
        display.textContent = msg;
        display.classList.add('visible');

        if (typeof Animations !== 'undefined') {
          Animations.launchHearts(revealBtn, 8);
        }
      });
    }
  }

  // ── Init all ─────────────────────────────────────────────
  function init() {
    initGiftBox();
    initSecretHearts();
    initReasons();
    initBeautyCards();
    initTimeline();
    initCandles();
    initLetter();
    initCelebration();
    initSurpriseSection();
  }

  // Expose launchHearts for countdown.js usage
  function launchHearts(origin, count) {
    if (typeof Animations !== 'undefined') {
      Animations.launchHearts(origin, count);
    }
  }

  return { init, launchHearts, showSurpriseModal };
})();
