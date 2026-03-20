import React from "react";
import { TRAINERS } from "../constants";
import { Button } from "../components/Button";
import { ScrollReveal } from "../components/ScrollReveal";

const WHATSAPP = "https://wa.me/94758504424";

export const PersonalTraining: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        {/* HERO (Premium container to avoid empty-feel) */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 mb-20">
          {/* subtle gradient wash */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-transparent to-neon-orange/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          </div>

          <div className="relative z-10 p-8 md:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* LEFT */}
              <div className="text-center lg:text-left">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-200">
                    1-on-1 Coaching
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={120}>
                  <h1 className="mt-6 text-5xl md:text-7xl font-heading font-black text-white uppercase leading-[0.9]">
                    Elite <span className="text-neon-blue">Coaching</span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={220}>
                  <p className="mt-5 text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Stop guessing. Start progressing. Our personal training programs are designed to break
                    plateaus. Work 1-on-1 with Colombo&apos;s top certified performance coaches.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={320}>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button
                      onClick={() =>
                        window.open(
                          `${WHATSAPP}?text=${encodeURIComponent(
                            "Hi Fitness Lanka! I’m interested in Personal Training. Can I book a consultation?"
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      Book Consultation
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        const el = document.getElementById("meet-the-team");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Meet the Team
                    </Button>
                  </div>
                </ScrollReveal>
              </div>

              {/* RIGHT (Image + overlay) */}
              <ScrollReveal>
                <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-black/30">
                  <div className="absolute inset-0 bg-neon-blue/20 opacity-20 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10 pointer-events-none" />
                  <img
                    src="https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2940&auto=format&fit=crop"
                    alt="Personal Training"
                    className="w-full h-[320px] md:h-[380px] lg:h-[420px] object-cover transition-all duration-700 ease-out group-hover:scale-105 lg:grayscale lg:group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>

            {/* Benefits */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Custom Programming",
                  desc: "Workouts tailored to your anatomy, injuries, and specific goals.",
                  accent: "border-neon-blue/40",
                },
                {
                  title: "Nutritional Guidance",
                  desc: "Simple macro coaching + meal structure to fuel your transformation.",
                  accent: "border-neon-orange/40",
                },
                {
                  title: "Accountability",
                  desc: "Consistent check-ins to ensure you stay on track.",
                  accent: "border-neon-blue/40",
                },
              ].map((b, i) => (
                <ScrollReveal key={i} delay={150 + i * 120}>
                  <div
                    className={`rounded-2xl border ${b.accent} bg-black/30 p-5 hover:bg-white/5 transition-colors`}
                  >
                    <div className="font-heading font-bold uppercase text-white tracking-wide">{b.title}</div>
                    <div className="text-gray-400 text-sm mt-2 leading-relaxed">{b.desc}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* TRAINERS */}
        <div id="meet-the-team" className="scroll-mt-32">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white uppercase mb-12 text-center">
              Meet The <span className="text-neon-blue">Team</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRAINERS.map((trainer, idx) => (
              <ScrollReveal key={trainer.id} delay={idx * 150}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 hover:border-neon-blue/30 transition-all duration-500">
                  {/* image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 lg:grayscale lg:group-hover:grayscale-0"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-neon-blue/20 mix-blend-overlay opacity-20 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* content */}
                  <div className="p-6">
                    <p className="text-neon-blue text-xs font-bold uppercase tracking-wider mb-2">
                      {trainer.role}
                    </p>
                    <h3 className="text-2xl font-heading font-black text-white uppercase mb-4">
                      {trainer.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {trainer.specialization.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] rounded-full bg-black/30 text-white px-3 py-1 uppercase border border-white/10"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      fullWidth
                      className="!py-3 !text-xs group-hover:border-neon-blue group-hover:text-neon-blue"
                      onClick={() =>
                        window.open(
                          `${WHATSAPP}?text=${encodeURIComponent(
                            `Hi Fitness Lanka! I want to book a session with ${trainer.name}.`
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal delay={200}>
          <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-transparent to-neon-orange/10 pointer-events-none" />
            <h3 className="relative z-10 text-3xl md:text-5xl font-heading font-black uppercase text-white">
              Ready to Start?
            </h3>
            <p className="relative z-10 text-gray-300 mt-4 max-w-2xl mx-auto">
              Get a plan built for your goals, your schedule, and your body — and track progress weekly.
            </p>
            <div className="relative z-10 mt-8 flex justify-center">
              <Button
                onClick={() =>
                  window.open(
                    `${WHATSAPP}?text=${encodeURIComponent(
                      "Hi Fitness Lanka! Please share Personal Training packages and available times."
                    )}`,
                    "_blank"
                  )
                }
              >
                Message on WhatsApp
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
