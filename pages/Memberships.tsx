import React from "react";
import { PRICING } from "../constants";
import { Check } from "lucide-react";
import { Button } from "../components/Button";
import { ScrollReveal } from "../components/ScrollReveal";
import { PricingComparison } from "../components/PricingComparison";

export const Memberships: React.FC = () => {
  const WA_NUMBER = "94770000000";

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase mb-4">
              Membership <span className="text-neon-blue">Plans</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transparent pricing. No hidden fees. Choose the tier that fits your goals and lifestyle.
            </p>
          </ScrollReveal>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING.map((tier, idx) => (
            <ScrollReveal key={tier.name} delay={idx * 150}>
              <div
                className={`
                  relative p-8 md:p-10 rounded-3xl border transition-all duration-500 group h-full
                  ${tier.highlight
                    ? "border-neon-blue bg-white/5 md:-translate-y-4 shadow-[0_0_40px_rgba(0,240,255,0.12)] hover:shadow-[0_0_60px_rgba(0,240,255,0.22)]"
                    : "border-white/10 bg-black hover:bg-white/5 hover:border-white/25 md:hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(0,0,0,0.55)]"
                  }
                `}
              >
                {/* Subtle glow */}
                {tier.highlight && (
                  <div className="absolute inset-0 rounded-3xl bg-neon-blue/5 animate-pulse pointer-events-none" />
                )}

                {tier.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-blue text-black font-bold uppercase text-xs px-4 py-1 tracking-wider rounded-full shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                    Most Popular
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div>
                    <h3 className="font-heading text-2xl font-bold uppercase text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                      {tier.name}
                    </h3>

                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-sm text-gray-400">LKR</span>
                      <span className="text-4xl md:text-5xl font-heading font-bold text-white group-hover:scale-[1.03] transition-transform duration-300 origin-left block">
                        {tier.price}
                      </span>
                      <span className="text-sm text-gray-500">/{tier.period}</span>
                    </div>

                    <ul className="space-y-4 mb-10">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <Check
                            className={`w-5 h-5 shrink-0 transition-colors duration-300 ${tier.highlight
                              ? "text-neon-blue"
                              : "text-gray-500 group-hover:text-neon-blue"
                              }`}
                          />
                          <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <Button
                      fullWidth
                      variant={tier.highlight ? "primary" : "outline"}
                      onClick={() =>
                        window.open(
                          `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                            `I'm interested in the ${tier.name} plan`
                          )}`,
                          "_blank"
                        )
                      }
                      className={
                        !tier.highlight
                          ? "group-hover:border-neon-blue group-hover:text-neon-blue"
                          : ""
                      }
                    >
                      Join {tier.name}
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ✅ NEW: Comparison Section */}
        <PricingComparison />

        {/* Corporate + Student Rates (premium) */}
        <ScrollReveal delay={250}>
          <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-10 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-transparent to-neon-orange/10 pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h3 className="font-heading text-2xl md:text-3xl font-black text-white uppercase mb-4">
                Corporate & <span className="text-neon-blue">Student</span> Rates
              </h3>

              <p className="text-gray-400 mb-8 leading-relaxed">
                We offer special discounts for valid University Student IDs and Corporate Partners in Colombo.
                Contact us for verification and pricing.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={() =>
                    window.open(`https://wa.me/${WA_NUMBER}`, "_blank")
                  }
                >
                  Inquire via WhatsApp
                </Button>

                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10"
                  onClick={() => window.location.assign("/contact")}
                >
                  Contact Front Desk
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
