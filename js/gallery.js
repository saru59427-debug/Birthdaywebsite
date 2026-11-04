/* ============================================================
   GALLERY.JS â€” Simple Horizontal Scroll Birthday Memories Gallery
   - Horizontal side-scrolling portrait photo cards
   - Touch swipe, mouse drag, horizontal mousewheel
   - Clicking card opens #memoryModal (Bootstrap)
   - No categories, no thumbnails, no lightbox, no coverflow
   ============================================================ */

const Gallery = (() => {
  let memories = [];

  // Drag tracking
  let isDragging = false;
  let didDrag = false;
  let dragStartX = 0;
  let scrollStartX = 0;

  // Touch tracking
  let touchStartX = 0;
  let touchStartScroll = 0;

  const PLACEHOLDER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23380e1e'/><stop offset='100%25' stop-color='%230b0408'/></linearGradient></defs><rect width='100%25' height='100%25' fill='url(%23g)'/><text x='150' y='210' fill='%23e8a6b8' font-family='sans-serif' font-size='16' text-anchor='middle'>Photo</text></svg>";

  /* Load memories from CONFIG or fallback */
  function loadMemories() {
    if (typeof CONFIG !== 'undefined' && Array.isArray(CONFIG.specialMemories) && CONFIG.specialMemories.length > 0) {
      memories = CONFIG.specialMemories.map((item, idx) => ({
        id: item.id || (idx + 1),
        title: item.title || `Memory #${idx + 1}`,
        img: item.img || `assets/images/photo${(idx % 6) + 1}.jpg`,
        caption: item.caption || 'A beautiful moment with you.',
        quote: item.quote || 'Every moment with you is magic.',
        message: item.message || 'You are my everything. \u2764\uFE0F'
      }));
    } else {
      memories = [
        { id: 1, title: 'That Beautiful Smile', img: 'assets/images/photo1.jpg', caption: 'Your smile lights up my world', quote: '\u201cEvery time I see that smile, my entire world stops.\u201d', message: 'Your smile is the most beautiful thing I have ever seen. It makes every day worth living. I love you so much. \uD83D\uDC93' },
        { id: 2, title: 'My Princess', img: 'assets/images/photo2.jpg', caption: 'My favourite person', quote: '\u201cYou are my today and all of my tomorrows.\u201d', message: 'You are everything I ever dreamed of and more. My heart is yours completely. \uD83C\uDF39' },
        { id: 3, title: 'Beautiful Moment', img: 'assets/images/photo3.jpg', caption: 'A moment I treasure', quote: '\u201cIn your arms is where I always want to be.\u201d', message: 'Every moment with you is a gift I cherish more than words can say. \u2728' },
        { id: 4, title: 'My Sunshine', img: 'assets/images/photo4.jpg', caption: 'You brighten my day', quote: '\u201cYou are the sunshine of my life.\u201d', message: 'You bring light into every corner of my life. I am so lucky to have you. \u2600\uFE0F' },
        { id: 5, title: 'Forever Mine', img: 'assets/images/photo5.jpg', caption: 'Forever and always', quote: '\u201cWith you, every day is a new adventure.\u201d', message: 'I want to spend every adventure of life with you by my side. You are my forever. \uD83C\uDF0E' },
        { id: 6, title: 'My Everything', img: 'assets/images/photo6.jpg', caption: 'You mean the world to me', quote: '\u201cYou are my heart, my life, my one and only.\u201d', message: 'You are my heart and soul. Life is so beautiful because of you. I love you endlessly. \uD83D\uDC96' }
      ];
    }
  }

  /* Build a single photo card */
  function buildCard(item, index) {
    const card = document.createElement('div');
    card.className = 'memory-card-item';
    card.dataset.index = index;
    card.innerHTML = `
      <div class="memory-img-wrap">
        <img
          class="memory-portrait-img"
          src="${item.img}"
          alt="${item.title}"
          loading="lazy"
          onerror="this.src='${PLACEHOLDER}'"
        />
        <div class="memory-img-overlay"></div>
      </div>
      <p class="memory-attractive-quote">${item.quote}</p>
    `;
    // Click on card opens love message modal
    card.addEventListener('click', () => {
      if (!didDrag) openModal(item);
    });
    return card;
  }

  /* Render all cards into track */
  function renderCards() {
    const track = document.getElementById('memoriesTrack');
    if (!track) return;
    track.innerHTML = '';
    memories.forEach((item, idx) => {
      track.appendChild(buildCard(item, idx));
    });
  }

  /* Open the Bootstrap memory modal */
  function openModal(item) {
    const titleEl = document.getElementById('memoryModalTitle');
    const quoteEl = document.getElementById('memoryModalQuote');
    const bodyEl  = document.getElementById('memoryModalBody');
    const imgEl   = document.getElementById('memoryModalImg');

    if (titleEl) titleEl.textContent = item.title || 'A Beautiful Memory';
    if (quoteEl) quoteEl.textContent = item.quote || '';
    if (bodyEl)  bodyEl.textContent  = item.message || '';
    if (imgEl) {
      imgEl.src = item.img || PLACEHOLDER;
      imgEl.alt = item.title || 'Memory';
    }

    const modalEl = document.getElementById('memoryModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }

    if (typeof Animations !== 'undefined' && typeof Animations.launchHearts === 'function') {
      Animations.launchHearts(document.body, 6);
    }
  }

  /* Scroll track by one card width */
  function scrollByCard(direction) {
    const track = document.getElementById('memoriesTrack');
    if (!track) return;
    const card = track.querySelector('.memory-card-item');
    const cardWidth = card ? card.offsetWidth + 16 : 220;
    track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }

  /* Bind mouse drag, touch, mousewheel, and nav buttons */
  function bindControls() {
    const track = document.getElementById('memoriesTrack');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');

    if (!track) return;

    // Nav buttons
    if (prevBtn) prevBtn.addEventListener('click', () => scrollByCard(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollByCard(1));

    // Mouse drag
    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      didDrag = false;
      dragStartX = e.clientX;
      scrollStartX = track.scrollLeft;
      track.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartX;
      if (Math.abs(delta) > 4) didDrag = true;
      track.scrollLeft = scrollStartX - delta;
    });
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        track.style.cursor = 'grab';
        setTimeout(() => { didDrag = false; }, 50);
      }
    });

    // Touch swipe
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartScroll = track.scrollLeft;
    }, { passive: true });
    track.addEventListener('touchmove', (e) => {
      const delta = e.touches[0].clientX - touchStartX;
      track.scrollLeft = touchStartScroll - delta;
    }, { passive: true });

    // Horizontal mousewheel
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY * 1.5;
    }, { passive: false });
  }

  /* Public init */
  function init() {
    loadMemories();
    renderCards();
    bindControls();
  }

  return { init };
})();
