'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';

// ─── Text-roll link (Ardent-style dual-layer shutter) ─────────────────────────
interface RollLinkProps {
  to: string;
  children: string;
  isActive: boolean;
  onClick?: () => void;
}

const RollLink: React.FC<RollLinkProps> = ({ to, children, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="group relative inline-flex items-center justify-center px-4 py-2 rounded-full overflow-hidden text-[11px] font-semibold uppercase tracking-[0.22em] select-none transition-all duration-300"
  >
    {/* Pill bg + border — appears on hover / active */}
    <span
      className={`
        absolute inset-0 rounded-full border
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isActive
          ? 'bg-neon-blue/10 border-neon-blue/40 shadow-[0_0_16px_rgba(0,240,255,0.25),inset_0_0_12px_rgba(0,240,255,0.08)]'
          : 'bg-transparent border-transparent group-hover:bg-neon-blue/8 group-hover:border-neon-blue/25 group-hover:shadow-[0_0_14px_rgba(0,240,255,0.18),inset_0_0_8px_rgba(0,240,255,0.06)]'
        }
      `}
    />

    {/* Soft glow bloom beneath — expands on hover */}
    <span
      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 120%, rgba(0,240,255,0.18) 0%, transparent 70%)',
        filter: 'blur(6px)',
      }}
    />

    {/* Top layer — slides up and out on hover */}
    <span
      className={`relative block transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[110%] group-hover:opacity-0 ${isActive ? 'text-neon-blue' : 'text-gray-300'
        }`}
      style={{ lineHeight: 1 }}
    >
      {children}
    </span>

    {/* Bottom layer — rises from below on hover */}
    <span
      className="absolute inset-0 flex items-center justify-center text-neon-blue translate-y-[110%] opacity-0 transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none"
      style={{ lineHeight: 1, textShadow: '0 0 12px rgba(0,240,255,0.8), 0 0 28px rgba(0,240,255,0.4)' }}
      aria-hidden="true"
    >
      {children}
    </span>
  </Link>
);

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const leftLinks = [
    { name: 'Memberships', path: '/memberships' },
    { name: 'Training', path: '/personal-training' },
    { name: 'Classes', path: '/classes' },
  ];

  const rightLinks = [
    { name: 'Tools', path: '/tools' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-700 ${scrolled ? 'pt-4' : 'pt-6'
          }`}
      >
        {/* Ambient glow bloom behind the nav */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[120px]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.13) 0%, rgba(0,180,255,0.06) 45%, transparent 75%)',
            filter: 'blur(18px)',
          }}
        />

        <div
          className={`relative flex items-center justify-between px-8 py-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
            ? 'w-[90%] md:w-[85%] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,240,255,0.06),inset_0_1px_0_rgba(255,255,255,0.06)]'
            : 'w-full bg-transparent border-transparent'
            }`}
        >
          {/* Subtle inner glow line at top of pill when scrolled */}
          {scrolled && (
            <div
              className="pointer-events-none absolute top-0 left-[10%] right-[10%] h-px rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(0,240,255,0.35), rgba(0,240,255,0.18), transparent)',
                filter: 'blur(1px)',
              }}
            />
          )}

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-1 transition-colors duration-300 hover:text-neon-blue"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Left links */}
          <div className="hidden lg:flex items-center gap-2 flex-1 justify-start pl-2">
            {leftLinks.map((link) => (
              <RollLink key={link.name} to={link.path} isActive={isActive(link.path)}>
                {link.name}
              </RollLink>
            ))}
          </div>

          {/* Center logo – spacing/scale fixed */}
          <Link
            to="/"
            className="flex items-center gap-4 group relative z-10 flex-shrink-0 mx-auto"
          >
            <div
              className="
                relative w-11 h-11 flex items-center justify-center
                overflow-hidden rounded-full
                transition-transform duration-700
                ease-[cubic-bezier(0.34,1.56,0.64,1)]
                group-hover:rotate-[360deg] group-hover:scale-105
              "
            >
              {/* Animated glow */}
              <div className="absolute inset-0 bg-neon-blue rounded-full blur-lg opacity-30 group-hover:opacity-80 group-hover:blur-2xl transition-all duration-500" />
              {/* Ring */}
              <div className="absolute inset-[3px] border border-neon-blue/40 rounded-full scale-0 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <Dumbbell className="w-7 h-7 text-white relative z-10 group-hover:text-neon-blue transition-colors duration-500" />
            </div>

            <div className="flex flex-col items-start">
              <span className="font-heading font-black text-[1.7rem] leading-none tracking-tight text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:text-neon-blue transition-colors duration-300">
                FITNESS
              </span>
              <span className="font-sans text-[9px] tracking-[0.55em] text-neon-orange uppercase font-bold mt-[2px] group-hover:tracking-[0.7em] transition-all duration-500">
                LANKA
              </span>
            </div>
          </Link>

          {/* Right links + Join Now */}
          <div className="hidden lg:flex items-center gap-2 flex-1 justify-end pr-2">
            {rightLinks.map((link) => (
              <RollLink key={link.name} to={link.path} isActive={isActive(link.path)}>
                {link.name}
              </RollLink>
            ))}

            {/* Join Now — original styling + glow */}
            <a
              href="https://wa.me/94770000000"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative inline-flex items-center justify-center
                ml-3 px-7 py-3 rounded-full font-heading font-bold uppercase
                text-[11px] tracking-[0.28em] text-black
                bg-gradient-to-r from-neon-blue to-neon-orange
                shadow-[0_0_18px_rgba(0,240,255,0.45),0_0_40px_rgba(0,240,255,0.18),0_14px_35px_rgba(0,0,0,0.7)]
                hover:shadow-[0_0_28px_rgba(0,240,255,0.7),0_0_60px_rgba(0,240,255,0.28),0_20px_50px_rgba(0,0,0,0.9)]
                transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                hover:-translate-y-[1px]
                overflow-hidden
              "
            >
              {/* Outer glow bloom */}
              <span
                className="pointer-events-none absolute -inset-2 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(ellipse, rgba(0,240,255,0.35) 0%, rgba(0,180,255,0.15) 45%, transparent 70%)',
                  filter: 'blur(10px)',
                }}
              />
              <span className="pointer-events-none absolute inset-[1px] rounded-full bg-black/10 mix-blend-soft-light opacity-70" />
              <span className="pointer-events-none absolute inset-0 rounded-full border border-white/20 group-hover:border-white/50 transition-colors duration-300" />
              {/* Light sweep */}
              <span className="pointer-events-none absolute -left-1/3 top-0 w-1/2 h-full bg-gradient-to-r from-white/40 via-white/5 to-transparent opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-[260%] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <span className="relative z-10">Join Now</span>
            </a>
          </div>

          {/* Mobile spacer */}
          <div className="lg:hidden w-8" />
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-3xl transition-all duration-700 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-blue/10 rounded-full blur-[100px] animate-blob" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-orange/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        </div>

        <div className="relative flex flex-col items-center gap-2">
          {[...leftLinks, ...rightLinks, { name: 'Home', path: '/' }].map((link, i) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="group relative inline-flex items-center justify-center py-3 px-6 overflow-hidden"
              style={{
                transitionDelay: isOpen ? `${i * 55}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
                transition:
                  'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
              }}
            >
              <span
                className="relative block overflow-hidden font-heading text-4xl font-black text-white uppercase"
                style={{ lineHeight: 1.1 }}
              >
                <span className="block transition-all duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  {link.name}
                </span>
                <span
                  className="absolute inset-0 flex items-center justify-center text-neon-blue translate-y-full group-hover:translate-y-0 transition-all duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  aria-hidden="true"
                >
                  {link.name}
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile CTA — original styling */}
        <a
          href="https://wa.me/94770000000"
          className="
            group relative inline-flex items-center justify-center
            mt-8 px-12 py-4 rounded-full font-heading font-bold text-xl uppercase
            tracking-[0.25em] text-black
            bg-gradient-to-r from-neon-blue to-neon-orange
            shadow-[0_0_32px_rgba(0,240,255,0.6)]
            overflow-hidden
            transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            hover:-translate-y-[2px] hover:shadow-[0_24px_60px_rgba(0,0,0,0.9)]
          "
          style={{
            transitionDelay: isOpen ? '400ms' : '0ms',
            transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: isOpen ? 1 : 0,
            transition:
              'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s.ease',
          }}
        >
          <span className="pointer-events-none absolute inset-[1px] rounded-full bg-black/15 mix-blend-soft-light opacity-80" />
          <span className="pointer-events-none absolute -left-1/3 top-0 w-1/2 h-full bg-gradient-to-r from-white/40 via-white/5 to-transparent opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-[260%] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          <span className="relative z-10">Join via WhatsApp</span>
        </a>

        {/* Ardeno Studio credit in mobile overlay — typographic refinement */}
        <div
          className="absolute bottom-12 flex flex-col items-center gap-1.5"
          style={{
            transitionDelay: isOpen ? '500ms' : '0ms',
            transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
            opacity: isOpen ? 0.4 : 0,
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
          }}
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent mb-2" />
          <div className="flex flex-col items-center leading-none">
            <span className="text-[8px] font-sans uppercase tracking-[0.4em] text-white/20 mb-1">Crafted by</span>
            <span className="font-heading text-xl tracking-tight text-white/60">
              Ardeno <span className="text-neon-blue/50 italic">Studio</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};