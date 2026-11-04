import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export interface PhotoMemory {
  id: number | string;
  img: string;
  title?: string;
  quote: string;
  message?: string;
}

interface SpecialMemoriesGalleryProps {
  memories?: PhotoMemory[];
  onOpenMessage?: (memory: PhotoMemory) => void;
}

export const DEFAULT_MEMORIES: PhotoMemory[] = [
  {
    id: 1,
    img: '/assets/images/photo1.jpg',
    title: 'That Beautiful Smile',
    quote: '“Every time I see that smile, my entire world stops.”',
    message: 'Your smile is the most beautiful thing I have ever seen. It makes every day worth living. I love you so much. 💖',
  },
  {
    id: 2,
    img: '/assets/images/photo2.jpg',
    title: 'My Princess',
    quote: '“You are my today and all of my tomorrows.”',
    message: 'You are everything I ever dreamed of and more. My heart is yours completely. 🌹',
  },
  {
    id: 3,
    img: '/assets/images/photo3.jpg',
    title: 'Beautiful Moment',
    quote: '“In your arms is where I always want to be.”',
    message: 'Every moment with you is a gift I cherish more than words can say. ✨',
  },
  {
    id: 4,
    img: '/assets/images/photo4.jpg',
    title: 'My Sunshine',
    quote: '“You are the sunshine of my life.”',
    message: 'You bring light into every corner of my life. I am so lucky to have you. ☀️',
  },
  {
    id: 5,
    img: '/assets/images/photo5.jpg',
    title: 'Forever Mine',
    quote: '“With you, every day is a new adventure.”',
    message: 'I want to spend every adventure of life with you by my side. You are my forever. 🌍',
  },
  {
    id: 6,
    img: '/assets/images/photo6.jpg',
    title: 'My Everything',
    quote: '“You are my heart, my life, my one and only.”',
    message: 'You are my heart and soul. Life is so beautiful because of you. I love you endlessly. 💗',
  },
];

export const SpecialMemoriesGallery: React.FC<SpecialMemoriesGalleryProps> = ({
  memories = DEFAULT_MEMORIES,
  onOpenMessage,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0d0008] via-[#1a0310] to-[#0a0005] px-4 py-16 overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(180,20,60,0.15),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide drop-shadow-[0_0_35px_rgba(232,166,184,0.45)]">
          Special Memories
        </h2>
        {/* Subtle champagne-gold divider line */}
        <div className="w-20 h-[1.5px] mx-auto my-3.5 bg-gradient-to-r from-transparent via-[#D9B77E] to-transparent rounded-full" />
        <p className="font-serif italic text-rose-200/90 text-sm sm:text-base tracking-wider">
          Swipe for more ✦
        </p>
      </div>

      {/* Horizontal Photo Strip Track */}
      <div className="relative w-full max-w-6xl flex items-center z-10">
        {/* Desktop Previous Button */}
        <button
          onClick={() => scrollBy(-240)}
          className="hidden md:flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full border border-[#D9B77E]/40 bg-[#14000a]/70 text-[#D9B77E] hover:bg-[#b4143c]/40 hover:scale-105 transition-all mr-2 z-20 cursor-pointer shadow-lg"
          aria-label="Previous photos"
        >
          ‹
        </button>

        {/* Scrollable Track */}
        <div
          ref={scrollContainerRef}
          className="flex flex-row items-start gap-4 overflow-x-auto scroll-smooth py-5 px-3 md:px-6 w-full cursor-grab active:cursor-grabbing no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {memories.map((item, idx) => (
            <motion.div
              key={item.id ?? idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="flex-shrink-0 w-[185px] sm:w-[210px] flex flex-col items-center gap-3"
            >
              {/* Portrait Photo Card */}
              <div
                onClick={() => onOpenMessage?.(item)}
                className="group relative w-full h-[250px] sm:h-[285px] rounded-[18px] overflow-hidden border border-[#e8a6b8]/35 shadow-[0_0_22px_rgba(180,20,60,0.35),0_8px_24px_rgba(0,0,0,0.6)] cursor-pointer hover:border-[#D9B77E]/60 hover:shadow-[0_0_32px_rgba(200,35,75,0.55)] transition-all duration-300"
              >
                <img
                  src={item.img}
                  alt={item.title || `Memory ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0005]/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Romantic Quote */}
              <p className="font-serif italic text-xs sm:text-sm text-[#fff4eb]/75 text-center leading-relaxed px-1 line-clamp-2">
                {item.quote}
              </p>

              {/* Message Pill Button */}
              <button
                type="button"
                onClick={() => onOpenMessage?.(item)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#D9B77E]/45 bg-[#b4143c]/20 hover:bg-[#b4143c]/40 text-[#D9B77E] hover:text-[#fff] text-[11px] font-medium tracking-widest uppercase transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <span>✉️ MESSAGE</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Desktop Next Button */}
        <button
          onClick={() => scrollBy(240)}
          className="hidden md:flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full border border-[#D9B77E]/40 bg-[#14000a]/70 text-[#D9B77E] hover:bg-[#b4143c]/40 hover:scale-105 transition-all ml-2 z-20 cursor-pointer shadow-lg"
          aria-label="Next photos"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default SpecialMemoriesGallery;

