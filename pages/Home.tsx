import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Trophy,
  Users,
  Clock,
  Flame,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "../components/Button";
import { ScrollReveal } from "../components/ScrollReveal";
import { TESTIMONIALS } from "../constants";
import { ReviewsSection } from "../components/ReviewsSection";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-neon-blue transition-colors group"
      >
        <span className="font-heading text-lg md:text-xl font-bold uppercase tracking-wide text-white group-hover:text-neon-blue group-hover:translate-x-2 transition-all duration-300 pr-4">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="text-neon-orange shrink-0" />
        ) : (
          <ChevronDown className="text-gray-500 group-hover:text-white transition-colors shrink-0" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-48 opacity-100 mb-6" : "max-h-0 opacity-0"
          }`}
      >
        <p className="text-gray-400 leading-relaxed pl-4 border-l border-neon-blue/30">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-24 md:pt-0 overflow-hidden">
        {/* Background Image + Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=75&w=1920&auto=format&fit=crop&fm=webp"
            alt="Gym Interior"
            className="w-full h-full object-cover scale-105 opacity-75"
            width="1920"
            height="1080"
            loading="eager"
            fetchPriority="high"
          />

          {/* Keep it cinematic, but NOT too dark */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

          {/* Subtle neon wash */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-transparent to-neon-orange/10 pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-10 md:pt-20">
          <div className="max-w-4xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6 group cursor-default">
                <div className="h-[2px] w-12 bg-neon-orange shadow-[0_0_10px_rgba(255,158,128,0.8)] group-hover:w-20 transition-all duration-500" />
                <span className="text-neon-orange font-heading uppercase tracking-[0.2em] font-bold text-sm md:text-base drop-shadow-md group-hover:text-white transition-colors duration-300">
                  Colombo&apos;s #1 Premium Fitness Hub
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white uppercase leading-[0.82] mb-8 tracking-[-0.04em] drop-shadow-2xl">
                Train <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-white relative inline-block hover:scale-[1.03] transition-transform duration-500 origin-left">
                  Beyond Limits
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p className="text-gray-200 text-lg md:text-2xl max-w-xl mb-12 leading-relaxed font-light drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity">
                Experience the next evolution of fitness. State-of-the-art
                equipment, elite trainers, and an atmosphere forged for results.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  onClick={() =>
                    window.open("https://wa.me/94758504424", "_blank")
                  }
                >
                  Start Trial
                </Button>
                <Link to="/memberships">
                  <Button variant="outline">View Memberships</Button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Social Proof Cards (FORCED 3 IN A ROW ON DESKTOP) */}
            <ScrollReveal delay={800}>
              <div className="mt-16 md:mt-20 border-t border-white/10 pt-8">
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        value: "500+",
                        label: "Members",
                        sub: "Active community in Colombo",
                      },
                      {
                        value: "50+",
                        label: "Classes",
                        sub: "Weekly sessions & programs",
                      },
                      {
                        value: "4.9",
                        label: "Rating",
                        sub: "Loved by our members",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="h-full rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight leading-none">
                              {item.value}
                            </div>
                            <div className="text-xs uppercase tracking-widest text-gray-400 mt-2">
                              {item.label}
                            </div>
                          </div>

                          <div className="hidden sm:block w-px self-stretch bg-white/10" />

                          <div className="hidden sm:block text-xs text-gray-400 leading-snug max-w-[10rem]">
                            {item.sub}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (Features) */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Trophy,
                color: "text-neon-blue",
                title: "Elite Equipment",
                desc: "Hammer Strength & Life Fitness ISO Lateral machines.",
              },
              {
                icon: Users,
                color: "text-neon-orange",
                title: "Expert Coaches",
                desc: "Certified trainers who build champions, not just bodies.",
              },
              {
                icon: Flame,
                color: "text-neon-blue",
                title: "High Energy",
                desc: "Immersive lighting and sound systems to fuel your drive.",
              },
              {
                icon: Clock,
                color: "text-neon-orange",
                title: "Extended Hours",
                desc: "5 AM to 11 PM. No excuses. Train on your schedule.",
              },
            ].map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div className="glass-card h-full p-10 rounded-3xl group cursor-pointer border border-white/5 bg-white/5 md:bg-transparent md:hover:border-neon-blue/30 transition-all duration-500 md:hover:-translate-y-2 md:hover:shadow-[0_0_45px_rgba(0,0,0,0.55)]">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 md:group-hover:bg-white/20 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.2)] md:group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] md:group-hover:scale-110">
                    <feature.icon
                      className={`${feature.color} w-8 h-8 md:group-hover:text-white transition-colors duration-500`}
                    />
                  </div>
                  <h3 className="font-heading text-2xl font-bold uppercase mb-4 text-white md:group-hover:text-neon-blue transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed md:group-hover:text-gray-200 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATION TEASER */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 relative order-2 md:order-1">
            <ScrollReveal>
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-3xl group cursor-pointer border border-white/5">
                  <div className="absolute inset-0 bg-neon-blue/20 opacity-20 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay pointer-events-none" />
                  <img
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop&fm=webp"
                    alt="Trainer"
                    className="transition-all duration-700 ease-out group-hover:scale-110 object-cover w-full h-full group-hover:brightness-110"
                    width="400"
                    height="600"
                    loading="lazy"
                  />
                </div>

                <div className="relative overflow-hidden rounded-3xl group mt-12 cursor-pointer border border-white/5">
                  <div className="absolute inset-0 bg-neon-orange/20 opacity-20 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay pointer-events-none" />
                  <img
                    src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop&fm=webp"
                    alt="Workout"
                    className="transition-all duration-700 ease-out group-hover:scale-110 object-cover w-full h-full group-hover:brightness-110"
                    width="400"
                    height="600"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2">
            <ScrollReveal delay={200}>
              <h2 className="text-5xl md:text-7xl font-heading font-black text-white uppercase mb-8 leading-none drop-shadow-xl">
                Real People. <br />
                <span className="text-neon-orange relative">
                  Real Results.
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-neon-orange opacity-50"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-10 font-light leading-relaxed">
                We don&apos;t sell memberships; we sell results. Whether you want
                to shred fat, build muscle, or improve athletic performance,
                Fitness Lanka provides the blueprint.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="glass-panel p-8 mb-10 rounded-3xl border border-white/10 md:hover:border-neon-blue/40 transition-all duration-500 md:hover:shadow-[0_0_45px_rgba(0,0,0,0.55)]">
                <p className="italic text-gray-300 mb-6 text-lg">
                  &quot;{TESTIMONIALS[0].quote}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={TESTIMONIALS[0].image}
                    alt="User"
                    className="w-14 h-14 rounded-full object-cover border-2 border-neon-blue shadow-[0_0_20px_rgba(0,240,255,0.3)] md:hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-heading font-bold uppercase text-white tracking-wider">
                      {TESTIMONIALS[0].name}
                    </h4>
                    <p className="text-xs text-neon-blue font-bold uppercase">
                      {TESTIMONIALS[0].result}
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/transformations">
                <Button variant="secondary">
                  See More Success Stories <ArrowRight size={20} />
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ✅ NEW: Google Reviews Block */}
      <ReviewsSection />

      {/* FAQ SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase mb-12 text-center">
              Frequently Asked <span className="text-neon-blue">Questions</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass-panel p-6 md:p-12 rounded-3xl border border-white/10 md:hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-shadow duration-500">
              <FAQItem
                question="Do you offer a free trial?"
                answer="Yes, we offer a 1-day free pass for local residents. Just bring your ID to the front desk or book via WhatsApp."
              />
              <FAQItem
                question="What are your peak hours?"
                answer="Our peak hours are typically 6 AM - 8 AM and 5 PM - 8 PM. If you prefer a quieter workout, late mornings or mid-afternoons are ideal."
              />
              <FAQItem
                question="Is personal training included?"
                answer="Personal training is an add-on service. However, our 'Transformation' package includes 12 sessions. All members get a free induction session."
              />
              <FAQItem
                question="Can I freeze my membership?"
                answer="Yes, annual members can freeze their membership for up to 30 days per year for travel or medical reasons."
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA SECTION - URGENCY */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-orange/20 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-transparent to-transparent z-0 pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <span className="inline-block bg-white text-black px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded-full animate-pulse">
              Limited Availability
            </span>

            <h2 className="text-5xl md:text-8xl font-heading font-black text-white uppercase mb-8 tracking-tighter drop-shadow-2xl">
              READY TO TRANSFORM YOUR BODY?
            </h2>

            <p className="text-gray-200 text-xl md:text-2xl max-w-2xl mx-auto mb-10 font-medium">
              Experience elite training, premium equipment, and a results-driven
              community in Colombo. Limited slots available for new members.
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-300 mb-10">
              <span className="opacity-80">No Joining Fee</span>
              <span className="opacity-80">Certified Trainers</span>
              <span className="opacity-80">Beginner Friendly</span>
            </div>

            <Button
              variant="secondary"
              onClick={() => window.open("https://wa.me/94758504424", "_blank")}
              className="mx-auto !bg-white !text-black hover:!bg-neon-blue hover:!text-black shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(0,240,255,0.4)]"
            >
              Explore Membership Plans
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
