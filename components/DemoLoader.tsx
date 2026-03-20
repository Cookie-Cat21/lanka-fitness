import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";

// ── Shared Ardeno Styles ──────────────────────────────────────────────────────
const ARDENO_STYLES = `
  @keyframes avl-breathe {
    0%,100% { opacity:0.3; transform:scale(1); filter: blur(20px); }
    50%      { opacity:0.6;  transform:scale(1.15); filter: blur(30px); }
  }
  @keyframes avl-drawPath {
    from { stroke-dashoffset: 2000; filter: drop-shadow(0 0 2px rgba(0,240,255,0)); }
    to   { stroke-dashoffset: 0; filter: drop-shadow(0 0 12px rgba(0,240,255,0.6)); }
  }
  @keyframes avl-fillFade {
    from { opacity: 0; filter: blur(4px); transform: scale(0.95); }
    to   { opacity: 1; filter: blur(0px); transform: scale(1); }
  }
  @keyframes avl-charIn {
    from { opacity:0; transform: translateY(20px) scale(1.15); filter:blur(12px) brightness(2); letter-spacing: 0.05em; }
    to   { opacity:1; transform: translateY(0) scale(1); filter:blur(0) brightness(1);  letter-spacing: 0.18em; }
  }
  @keyframes avl-charInUp {
    from { opacity:0; transform: translateY(15px) scale(0.9); filter:blur(8px); }
    to   { opacity:1; transform: translateY(0) scale(1); filter:blur(0); }
  }
  @keyframes avl-crownReveal {
    from { opacity:0; transform:translateY(-20px) scale(0.9); filter: blur(10px); }
    to   { opacity:1; transform:translateY(0) scale(1); filter: blur(0px); }
  }
  @keyframes avl-fadeInPhase {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes avl-fadeOutPhase {
    from { opacity:1; transform:scale(1); filter: blur(0px); }
    to   { opacity:0; transform:scale(1.05); filter: blur(14px); }
  }
  @keyframes avl-flashBlue {
    0%   { opacity:0; }
    40%  { opacity:1; filter: blur(10px); }
    100% { opacity:0; filter: blur(0px); }
  }
  .glass-overlay {
    backdrop-filter: blur(8px);
    background: radial-gradient(circle at 50% 50%, rgba(10,5,5,0.4) 0%, rgba(0,0,0,0.9) 100%);
  }
`;

const A_MARK_PATH =
  "M 514.300781 878.699219 L 434.792969 718.777344 " +
  "C 411.382812 739.714844 390.78125 776.453125 391.929688 806.554688 " +
  "L 415.984375 853.996094 " +
  "C 416.851562 855.699219 418.324219 857.015625 420.113281 857.679688 " +
  "L 504.851562 889.203125 " +
  "C 511.304688 891.605469 517.367188 884.867188 514.300781 878.699219 Z " +
  "M 371.617188 791.304688 " +
  "C 371.410156 791.605469 371.222656 791.925781 371.054688 792.265625 " +
  "L 340.871094 853.445312 " +
  "C 340.011719 855.183594 338.523438 856.527344 336.707031 857.207031 " +
  "L 250.40625 889.308594 " +
  "C 243.988281 891.699219 237.9375 885.042969 240.917969 878.878906 " +
  "L 369.019531 614.007812 " +
  "C 371.769531 608.324219 379.851562 608.277344 382.664062 613.929688 " +
  "L 432.074219 713.316406 " +
  "C 404.980469 732.679688 383.765625 759.746094 371.617188 791.304688";

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E" +
  "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' " +
  "numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E" +
  "%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const FULL_COVER: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%" };
const CENTER_FLEX: React.CSSProperties = { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" };

// ── Particle canvas hook ───────────────────────────────────────────────────
function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number; r: number; alpha: number; red: boolean }[]
  >([]);
  const frameRef = useRef<number>();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = canvas.offsetWidth || 600;
      canvas.height = canvas.offsetHeight || 480;
    };
    resize();
    window.addEventListener("resize", resize);
    const W = () => canvas.width;
    const H = () => canvas.height;
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 55; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.25 + 0.05,
          red: Math.random() > 0.85,
        });
      }
    }
    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      const vg = ctx.createRadialGradient(w / 2, h / 2, h * 0.1, w / 2, h / 2, h * 0.75);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.75)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);
      const pts = particlesRef.current;
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.red ? "#E82020" : "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 80) * 0.07;
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current!);
      window.removeEventListener("resize", resize);
    };
  }, []);
}

// ── Ardeno Components ─────────────────────────────────────────────────────────
const SvgDefs = memo(() => (
  <defs>
    <linearGradient id="avl-aGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#80f8ff" />
      <stop offset="50%" stopColor="#00f0ff" />
      <stop offset="100%" stopColor="#00c0cc" />
    </linearGradient>
    <linearGradient id="avl-aStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#b4faff" />
      <stop offset="100%" stopColor="#00f0ff" />
    </linearGradient>
    <filter id="avl-aGlow">
      <feGaussianBlur stdDeviation="8" result="g" />
      <feMerge>
        <feMergeNode in="g" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
));
SvgDefs.displayName = "SvgDefs";

const StaggerWord = memo<{ text: string; baseDelay: number; charStyle: React.CSSProperties; animName?: string }>(
  ({ text, baseDelay, charStyle, animName = "avl-charIn" }) => (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            ...charStyle,
            display: "inline-block",
            opacity: 0,
            animation: `${animName} 0.7s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * 0.06}s forwards`,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  )
);
StaggerWord.displayName = "StaggerWord";

const ArdenoPhase = memo<{ exiting: boolean; flashBlue: boolean; progress: number }>(({ exiting, flashBlue, progress }) => (
  <div
    className="glass-overlay"
    style={{
      ...FULL_COVER,
      animation: exiting ? "avl-fadeOutPhase 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "avl-fadeInPhase 1s ease-out forwards",
      zIndex: 3,
      perspective: "1000px"
    }}
  >
    <div style={{ ...FULL_COVER, backgroundImage: GRAIN_BG, opacity: 0.04, mixBlendMode: "overlay", pointerEvents: "none" }} />
    <div style={{ ...FULL_COVER, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none" }} />
    <div style={{ ...FULL_COVER, background: "radial-gradient(circle at 50% 45%, rgba(0,240,255,0.15) 0%, transparent 50%)", animation: "avl-breathe 5s ease-in-out infinite", pointerEvents: "none" }} />
    <div style={CENTER_FLEX}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, position: "relative", zIndex: 2, transform: "translateY(-4vh)" }}>
        <div style={{ width: 80, height: 80, marginBottom: 8, opacity: 0, animation: "avl-crownReveal 1.4s cubic-bezier(0.16,1,0.3,1) 0.1s forwards" }}>
          <svg viewBox="200 580 360 340" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            <SvgDefs />
            <path d={A_MARK_PATH} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <path d={A_MARK_PATH} fill="none" stroke="url(#avl-aStroke)" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: 2000, animation: "avl-drawPath 2.2s cubic-bezier(0.2,1,0.4,1) 0.4s forwards" }} />
            <path d={A_MARK_PATH} fill="url(#avl-aGrad)" filter="url(#avl-aGlow)" style={{ opacity: 0, transformOrigin: "center", animation: "avl-fillFade 1.4s cubic-bezier(0.16,1,0.3,1) 1.8s forwards" }} />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <StaggerWord text="ARDENO" baseDelay={0.8} charStyle={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 8vw, 34px)", fontWeight: 600, color: "#ffffff", textShadow: "0 0 16px rgba(255,255,255,0.3)", letterSpacing: "0.18em" }} />
          <StaggerWord text="STUDIO" baseDelay={1.4} charStyle={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px, 4vw, 15px)", fontWeight: 300, fontStyle: "italic", color: "rgba(0,240,255,0.8)", letterSpacing: "0.5em", textShadow: "0 0 12px rgba(0,240,255,0.4)" }} animName="avl-charInUp" />
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", width: 280, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>{progress < 100 ? "LOADING" : "INITIALIZING"}</p>
      <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.08)", overflow: "hidden", position: "relative" }}>
        <motion.div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, transparent, #00f0ff)", transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: progress / 100 }} transition={{ ease: "easeOut", duration: 0.1 }} />
      </div>
    </div>
    {flashBlue && <div style={{ ...FULL_COVER, background: "radial-gradient(circle at 50% 50%, rgba(0,240,255,0.18) 0%, transparent 80%)", animation: "avl-flashBlue 0.6s cubic-bezier(0.16,1,0.3,1) forwards", pointerEvents: "none", zIndex: 10 }} />}
  </div>
));
ArdenoPhase.displayName = "ArdenoPhase";

// ── DemoLoader — Lanka Fitness branded ────────────────────────────────────
const DemoLoader: React.FC<{ onComplete?: () => void; demoName?: string; demoLogoUrl?: string }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"ardeno" | "demo" | "done">("ardeno");
  const [ardenoExiting, setArdenoExiting] = useState(false);
  const [demoExiting, setDemoExiting] = useState(false);
  const [flashBlue, setFlashBlue] = useState(false);
  const [progress, setProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [slashIn, setSlashIn] = useState<boolean[]>(Array(9).fill(false));
  const [wordmarkIn, setWordmarkIn] = useState(false);
  const [fillReveal, setFillReveal] = useState(false);
  
  const rafRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useParticleCanvas(canvasRef);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "avl-keyframes";
    style.textContent = ARDENO_STYLES;
    document.head.appendChild(style);

    // Progress bar
    const start = Date.now();
    const duration = 2400;
    const tick = () => {
      const raw = Math.min(((Date.now() - start) / duration) * 100, 100);
      setProgress(Math.round(raw));
      if (raw < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Sequence
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setFlashBlue(true), 2800));
    timers.push(setTimeout(() => setArdenoExiting(true), 2900));
    timers.push(setTimeout(() => setPhase("demo"), 3300));

    // Phase 2 (Demo)
    const demoRevealTime = 3300;
    timers.push(setTimeout(() => {
       // Start gym animations
       Array.from({ length: 9 }).forEach((_, i) =>
         timers.push(setTimeout(() => setSlashIn((prev) => { const n = [...prev]; n[i] = true; return n; }), i * 100 + 60))
       );
       timers.push(setTimeout(() => setWordmarkIn(true), 500));
       timers.push(setTimeout(() => setFillReveal(true), 700));
    }, demoRevealTime));

    const demoDuration = 3200;
    timers.push(setTimeout(() => setDemoExiting(true), demoRevealTime + demoDuration - 600));
    timers.push(setTimeout(() => {
      setPhase("done");
      onCompleteRef.current?.();
    }, demoRevealTime + demoDuration));

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(rafRef.current);
      style.remove();
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden", background: "#050303" }}>
      {phase === "ardeno" && <ArdenoPhase exiting={ardenoExiting} flashBlue={flashBlue} progress={progress} />}
      
      {phase === "demo" && (
        <div style={{
          ...s.root,
          animation: demoExiting ? "phase-fadeOut 0.6s ease forwards" : "phase-fadeIn 0.8s ease forwards",
        }}>
          <canvas ref={canvasRef} style={s.canvas} />
          <div style={s.glow} />
          <div style={s.content}>
            <div style={s.slashGroup}>
              {slashIn.map((visible, i) => (
                <div
                  key={i}
                  style={{
                    ...s.slash,
                    left: `${i * 14}px`,
                    background: visible
                      ? i % 2 === 0 ? "#00f0ff" : "#FFFFFF"
                      : "rgba(255,255,255,0.06)",
                    transform: `skewX(-18deg) scaleY(${visible ? 1 : 0})`,
                    boxShadow:
                      visible && i % 2 === 0
                        ? "0 0 10px rgba(0,240,255,0.6), 0 0 20px rgba(0,240,255,0.2)"
                        : "none",
                    transition: `transform 0.42s cubic-bezier(0.22,1,0.36,1) ${i * 35}ms, background 0.2s`,
                  }}
                />
              ))}
            </div>

            <div style={{
              ...s.wordmark,
              opacity: wordmarkIn ? 1 : 0,
              transform: wordmarkIn ? "translateY(0)" : "translateY(12px)",
            }}>
              <div style={s.fitnessOuter}>
                <span style={s.fitnessStroke}>FITNESS</span>
                <span style={{
                  ...s.fitnessFill,
                  clipPath: fillReveal ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                }}>FITNESS</span>
              </div>
              <div style={{ ...s.divider, width: fillReveal ? 180 : 0 }} />
              <div style={{
                ...s.lankaText,
                color: fillReveal ? "rgba(0,240,255,0.9)" : "transparent",
                letterSpacing: fillReveal ? "0.72em" : "0.2em",
              }}>LANKA</div>
            </div>
          </div>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800&display=swap');
            @keyframes pulseGlow {
              0%,100% { opacity:.15; transform:scale(1); }
              50%      { opacity:.22; transform:scale(1.18); }
            }
            @keyframes phase-fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes phase-fadeOut { from { opacity: 1; } to { opacity: 0; } }
          `}</style>
        </div>
      )}
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  root: {
    position: "absolute", inset: 0,
    background: "#050505",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    overflow: "hidden", userSelect: "none",
  },
  canvas: {
    position: "absolute", inset: 0,
    width: "100%", height: "100%",
    pointerEvents: "none",
  },
  glow: {
    position: "absolute",
    width: 500, height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,240,255,0.18) 0%, transparent 65%)",
    animation: "pulseGlow 3s ease-in-out infinite",
    pointerEvents: "none",
    zIndex: 1,
  },
  content: {
    position: "relative", zIndex: 10,
    display: "flex", flexDirection: "column",
    alignItems: "center",
  },
  slashGroup: { position: "relative", width: 132, height: 76, marginBottom: 30 },
  slash: {
    position: "absolute", top: 0,
    width: 8, height: "100%",
    borderRadius: 1,
    transformOrigin: "bottom center",
  },
  wordmark: {
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: 6,
    transition: "opacity 0.55s ease, transform 0.55s ease",
  },
  fitnessOuter: { position: "relative" },
  fitnessStroke: {
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
    fontSize: 58, fontWeight: 800,
    letterSpacing: "0.18em",
    color: "transparent",
    WebkitTextStroke: "1.5px rgba(255,255,255,0.18)",
    textTransform: "uppercase", lineHeight: 1,
    display: "block",
  },
  fitnessFill: {
    position: "absolute", inset: 0,
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
    fontSize: 58, fontWeight: 800,
    letterSpacing: "0.18em",
    color: "#FFFFFF",
    textTransform: "uppercase", lineHeight: 1,
    display: "block",
    transition: "clip-path 1s cubic-bezier(0.76,0,0.24,1) 0.1s",
  },
  divider: {
    height: 1,
    background: "linear-gradient(90deg, transparent, #00f0ff, transparent)",
    transition: "width 0.85s ease 0.1s",
  },
  lankaText: {
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
    fontSize: 12, fontWeight: 600,
    textTransform: "uppercase",
    transition: "color 0.5s ease 0.15s, letter-spacing 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s",
  },
};

export default DemoLoader;

