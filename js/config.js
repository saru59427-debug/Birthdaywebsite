// ============================================================
// PERSONALIZATION CONFIG — Edit everything here!
// ============================================================
const CONFIG = {

  // ── Personal Info ──────────────────────────────────────────
  girlfriendName: "Laksha",
  yourName: "Your Love",

  // ── Birthday Countdown Mode ────────────────────────────────
  // Starts at 11:59:57 and ticks up second-by-second to 12:00:00 AM!
  // At 12 o'clock, it triggers confetti, fireworks & unlocks her surprise gift, photo & letter!
  countdownStart: "11:59:57",
  countdownTarget: "12:00:00",

  // ── Hero Section ───────────────────────────────────────────
  heroTagline: "— For the one who lights my world —",
  heroTitle: "To the most beautiful soul in my universe...",
  heroSubtitle: "Today, the world celebrates someone who makes my world more beautiful.",

  // ── Music Player ───────────────────────────────────────────
  musicSrc: "assets/music/romantic.mp3",
  musicTitle: "Our Song ♪",

  // ── Our Beautiful Little Memories Photo Gallery ───────────
  // Supports 80+ photos with categories, captions, quotes, and full-screen view
  specialMemories: [
    {
      id: 1,
      title: "That Radiant Smile",
      category: "smile",
      categoryName: "Your Beautiful Smile",
      img: "assets/images/photo1.jpg",
      caption: "The radiant warmth that lights up my entire universe.",
      quote: "Every time I see that smile, my entire world stops.",
      message: "The moment I see you smile, all my worries disappear. You have the prettiest smile in this universe, and I fall for it every single day. 💖"
    },
    {
      id: 2,
      title: "My Favourite View",
      category: "favourite",
      categoryName: "My Favourite Pictures",
      img: "assets/images/photo2.jpg",
      caption: "Effortlessly breathtaking in every single glance.",
      quote: "My favourite view in every single universe.",
      message: "I could look at you for hours and still fall in love all over again. You are effortlessly breathtaking, inside and out. 🌹"
    },
    {
      id: 3,
      title: "Pure Magic Moments",
      category: "moments",
      categoryName: "Beautiful Moments",
      img: "assets/images/photo3.jpg",
      caption: "Quiet shared moments that turn into forever treasures.",
      quote: "A single moment with you is worth a lifetime.",
      message: "Holding your hand, sharing silence, laughing at little things — every second with you is a treasure I hold close to my heart. ✨"
    },
    {
      id: 4,
      title: "Grace & Elegance",
      category: "treasure",
      categoryName: "Memories I Treasure",
      img: "assets/images/photo4.jpg",
      caption: "Your kindness and gentle warmth make you unforgettable.",
      quote: "Simply unforgettable, uniquely and beautifully you.",
      message: "Your beauty is not just on the outside; it’s in your kindness, your warmth, and the gentle grace you carry everywhere you go. 💫"
    },
    {
      id: 5,
      title: "My Beautiful Princess",
      category: "princess",
      categoryName: "My Princess",
      img: "assets/images/photo5.jpg",
      caption: "The queen of my heart, glowing like morning light.",
      quote: "You make ordinary days feel like pure magic.",
      message: "Because of you, my world is colourful and full of joy. You are my safe place, my best friend, and my greatest blessing. 👑"
    },
    {
      id: 6,
      title: "Forever My Favourite",
      category: "forever",
      categoryName: "Forever My Favourite",
      img: "assets/images/photo6.jpg",
      caption: "With you, every tomorrow feels brighter than yesterday.",
      quote: "Forever and always, my happiest place.",
      message: "Wherever you are is home to me. Today, I wish you all the happiness, endless smiles, and every dream your heart desires. Happy Birthday, my love! 🌸"
    }  ],

  // ── Birthday Wishing Letter ────────────────────────────────
  letterSalutation: "Happy Birthday, My Beautiful Girl. ❤️",
  letterQuotes: [
    "“In a universe full of stars, you are my brightest light.”",
    "“Loving you is the easiest, most beautiful thing I’ve ever done.”"
  ],
  letterBody: [
    "Happy Birthday to the most special person in my life.",
    "As the clock strikes 12:00 AM, my heart is overflowing with love and gratitude for you. You came into my life and made every ordinary day feel like a beautiful celebration.",
    "Your smile lights up my world in ways words can never truly explain. Your kindness, your laughter, your gentle heart — everything about you makes you unforgettable.",
    "On your special day, I wish you endless happiness, beautiful memories, big smiles, and all the love this world has to offer.",
    "You deserve everything beautiful in this universe and so much more. Keep shining, keep smiling, and never forget how deeply you are cherished.",
    "Happy Birthday, my love. Today, tomorrow, and forever. 🌹"
  ],
  letterSign: "Forever Yours With All My Love, ♡",

  // ── Beauty Compliment Cards ────────────────────────────────
  beautyCards: [
    {
      icon: "bi-emoji-smile",
      title: "Your Smile",
      message: "Your smile has the power to light up an entire room. It's the most beautiful thing I've ever seen, and I fall for it every single time."
    },
    {
      icon: "bi-eye",
      title: "Your Beautiful Eyes",
      message: "In your eyes I see a universe full of kindness, dreams, and warmth. I could get lost in them forever and never want to be found."
    },
    {
      icon: "bi-stars",
      title: "Your Personality",
      message: "You are one of a kind. Your uniqueness, your thoughts, the way you see the world — it's all so beautifully you, and I love every part of it."
    },
    {
      icon: "bi-heart",
      title: "Your Kindness",
      message: "The way you care for others, the gentleness in your heart — it's rare and beautiful. Your kindness makes the world a better place."
    },
    {
      icon: "bi-music-note-beamed",
      title: "Your Laughter",
      message: "Your laughter is my favourite sound in the entire world. It's pure, genuine, and it makes everything feel lighter and brighter."
    },
    {
      icon: "bi-heart-fill",
      title: "Your Beautiful Heart",
      message: "Your heart is the most beautiful thing about you. Pure, caring, and full of love — I feel so lucky to have a place in it."
    }
  ],

  // ── 100 Reasons ────────────────────────────────────────────
  reasons: [
    "Your smile could stop time",
    "The way your eyes light up",
    "Your contagious laughter",
    "How kind you are to everyone",
    "Your beautiful heart",
    "The way you care deeply",
    "Your incredible strength",
    "How genuine you are",
    "Your sense of humor",
    "The way you make me feel seen",
    "Your beautiful mind",
    "How you find beauty everywhere",
    "Your patience",
    "The way you love",
    "Your elegance",
    "How you never give up",
    "Your warmth",
    "The light you bring into rooms",
    "Your honesty",
    "How you make ordinary moments magical",
    "Your resilience",
    "The way you inspire me",
    "Your dreams",
    "How passionately you feel things",
    "Your voice",
    "The little things you notice",
    "Your creativity",
    "How you make people feel valued",
    "Your grace",
    "The way you handle everything",
    "Your intelligence",
    "How deeply you think",
    "Your softness",
    "The comfort you give",
    "Your loyalty",
    "How you show up for the people you love",
    "Your curiosity",
    "The way you see the world",
    "Your energy",
    "How you make everything better",
    "Your sensitivity",
    "The care you put into everything",
    "Your courage",
    "How you face your fears",
    "Your authenticity",
    "The realness you bring",
    "Your empathy",
    "How you understand without words",
    "Your quiet moments",
    "The peace you bring",
    "Your adventurous spirit",
    "How you embrace life",
    "Your affection",
    "The love you give so freely",
    "Your thoughtfulness",
    "How you remember the details",
    "Your independence",
    "The strength in your softness",
    "Your ambition",
    "How you chase your dreams",
    "Your optimism",
    "The hope you carry",
    "Your gentleness",
    "How tender your heart is",
    "Your trust",
    "The faith you give",
    "Your presence",
    "How everything is better with you here",
    "Your tears",
    "The depth of your emotions",
    "Your forgiveness",
    "How graciously you let things go",
    "Your growth",
    "The way you keep becoming",
    "Your mystery",
    "How there is always more to discover",
    "Your support",
    "The way you believe in others",
    "Your passion",
    "How alive you make everything feel",
    "Your calm",
    "The peace in your presence",
    "Your beauty",
    "How effortlessly stunning you are",
    "Your dedication",
    "How committed you are",
    "Your uniqueness",
    "How there is no one like you",
    "Your magic",
    "How you make the impossible feel real",
    "Your story",
    "How far you have come",
    "Your future",
    "All the beautiful things ahead",
    "Your birthday",
    "The day the world became more beautiful",
    "Your existence",
    "How the world is better because you're in it",
    "You — simply, completely, you ♡",
    "Forever and always, my favourite person in the universe ♡"
  ],

  // ── Final Celebration ──────────────────────────────────────
  finalMessage: "No matter how many birthdays come and go, I hope you always remember how special you are. Keep smiling, keep shining, and never stop being the wonderful person you are. You deserve all the happiness in the universe.",
  finalSign: "With All My Love. ♡"

};

// Expose globally
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
if (typeof module !== 'undefined') {
  module.exports = CONFIG;
}
