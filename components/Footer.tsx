import React from "react";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-white mb-6">
              FITNESS <span className="text-neon-blue">LANKA</span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-xs">
              Sri Lanka&apos;s premier fitness destination. We don&apos;t just build
              bodies; we build discipline, strength, and lifestyle transformations.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-neon-blue hover:text-black transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-neon-blue hover:text-black transition-all"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-neon-blue hover:text-black transition-all"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl font-bold text-white mb-6 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/memberships"
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                >
                  Memberships
                </Link>
              </li>
              <li>
                <Link
                  to="/personal-training"
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                >
                  Personal Training
                </Link>
              </li>
              <li>
                <Link
                  to="/classes"
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                >
                  Class Schedule
                </Link>
              </li>
              <li>
                <Link
                  to="/transformations"
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                >
                  Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-xl font-bold text-white mb-6 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xl font-bold text-white mb-6 uppercase tracking-wider">
              Visit Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="text-neon-blue shrink-0 mt-1" size={18} />
                <span>327 Raja Maha Vihara Rd, Sri Jayawardenepura Kotte 10100</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="text-neon-blue shrink-0" size={18} />
                <span>+94 77 741 0312</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="text-neon-blue shrink-0" size={18} />
                <span>info@fitnesslanka.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 pb-24 md:pb-0 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Fitness Lanka. All rights reserved.</p>

          {/* Upgraded signature badge */}
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <div className="relative group">
              {/* soft glow behind */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-neon-blue/25 via-white/10 to-neon-orange/25 blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-2.5 shadow-[0_0_25px_rgba(0,0,0,0.35)] group-hover:border-neon-blue/30 group-hover:bg-white/10 transition-all duration-500 group-hover:-translate-y-0.5">
                {/* shimmer sweep */}
                <div className="absolute inset-0 -translate-x-[130%] group-hover:translate-x-[130%] transition-transform duration-1000 ease-out pointer-events-none">
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12" />
                </div>

                <div className="flex items-center gap-3 text-xs md:text-sm">
                  <span className="text-gray-400">Website</span>
                  <span className="h-4 w-px bg-white/10" />

                  <span className="text-white/90 font-semibold">
                    Designed &amp; Developed by{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-orange font-black">
                      Ardeno Studio
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};