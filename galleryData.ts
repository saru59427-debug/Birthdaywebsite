export interface MemoryPhoto {
  id: number;
  title: string;
  category: 'favourite' | 'smile' | 'moments' | 'treasure' | 'princess' | 'forever' | string;
  categoryName: string;
  img: string;
  caption: string;
  quote?: string;
  message?: string;
}

export const MEMORY_CATEGORIES = [
  { id: 'all', label: 'All Memories' },
  { id: 'favourite', label: 'My Favourite Pictures' },
  { id: 'smile', label: 'Your Beautiful Smile' },
  { id: 'moments', label: 'Beautiful Moments' },
  { id: 'treasure', label: 'Memories I Treasure' },
  { id: 'princess', label: 'My Princess' },
  { id: 'forever', label: 'Forever My Favourite' },
] as const;

export const MEMORIES_DATA: MemoryPhoto[] = [
  {
    id: 1,
    title: "That Radiant Smile",
    category: "smile",
    categoryName: "Your Beautiful Smile",
    img: "assets/images/photo1.jpg",
    caption: "The radiant warmth that lights up my entire universe.",
    quote: "Every time I see that smile, my entire world stops.",
    message: "The moment I see you smile, all my worries disappear. You have the prettiest smile in this universe, and I fall for it every single day. ♡"
  },
  {
    id: 2,
    title: "My Favourite View",
    category: "favourite",
    categoryName: "My Favourite Pictures",
    img: "assets/images/photo2.jpg",
    caption: "Effortlessly breathtaking in every single glance.",
    quote: "My favourite view in every single universe.",
    message: "I could look at you for hours and still fall in love all over again. You are effortlessly breathtaking, inside and out. 🌸"
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
    message: "Your beauty is not just on the outside; it’s in your kindness, your warmth, and the gentle grace you carry everywhere you go. 🌹"
  },
  {
    id: 5,
    title: "My Beautiful Princess",
    category: "princess",
    categoryName: "My Princess",
    img: "assets/images/photo5.jpg",
    caption: "The queen of my heart, glowing like morning light.",
    quote: "You make ordinary days feel like pure magic.",
    message: "Because of you, my world is colourful and full of joy. You are my safe place, my best friend, and my greatest blessing. 💫"
  },
  {
    id: 6,
    title: "Forever My Favourite",
    category: "forever",
    categoryName: "Forever My Favourite",
    img: "assets/images/photo6.jpg",
    caption: "With you, every tomorrow feels brighter than yesterday.",
    quote: "Forever and always, my happiest place.",
    message: "Wherever you are is home to me. Today, I wish you all the happiness, endless smiles, and every dream your heart desires. Happy Birthday, my love! 🎂"
  },
  {
    id: 7,
    title: "The Light in My Days",
    category: "smile",
    categoryName: "Your Beautiful Smile",
    img: "assets/images/photo1.jpg",
    caption: "Happiness looks so effortless when you smile.",
    quote: "Your laughter is the sweetest melody I will ever know.",
    message: "No camera can fully capture how your smile warms up a room. You bring light into every corner of my life. 💖"
  },
  {
    id: 8,
    title: "Stolen Heart",
    category: "favourite",
    categoryName: "My Favourite Pictures",
    img: "assets/images/hero.jpg",
    caption: "The one who stole my heart and made it her home.",
    quote: "In a room full of art, I would still stare at you.",
    message: "You are the poetry I never knew how to write, and the song I want to play on repeat forever. 🌙"
  },
  {
    id: 9,
    title: "Unforgettable Gaze",
    category: "treasure",
    categoryName: "Memories I Treasure",
    img: "assets/images/photo2.jpg",
    caption: "A look that speaks more than thousands of words.",
    quote: "In your eyes, I found my favourite sanctuary.",
    message: "When you look at me with those eyes, everything feels calm. Thank you for being my constant peace. 🕊️"
  },
  {
    id: 10,
    title: "Golden Hour Glow",
    category: "princess",
    categoryName: "My Princess",
    img: "assets/images/photo3.jpg",
    caption: "Sunlight could never compete with your natural beauty.",
    quote: "You don't need a crown to be my forever princess.",
    message: "Every day with you is a fairy tale. You deserve all the stars in the night sky and all the love in the universe. 👑"
  },
  {
    id: 11,
    title: "A Lifetime of Love",
    category: "forever",
    categoryName: "Forever My Favourite",
    img: "assets/images/photo4.jpg",
    caption: "Every single day, I choose you over and over.",
    quote: "You will always be my today and all of my tomorrows.",
    message: "No matter where life takes us, my hand will always reach for yours. Happy birthday to my one and only. ♾️"
  },
  {
    id: 12,
    title: "Heart Full of Joy",
    category: "moments",
    categoryName: "Beautiful Moments",
    img: "assets/images/photo5.jpg",
    caption: "Simple moments turned into pure, timeless magic.",
    quote: "Being with you is where all my happiest memories live.",
    message: "The way you find joy in the little things inspires me every single day. Keep shining brightly, my girl. 🌟"
  }
];

