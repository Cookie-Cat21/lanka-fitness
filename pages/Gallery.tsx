import React, { useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

type GalleryImage = {
  src: string;
  alt: string;
  span?: string;
};

export const Gallery: React.FC = () => {
  const images: GalleryImage[] = useMemo(
    () => [
      {
        src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=75&w=1200&auto=format&fit=crop&fm=webp",
        alt: "Strength floor",
        span: "md:row-span-2",
      },
      {
        src: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=75&w=800&auto=format&fit=crop&fm=webp",
        alt: "Gym equipment close-up",
      },
      {
        src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=75&w=800&auto=format&fit=crop&fm=webp",
        alt: "Weight training",
      },
      {
        src: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=75&w=800&auto=format&fit=crop&fm=webp",
        alt: "Cardio area",
      },
      {
        src: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=75&w=800&auto=format&fit=crop&fm=webp",
        alt: "Training session",
      },
      {
        src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=75&w=1200&auto=format&fit=crop&fm=webp",
        alt: "Mobility / stretching",
        span: "md:row-span-2",
      },
      {
        src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=75&w=800&auto=format&fit=crop&fm=webp",
        alt: "Functional training",
      },
      {
        src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=75&w=800&auto=format&fit=crop&fm=webp",
        alt: "Coach assisting client",
      },
      {
        src: "https://images.unsplash.com/photo-1637666062717-1c6bcfa4a4df?q=75&w=800&auto=format&fit=crop&fm=webp",
        alt: "Cardio machines",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);

  const prev = () => {
    if (activeIndex === null) return;
    setActiveIndex((i) => (i === 0 ? images.length - 1 : (i as number) - 1));
  };

  const next = () => {
    if (activeIndex === null) return;
    setActiveIndex((i) => (i === images.length - 1 ? 0 : (i as number) + 1));
  };

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen relative overflow-hidden">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-transparent to-neon-orange/10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase mb-4">
              Facility <span className="text-neon-blue">Showcase</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A premium training environment — equipment, lighting, and space
              built for results.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[240px]">
          {images.map((img, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 60}
              className={`${img.span ?? ""} relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 cursor-pointer`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="absolute inset-0 w-full h-full text-left"
                aria-label={`Open image: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110"
                  width={img.span ? 800 : 400}
                  height={img.span ? 1000 : 300}
                  loading="lazy"
                />
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-0 bg-neon-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay pointer-events-none" />

                {/* label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-heading font-bold uppercase tracking-wide text-sm">
                    {img.alt}
                  </div>
                  <div className="text-gray-300 text-xs mt-1 opacity-80">
                    Click to view
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
              aria-label="Close"
              type="button"
            >
              <X className="w-7 h-7" />
            </button>

            <button
              type="button"
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition"
              aria-label="Previous"
            >
              <ChevronLeft />
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition"
              aria-label="Next"
            >
              <ChevronRight />
            </button>

            <div className="rounded-3xl overflow-hidden border border-white/10 bg-black">
              <img
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                className="w-full max-h-[78vh] object-cover"
              />
            </div>

            <div className="mt-4 text-center text-gray-300 text-sm">
              {images[activeIndex].alt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
