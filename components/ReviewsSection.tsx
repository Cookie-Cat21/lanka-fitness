import React from "react";
import { Star } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { REVIEWS } from "../constants";

export const ReviewsSection: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-transparent to-neon-orange/10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-14">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase mb-4">
                            Google <span className="text-neon-blue">Reviews</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Trusted by real members — premium atmosphere, coaching, and results.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {REVIEWS.map((r, i) => (
                        <ScrollReveal key={i} delay={i * 120}>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="font-heading font-bold uppercase text-white tracking-wide">
                                        {r.name}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, idx) => (
                                            <Star
                                                key={idx}
                                                className={`w-4 h-4 ${idx < r.rating ? "text-neon-orange" : "text-white/15"
                                                    }`}
                                                fill={idx < r.rating ? "currentColor" : "none"}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-6">“{r.text}”</p>

                                <div className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-neon-blue bg-white/5 border border-white/10 rounded-full px-4 py-2">
                                    {r.tag}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
