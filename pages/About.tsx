import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="container mx-auto px-6">

        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <div className="w-full lg:w-1/2">
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase mb-6 leading-[0.9]">
              Built for <br /><span className="text-neon-blue">Greatness</span>
            </h1>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Fitness Lanka wasn't born from a desire to open just another gym in Colombo. It was born from frustration. Frustration with mediocre equipment, overcrowded spaces, and a lack of serious coaching.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              We set out to create a sanctuary for those who refuse to settle. A place where aesthetics meets performance. Where the music is loud, the weights are heavy, and the community drives you forward.
            </p>
            <div className="border-l-4 border-neon-blue pl-6 py-2">
              <h3 className="font-heading text-xl font-bold text-white uppercase">Our Mission</h3>
              <p className="text-gray-400">To elevate the standard of fitness in Sri Lanka by providing a world-class environment for physical and mental transformation.</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=75&w=800&auto=format&fit=crop&fm=webp"
              className="w-full h-80 object-cover rounded-sm translate-y-8"
              alt="Gym Interior"
              width="400"
              height="320"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=75&w=800&auto=format&fit=crop&fm=webp"
              className="w-full h-80 object-cover rounded-sm"
              alt="Weights"
              width="400"
              height="320"
              loading="lazy"
            />
          </div>
        </div>

        {/* Facilities Highlight */}
        <div className="bg-white/5 border border-white/10 p-12">
          <h2 className="text-3xl font-heading font-bold text-white uppercase mb-8 text-center">Facility Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="block text-4xl text-neon-blue font-heading font-bold mb-2">10k</span>
              <span className="text-gray-400 text-sm uppercase">Sq. Ft. Floor</span>
            </div>
            <div>
              <span className="block text-4xl text-neon-orange font-heading font-bold mb-2">24/7</span>
              <span className="text-gray-400 text-sm uppercase">Access</span>
            </div>
            <div>
              <span className="block text-4xl text-neon-blue font-heading font-bold mb-2">Premium</span>
              <span className="text-gray-400 text-sm uppercase">Changing Rooms</span>
            </div>
            <div>
              <span className="block text-4xl text-neon-orange font-heading font-bold mb-2">Protein</span>
              <span className="text-gray-400 text-sm uppercase">Shake Bar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
