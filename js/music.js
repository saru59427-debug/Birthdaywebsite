/* ============================================================
   MUSIC.JS — Floating Music Player
   ============================================================ */

const MusicPlayer = (() => {
  let audio = null;
  let isPlaying = false;
  let isMuted = false;
  let userInteracted = false;

  // ── Web Audio API Fallback Synthesizer ────────────────────
  let audioCtx = null;
  let synthInterval = null;
  let useSynthFallback = false;

  function playSynthNote(freq, start, dur) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      const vol = isMuted ? 0 : (audio ? audio.volume : 0.5) * 0.25;
      gain.gain.setValueAtTime(vol, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(start);
      osc.stop(start + dur);
    } catch (e) {}
  }

  function startSynthMelody() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const melody = [
        [261.63, 0.0, 2.0], [329.63, 0.5, 1.8], [392.00, 1.0, 1.8], [523.25, 1.5, 2.2],
        [196.00, 2.5, 2.0], [293.66, 3.0, 1.8], [392.00, 3.5, 1.8], [493.88, 4.0, 2.2],
        [220.00, 5.0, 2.0], [261.63, 5.5, 1.8], [329.63, 6.0, 1.8], [440.00, 6.5, 2.2],
        [174.61, 7.5, 2.0], [220.00, 8.0, 1.8], [261.63, 8.5, 1.8], [349.23, 9.0, 2.2]
      ];

      function playLoop() {
        if (!isPlaying || !useSynthFallback) return;
        const now = audioCtx.currentTime;
        melody.forEach(([f, t, d]) => playSynthNote(f, now + t, d));
      }

      playLoop();
      synthInterval = setInterval(playLoop, 10000);
    } catch (e) {}
  }

  function stopSynthMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  // ── Create Audio ──────────────────────────────────────────
  function createAudio() {
    if (audio) return;
    const domAudio = document.getElementById('bgMusic');
    const src = (typeof CONFIG !== 'undefined' && CONFIG.musicSrc)
      ? CONFIG.musicSrc
      : 'assets/music/romantic.mp3';

    audio = domAudio || new Audio(src);
    audio.loop = true;
    audio.volume = 0.5;

    audio.addEventListener('error', () => {
      console.warn('Using Web Audio API music synth fallback.');
      useSynthFallback = true;
      if (isPlaying) startSynthMelody();
    });

    // Volume slider
    const volSlider = document.getElementById('volumeSlider');
    if (volSlider) {
      volSlider.value = 50;
      volSlider.addEventListener('input', () => {
        const v = parseInt(volSlider.value, 10) / 100;
        audio.volume = v;
        isMuted = (v === 0);
        updateMuteIcon();
      });
    }
  }

  // ── Play / Pause ──────────────────────────────────────────
  function play() {
    if (!audio) createAudio();
    isPlaying = true;
    updatePlayIcon();
    animateNoteIcon(true);

    if (useSynthFallback) {
      startSynthMelody();
      return;
    }

    const promise = audio.play();
    if (promise !== undefined) {
      promise.catch(() => {
        // Fallback to Web Audio if audio element blocked or file issue
        useSynthFallback = true;
        startSynthMelody();
      });
    }
  }

  function pause() {
    isPlaying = false;
    if (audio) audio.pause();
    stopSynthMelody();
    updatePlayIcon();
    animateNoteIcon(false);
  }

  function togglePlay() {
    if (!userInteracted) userInteracted = true;
    isPlaying ? pause() : play();
  }

  // ── Mute ─────────────────────────────────────────────────
  function toggleMute() {
    if (!audio) return;
    isMuted = !isMuted;
    audio.muted = isMuted;
    updateMuteIcon();
  }

  // ── UI Updates ────────────────────────────────────────────
  function updatePlayIcon() {
    const btn = document.getElementById('playPauseBtn');
    if (!btn) return;
    btn.innerHTML = isPlaying
      ? '<i class="bi bi-pause-fill"></i>'
      : '<i class="bi bi-play-fill"></i>';
    btn.setAttribute('aria-label', isPlaying ? 'Pause music' : 'Play music');
  }

  function updateMuteIcon() {
    const btn = document.getElementById('muteBtn');
    if (!btn) return;
    btn.innerHTML = isMuted
      ? '<i class="bi bi-volume-mute-fill"></i>'
      : '<i class="bi bi-volume-up-fill"></i>';
    btn.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
  }

  function animateNoteIcon(playing) {
    const note = document.querySelector('.music-note-anim');
    if (!note) return;
    note.style.animationPlayState = playing ? 'running' : 'paused';
  }

  // ── Set track info from CONFIG ────────────────────────────
  function setTrackInfo() {
    const title = document.getElementById('trackTitle');
    if (title && typeof CONFIG !== 'undefined') {
      title.textContent = CONFIG.musicTitle || 'Our Song ♪';
    }
  }

  // ── Init ─────────────────────────────────────────────────
  function init() {
    setTrackInfo();

    const playBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        togglePlay();
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', toggleMute);
    }

    // Auto-play on any first user touch/click on the page
    const startAudioOnAnyTouch = () => {
      if (!isPlaying) {
        userInteracted = true;
        play();
      }
    };
    document.addEventListener('click', startAudioOnAnyTouch, { once: true, passive: true });
    document.addEventListener('touchstart', startAudioOnAnyTouch, { once: true, passive: true });

    // Auto-play after user interacts with the page (e.g. openSurpriseBtn)
    document.addEventListener('userInteracted', () => {
      if (!userInteracted && !isPlaying) {
        userInteracted = true;
        play();
      }
    }, { once: true });

    updatePlayIcon();
    updateMuteIcon();
  }

  // ── Public API ────────────────────────────────────────────
  function startOnInteraction() {
    if (!userInteracted) {
      userInteracted = true;
      play();
    }
  }

  return { init, play, pause, togglePlay, startOnInteraction };
})();
