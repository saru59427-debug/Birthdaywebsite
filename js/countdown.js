/* ============================================================
   COUNTDOWN.JS — 11:59:57 ➔ 12:00:00 Midnight Countdown Clock
   Ticks up second by second to 12 o'clock midnight, then launches
   celebration, fireworks, and guides directly to memories & letter!
   ============================================================ */

const Countdown = (() => {
  let intervalId = null;
  let currentSec = 57;
  let isClockRunning = false;
  let struckMidnight = false;

  function animateDigit(el, val) {
    if (!el) return;
    const formatted = String(val).padStart(2, '0');
    if (el.textContent !== formatted) {
      if (el.classList) {
        el.classList.remove('flip');
        void el.offsetWidth;
        el.classList.add('flip');
      }
      el.textContent = formatted;
      if (el.classList) {
        setTimeout(() => el.classList.remove('flip'), 400);
      }
    }
  }

  function renderClock(h, m, s) {
    const hEl = document.getElementById('cHours');
    const mEl = document.getElementById('cMinutes');
    const sEl = document.getElementById('cSeconds');

    animateDigit(hEl, h);
    animateDigit(mEl, m);
    animateDigit(sEl, s);

    const timePill = document.getElementById('clockTimeDisplay');
    if (timePill) {
      const hStr = String(h).padStart(2, '0');
      const mStr = String(m).padStart(2, '0');
      const sStr = String(s).padStart(2, '0');
      const ampm = (h === 12 && m === 0) ? 'AM MIDNIGHT' : 'PM';
      timePill.textContent = `🕛 ${hStr}:${mStr}:${sStr} ${ampm}`;
    }
  }

  function strike12OClock() {
    struckMidnight = true;
    renderClock(12, 0, 0);

    // Glowing golden clock style
    document.querySelectorAll('.clock-digit-card').forEach(card => {
      card.classList.add('midnight-struck');
    });

    // Reveal midnight birthday celebration banner
    const msg = document.getElementById('birthdayMessage');
    if (msg) {
      msg.classList.add('active');
    }

    // Launch grand celebration
    if (typeof Animations !== 'undefined') {
      if (Animations.launchBirthdayConfetti) Animations.launchBirthdayConfetti(150);
      if (Animations.launchFireworks) Animations.launchFireworks(5000);
      if (Animations.launchHearts) Animations.launchHearts(document.body, 30);
    }

    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    isClockRunning = false;
  }

  function tick() {
    currentSec++;
    if (currentSec === 58) {
      renderClock(11, 59, 58);
    } else if (currentSec === 59) {
      renderClock(11, 59, 59);
    } else if (currentSec >= 60) {
      strike12OClock();
    }
  }

  function replay() {
    destroy();
    struckMidnight = false;
    currentSec = 57;

    document.querySelectorAll('.clock-digit-card').forEach(card => {
      card.classList.remove('midnight-struck');
    });

    const msg = document.getElementById('birthdayMessage');
    if (msg) msg.classList.remove('active');

    renderClock(11, 59, 57);

    isClockRunning = true;
    intervalId = setInterval(tick, 1000);
  }

  function init() {
    destroy();
    struckMidnight = false;
    currentSec = 57;

    renderClock(11, 59, 57);

    isClockRunning = true;
    intervalId = setInterval(tick, 1000);

    // Bind replay buttons
    const replayBtn = document.getElementById('replayClockBtn');
    if (replayBtn) {
      replayBtn.onclick = replay;
    }
    const replay2 = document.getElementById('replayCountdownBtn');
    if (replay2) {
      replay2.onclick = replay;
    }
  }

  function destroy() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    isClockRunning = false;
  }

  return { init, destroy, replay };
})();

if (typeof window !== 'undefined') {
  window.Countdown = Countdown;
}
if (typeof module !== 'undefined') {
  module.exports = Countdown;
}
