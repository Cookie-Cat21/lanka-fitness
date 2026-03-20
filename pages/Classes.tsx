import React from "react";
import { CLASSES } from "../constants";
import { Button } from "../components/Button";
import { Clock, Calendar } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

export const Classes: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="container mx-auto px-6">

        {/* PAGE HEADER */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase mb-6">
              Group <span className="text-neon-blue">Classes</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              High energy. Community vibes. Expert instruction.
              Train together, push harder, and elevate your performance.
            </p>
          </ScrollReveal>
        </div>

        {/* CLASSES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {CLASSES.map((cls, idx) => (
            <ScrollReveal key={cls.id} delay={idx * 120}>
              <div className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-neon-blue/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]">

                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-8 flex flex-col justify-between min-h-[240px]">
                  <div>
                    <h3 className="font-heading text-2xl font-bold uppercase text-white mb-6 group-hover:text-neon-blue transition-colors">
                      {cls.title}
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Clock size={18} className="text-neon-blue" />
                        <span className="text-sm font-medium">
                          {cls.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar size={18} className="text-neon-blue" />
                        <span className="text-sm font-medium">
                          {cls.days.join(" / ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full py-3 group-hover:bg-neon-blue group-hover:text-black group-hover:border-neon-blue transition-all duration-300"
                    onClick={() =>
                      window.open(
                        "https://wa.me/94758504424?text=Hi, I want to book " +
                        cls.title,
                        "_blank"
                      )
                    }
                  >
                    Book Slot
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* FREE CLASS SECTION */}
        <ScrollReveal delay={300}>
          <div className="mt-28 rounded-3xl border border-white/10 bg-gradient-to-r from-neon-blue/10 via-black to-neon-orange/10 p-16 text-center relative overflow-hidden">

            <h3 className="font-heading text-4xl md:text-5xl font-black text-white uppercase mb-6">
              First Class Is <span className="text-neon-blue">Free</span>
            </h3>

            <p className="text-gray-400 max-w-2xl mx-auto mb-10">
              Not sure which class fits you? Try one session on the house and
              experience the Fitness Lanka energy.
            </p>

            <div className="flex justify-center">
              <Button
                onClick={() =>
                  window.open("https://wa.me/94758504424", "_blank")
                }
                className="px-10 py-4"
              >
                Claim Free Pass
              </Button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
