import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

export const Transformations: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase mb-4">
            Success <span className="text-neon-green">Stories</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            These aren't just photos. These are months of discipline, sweat, and dedication. Be our next success story.
          </p>
        </div>

        {/* Visual Transformations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-4">
               <div className="flex gap-2 mb-4">
                 <div className="w-1/2 relative">
                   <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 uppercase">Before</span>
                   <img src={`https://picsum.photos/seed/before${i}/300/400`} alt="Before" className="w-full h-64 object-cover grayscale" />
                 </div>
                 <div className="w-1/2 relative">
                   <span className="absolute top-2 left-2 bg-neon-blue text-black text-[10px] font-bold px-2 py-1 uppercase">After</span>
                   <img src={`https://picsum.photos/seed/after${i}/300/400`} alt="After" className="w-full h-64 object-cover" />
                 </div>
               </div>
               <h3 className="font-heading text-xl font-bold text-white uppercase">Member #{i * 142}</h3>
               <p className="text-neon-green text-sm font-bold uppercase mb-2">12 Week Transformation</p>
               <p className="text-gray-400 text-sm">"The structure at Fitness Lanka is what I needed. No more random workouts."</p>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-neon-dark border border-white/10 p-8 relative">
              <Quote className="text-white/10 absolute top-4 right-4 w-12 h-12" />
              <p className="text-gray-300 italic mb-6 relative z-10">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-heading font-bold text-white uppercase">{t.name}</h4>
                  <p className="text-xs text-gray-500 uppercase">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
