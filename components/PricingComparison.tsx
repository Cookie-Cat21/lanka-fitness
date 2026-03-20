import React from "react";
import { Check, X } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const Cell = ({ ok }: { ok: boolean }) => (
    <div className="flex justify-center">
        {ok ? (
            <Check className="w-5 h-5 text-neon-blue" />
        ) : (
            <X className="w-5 h-5 text-white/25" />
        )}
    </div>
);

const Row = ({
    label,
    basic,
    elite,
    transform,
}: {
    label: string;
    basic: boolean;
    elite: boolean;
    transform: boolean;
}) => (
    <div className="grid grid-cols-4 gap-4 py-4 border-t border-white/10">
        <div className="text-gray-300 text-sm">{label}</div>
        <Cell ok={basic} />
        <Cell ok={elite} />
        <Cell ok={transform} />
    </div>
);

export const PricingComparison: React.FC = () => {
    return (
        <section className="mt-16 md:mt-20">
            <div className="container mx-auto px-6">
                <ScrollReveal>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-transparent to-neon-orange/10 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-10">
                                <h3 className="text-3xl md:text-4xl font-heading font-black text-white uppercase">
                                    Quick <span className="text-neon-blue">Plan Comparison</span>
                                </h3>
                                <p className="text-gray-400 mt-3 max-w-2xl">
                                    A clean comparison table that makes the pricing feel premium and easy to choose.
                                </p>
                            </div>

                            <div className="grid grid-cols-4 gap-4 text-xs uppercase tracking-widest text-gray-400 pb-4">
                                <div>Features</div>
                                <div className="text-center">Basic</div>
                                <div className="text-center">Elite</div>
                                <div className="text-center">Transformation</div>
                            </div>

                            <Row label="Full Gym Access" basic={true} elite={true} transform={true} />
                            <Row label="Group Classes Included" basic={false} elite={true} transform={true} />
                            <Row label="Sauna & Steam Room" basic={false} elite={true} transform={true} />
                            <Row label="Quarterly Body Analysis" basic={false} elite={true} transform={true} />
                            <Row label="Personal Training Sessions" basic={false} elite={false} transform={true} />
                            <Row label="Custom Nutrition Plan" basic={false} elite={false} transform={true} />

                            <div className="mt-10 text-center text-gray-400 text-sm">
                                Need help choosing? WhatsApp us and we’ll recommend the best plan for your goal.
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
