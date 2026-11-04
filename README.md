# A UNIVERSE MADE FOR YOU ✦
## Premium Cinematic Birthday Surprise Website

An unforgettable, luxury-grade romantic birthday surprise web experience created with modern HTML5, CSS3, Vanilla JavaScript, Bootstrap 5.3, Bootstrap Icons, and Google Fonts.

---

## 🌹 Live Features & Experience Flow

1. **Magical Intro Screen**: Cinematic welcome overlay with smooth progress bar and auto-reveal.
2. **Hero Section**:
   - Dark cinematic background with deep burgundy/midnight glow.
   - Floating rose petals animation & twinkling star field.
   - Shooting stars across the sky at randomized intervals.
   - Animated luxury typography and **"Open Your Surprise ♡"** button with smooth glide & sound trigger.
3. **The 11:59:57 ➔ 12:00:00 Midnight Clock & Surprise Gift**:
   - Digital clock cards for **Hours : Minutes : Seconds**.
   - Ticks up second by second: **`11:59:57` ➔ `11:59:58` ➔ `11:59:59` ➔ `12:00:00` AM**!
   - When the clock strikes 12:00:00 Midnight:
     - Confetti burst & golden fireworks explosion!
     - Announcement banner: **"🕛 IT'S 12 O'CLOCK! HAPPY BIRTHDAY, MY LOVE! 🎉"**
     - Smoothly unlocks the **Surprise Gift**:
       1. **Her Memorable Portrait Photo** in an illuminated glowing frame with romantic halo.
       2. **The Birthday Love Letter Card** with wax seal, heartfelt romantic quotes, and warm wishes.
     - **Replay Button**: `↺ Replay 11:59:57 Countdown` to re-experience the moment anytime!
4. **Special Memories (Side-Scrolling Portrait Carousel)**:
   - Designed to match the luxury mobile/desktop reference layout with deep crimson glow.
   - Horizontal side-scrolling cards featuring her portrait photographs.
   - Under each image: a simple, touching, lovable romantic quote.
   - Glowing pill button **`💌 MESSAGE`** that opens a sweet personal love note modal.
   - Interactive navigation with previous/next controls and touch swipe gestures.
5. **What Makes You Beautiful**:
   - 6 interactive 3D flip compliment cards (*Your Smile, Beautiful Eyes, Personality, Kindness, Laughter, Beautiful Heart*).
   - Tap/click flips the card to reveal romantic personalized messages.
6. **100 Little Reasons Why You're Special**:
   - Responsive grid of 100 numbered interactive cards.
   - Flip each card to reveal a unique reason why she is special.
   - Interactive live counter and progress bar tracking discovered reasons.
   - Confetti burst upon discovering all 100 reasons!
7. **Final Birthday Celebration & Cake**:
   - Handcrafted CSS-animated multi-tier birthday cake with glowing frosting.
   - 5 interactive candles with flickering flames.
   - **"Blow the Candles" button** that blows out the flames sequentially and launches a grand finale of confetti and golden fireworks!
8. **Floating Music Player**:
   - Clean fixed music controller with play/pause, volume slider, mute toggle, and bouncing music note.
   - Supports local audio (`assets/music/romantic.mp3`) with an automated built-in Web Audio API romantic music-box synthesizer fallback.

---

## 📁 Project Structure

```
birthday-website/
│
├── index.html                  # Main semantic HTML5 file
│
├── css/
│   ├── style.css               # Core styling, variables, luxury gradients, carousel
│   ├── animations.css          # Rose petals, stars, fireworks, confetti, card flips
│   └── responsive.css          # Mobile, tablet, landscape, touch & print media queries
│
├── js/
│   ├── config.js               # ⭐ ALL EDITABLE CONTENT & PERSONALIZATION
│   ├── countdown.js            # 11:59:57 ➔ 12:00:00 midnight clock & surprise reveal
│   ├── gallery.js              # Special Memories side-scrolling carousel & notes
│   ├── music.js                # Floating audio player & Web Audio fallback
│   ├── animations.js           # Scroll reveal, rose petals, stars, fireworks
│   ├── surprises.js            # 100 reasons, candle blowing, compliment cards
│   └── main.js                 # App boot, intro overlay, lifecycle orchestration
│
├── assets/
│   ├── images/
│   │   ├── hero.jpg            # Hero & memorable portrait photo
│   │   ├── photo1.jpg          # Special memory photo 1
│   │   ├── photo2.jpg          # Special memory photo 2
│   │   ├── photo3.jpg          # Special memory photo 3
│   │   ├── photo4.jpg          # Special memory photo 4
│   │   ├── photo5.jpg          # Special memory photo 5
│   │   └── photo6.jpg          # Special memory photo 6
│   │
│   ├── music/
│   │   └── romantic.mp3        # High-quality romantic audio track
│   └── icons/
│
└── README.md                   # Documentation & setup guide
```

---

## ⚙️ Personalization Guide (Quick & Easy)

You do **not** need to touch HTML or main JavaScript files. Simply open:
👉 **`js/config.js`**

### 1. Names
```javascript
girlfriendName: "Her Beautiful Name",
yourName: "Your Name",
```

### 2. Special Memories Quotes & Messages
Under `specialMemories`, customize each photo's quote and message:
```javascript
specialMemories: [
  {
    img: "assets/images/photo1.jpg",
    quote: "Every time I see that smile, my entire world stops.",
    message: "Your special personal message here..."
  },
  ...
]
```

### 3. Birthday Wishing Letter
Edit `letterSalutation`, `letterQuotes`, and `letterBody`:
```javascript
letterSalutation: "Happy Birthday, My Beautiful Girl. ❤️",
letterBody: [
  "Paragraph 1...",
  "Paragraph 2..."
],
letterSign: "Forever Yours With All My Love, ♡"
```

---

## 🚀 How to View Locally & Deploy

- **Open in Browser**: Double-click [`index.html`](file:///c:/Users/suba3/OneDrive/Desktop/yuppi/birthday-website/index.html) to open in Chrome, Edge, Safari, or Firefox.
- **Deploy to Netlify**: Drag and drop the `birthday-website/` folder directly to [Netlify Drop](https://app.netlify.com/drop) for a free live HTTPS URL in 30 seconds!

---

*Crafted with infinite love and attention to detail. Happy Birthday! ♡*
