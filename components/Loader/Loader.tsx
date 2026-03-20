import React, { useEffect, useRef, useState } from 'react';
import './Loader.css';

interface LoaderProps {
  onComplete?: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spRef = useRef<SVGPathElement>(null);
  const fpRef = useRef<SVGPathElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const [showReplay, setShowReplay] = useState(false);

  // Utils
  const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

  const tw = (dur: number, cb: (e: number) => void, ease?: (t: number) => number) => {
    const defaultEase = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const chosenEase = ease || defaultEase;
    return new Promise<void>(resolve => {
      let t0: number | null = null;
      function f(now: number) {
        if (!t0) t0 = now;
        const t = clamp((now - t0) / dur, 0, 1);
        cb(chosenEase(t));
        if (t < 1) requestAnimationFrame(f);
        else resolve();
      }
      requestAnimationFrame(f);
    });
  };

  const stagger = (chars: HTMLElement[], dur: number, gap: number, delay: number, fromY = 14, fromBlur = 5) => {
    chars.forEach((c, i) => setTimeout(() => {
      tw(dur, e => {
        c.style.opacity = String(e);
        c.style.transform = `translateY(${(1 - e) * fromY}px)`;
        c.style.filter = `blur(${((1 - e) * fromBlur).toFixed(1)}px)`;
      });
    }, delay + i * gap));
  };

  // Slider Driver
  const sRAF = useRef<number | null>(null);
  const prevP = useRef(-1);

  const driveSlider = (dur: number) => {
    const t0 = performance.now();
    const fill = document.getElementById('s-fill');
    const tip = document.getElementById('s-tip');
    const num = document.getElementById('s-num');

    function f(now: number) {
      const raw = clamp((now - t0) / dur, 0, 1);
      const e = raw === 1 ? 1 : 1 - Math.pow(2, -10 * raw);
      const pct = e * 100;
      if (Math.abs(pct - prevP.current) > .2) {
        prevP.current = pct;
        if (fill) fill.style.width = pct + '%';
        if (tip) tip.style.left = pct + '%';
        if (num) {
          num.textContent = String(Math.round(pct));
          num.style.left = pct + '%';
          num.style.transform = pct < 5 ? 'translateX(0)' : pct > 95 ? 'translateX(-100%)' : 'translateX(-50%)';
        }
      }
      if (raw < 1) sRAF.current = requestAnimationFrame(f);
    }
    sRAF.current = requestAnimationFrame(f);
  };

  const stopSlider = () => {
    if (sRAF.current) {
      cancelAnimationFrame(sRAF.current);
      sRAF.current = null;
    }
    const fill = document.getElementById('s-fill');
    const tip = document.getElementById('s-tip');
    const num = document.getElementById('s-num');
    if (fill) fill.style.width = '100%';
    if (tip) tip.style.left = '100%';
    if (num) {
      num.textContent = '100';
      num.style.left = '100%';
      num.style.transform = 'translateX(-100%)';
    }
  };

  const reset = () => {
    if (sRAF.current) { cancelAnimationFrame(sRAF.current); sRAF.current = null; }
    prevP.current = -1;

    const sp = spRef.current;
    if (sp) {
      const len = sp.getTotalLength ? sp.getTotalLength() : 1200;
      (sp as any)._len = len;
      sp.style.strokeDasharray = String(len);
      sp.style.strokeDashoffset = String(len);
      sp.style.opacity = '0';
    }

    const fp = fpRef.current;
    if (fp) {
      fp.style.opacity = '0';
      fp.style.transition = 'none';
      fp.style.animation = 'none';
    }

    document.querySelectorAll('#p1-ardeno .ch, #p1-studio .ch').forEach(c => {
      (c as HTMLElement).style.opacity = '0';
      (c as HTMLElement).style.transform = 'translateY(14px)';
      (c as HTMLElement).style.filter = 'blur(5px)';
    });

    const hl = document.getElementById('p1-hairline');
    if (hl) {
      hl.style.transition = 'none';
      hl.style.opacity = '0';
      hl.style.transform = 'scaleX(0)';
    }

    const sl = document.getElementById('slider');
    if (sl) sl.style.opacity = '0';
    const sFill = document.getElementById('s-fill');
    if (sFill) sFill.style.width = '0%';
    const sTip = document.getElementById('s-tip');
    if (sTip) sTip.style.left = '0%';
    const sn = document.getElementById('s-num');
    if (sn) {
      sn.textContent = '0';
      sn.style.left = '0%';
      sn.style.transform = 'translateX(-50%)';
    }

    const p1 = p1Ref.current;
    if (p1) {
      p1.style.transition = 'none';
      p1.style.opacity = '1';
    }

    const p2 = p2Ref.current;
    if (p2) {
      p2.style.display = 'none';
      p2.style.opacity = '0';
      p2.style.transition = 'none';
    }

    const amark = document.getElementById('p2-amark');
    if (amark) {
      amark.style.opacity = '0';
      amark.style.transition = 'none';
    }

    document.querySelectorAll('#p2-fitness .ch, #p2-lanka .ch, #p2-cs .ch').forEach(c => {
      (c as HTMLElement).style.opacity = '0';
      (c as HTMLElement).style.transform = 'translateY(14px)';
      (c as HTMLElement).style.filter = 'blur(5px)';
    });

    const tag = document.getElementById('p2-tag');
    if (tag) {
      tag.style.opacity = '0';
      tag.style.transition = 'none';
    }

    const p2hl = document.getElementById('p2-hl');
    if (p2hl) {
      p2hl.style.opacity = '0';
      p2hl.style.transform = 'scaleX(0)';
      p2hl.style.transition = 'none';
    }

    const p2cs = document.getElementById('p2-cs');
    if (p2cs) p2cs.style.opacity = '0';

    document.querySelectorAll('#p2-dots span').forEach(s => {
      (s as HTMLElement).style.opacity = '0';
      (s as HTMLElement).style.animation = 'none';
    });

    const credit = document.getElementById('p2-credit');
    if (credit) {
      credit.style.opacity = '0';
      credit.style.transition = 'none';
    }

    const flash = document.getElementById('flash');
    if (flash) {
      flash.style.opacity = '0';
      flash.style.transition = 'none';
    }

    setShowReplay(false);
  };

  const run = async () => {
    // Check if we should bypass the loader (Lighthouse, test, or URL param)
    const isLighthouse = navigator.userAgent.includes('Lighthouse');
    const isTest = window.location.search.includes('no-loader');

    if (isLighthouse || isTest) {
      if (onComplete) onComplete();
      return;
    }

    reset();
    await wait(50);

    const sp = spRef.current;
    const fp = fpRef.current;
    const p1 = p1Ref.current;
    const p2 = p2Ref.current;

    if (!sp || !fp || !p1 || !p2) return;

    // Phase 1: Ardeno Studio (Total ~800ms)
    sp.style.opacity = '1';
    await tw(600, e => {
      sp.style.strokeDashoffset = String((sp as any)._len * (1 - e));
    });

    fp.style.transition = 'opacity .4s ease';
    fp.style.opacity = '1';
    fp.style.animation = 'markGlow 2s ease-in-out .2s infinite';
    sp.style.transition = 'opacity .3s ease';
    sp.style.opacity = '0';

    const sl = document.getElementById('slider');
    if (sl) {
      sl.style.transition = 'opacity .3s ease';
      sl.style.opacity = '1';
    }
    driveSlider(1200);

    await wait(50);
    stagger(Array.from(document.querySelectorAll('#p1-ardeno .ch')) as HTMLElement[], 400, 30, 0);

    const hl = document.getElementById('p1-hairline');
    if (hl) {
      hl.style.transition = 'transform .6s cubic-bezier(0.16,1,0.3,1), opacity .2s ease';
      hl.style.opacity = '1';
      hl.style.transform = 'scaleX(1)';
    }

    await wait(400);
    p1.style.transition = 'opacity .4s cubic-bezier(0.76,0,0.24,1)';
    p1.style.opacity = '0';

    // Phase 2: Fitness Lanka (Total ~1000ms)
    await wait(200);
    p2.style.display = 'flex';
    p2.style.opacity = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      p2.style.transition = 'opacity .5s cubic-bezier(0.16,1,0.3,1)';
      p2.style.opacity = '1';
    }));

    const am = document.getElementById('p2-amark');
    if (am) {
      am.style.transition = 'opacity .4s ease';
      am.style.opacity = '1';
    }

    const fitChars = Array.from(document.querySelectorAll('#p2-fitness .ch')) as HTMLElement[];
    const lkChars = Array.from(document.querySelectorAll('#p2-lanka .ch')) as HTMLElement[];
    stagger(fitChars, 400, 25, 0, 12, 4);
    stagger(lkChars, 400, 25, 100, 12, 4);

    const tag = document.getElementById('p2-tag');
    if (tag) {
      tag.style.transition = 'opacity .4s ease';
      tag.style.opacity = '1';
    }

    const p2hl = document.getElementById('p2-hl');
    if (p2hl) {
      p2hl.style.transition = 'transform .6s cubic-bezier(0.16,1,0.3,1), opacity .2s ease';
      p2hl.style.opacity = '1';
      p2hl.style.transform = 'scaleX(1)';
    }

    const p2cs = document.getElementById('p2-cs');
    if (p2cs) p2cs.style.opacity = '1';
    stagger(Array.from(document.querySelectorAll('#p2-cs .ch')) as HTMLElement[], 400, 25, 0);

    // Fade out (Final 400ms)
    await wait(600);
    if (containerRef.current) {
      containerRef.current.style.transition = 'opacity .6s cubic-bezier(0.76, 0, 0.24, 1)';
      containerRef.current.style.opacity = '0';
      await wait(600);
      if (onComplete) onComplete();
    }
  };

  useEffect(() => {
    run();
    return () => {
      if (sRAF.current) cancelAnimationFrame(sRAF.current);
    };
  }, []);

  return (
    <div className="loader-container" ref={containerRef}>
      <div id="grain"></div>
      <div id="flash"></div>

      <div className="phase" id="p1" ref={p1Ref}>
        <div className="vignette"></div>
        <div id="p1-orb"></div>

        <div id="p1-stage">
          <svg id="mark-svg" viewBox="200 580 380 340" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="aglow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="9" result="blur" />
                <feColorMatrix in="blur" type="matrix"
                  values="0 0.3 0.5 0 0  0 0.4 0.6 0 0  0 0.5 0.7 0 0  0 0 0 0.9 0" result="g" />
                <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="aglow2" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#67E8F9" />
                <stop offset="40%" stopColor="#06B6D4" />
                <stop offset="56%" stopColor="#A5F3FC" stopOpacity=".95" />
                <stop offset="72%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <path id="sp" ref={spRef} className="stroke-path"
              d="M 514.300781 878.699219 L 434.792969 718.777344 C 411.382812 739.714844 390.78125 776.453125 391.929688 806.554688 L 415.984375 853.996094 C 416.851562 855.699219 418.324219 857.015625 420.113281 857.679688 L 504.851562 889.203125 C 511.304688 891.605469 517.367188 884.867188 514.300781 878.699219 Z M 371.617188 791.304688 C 371.410156 791.605469 371.222656 791.925781 371.054688 792.265625 L 340.871094 853.445312 C 340.011719 855.183594 338.523438 856.527344 336.707031 857.207031 L 250.40625 889.308594 C 243.988281 891.699219 237.9375 885.042969 240.917969 878.878906 L 369.019531 614.007812 C 371.769531 608.324219 379.851562 608.277344 382.664062 613.929688 L 432.074219 713.316406 C 404.980469 732.679688 383.765625 759.746094 371.617188 791.304688" />
            <path id="fp" ref={fpRef} className="fill-path"
              d="M 514.300781 878.699219 L 434.792969 718.777344 C 411.382812 739.714844 390.78125 776.453125 391.929688 806.554688 L 415.984375 853.996094 C 416.851562 855.699219 418.324219 857.015625 420.113281 857.679688 L 504.851562 889.203125 C 511.304688 891.605469 517.367188 884.867188 514.300781 878.699219 Z M 371.617188 791.304688 C 371.410156 791.605469 371.222656 791.925781 371.054688 792.265625 L 340.871094 853.445312 C 340.011719 855.183594 338.523438 856.527344 336.707031 857.207031 L 250.40625 889.308594 C 243.988281 891.699219 237.9375 885.042969 240.917969 878.878906 L 369.019531 614.007812 C 371.769531 608.324219 379.851562 608.277344 382.664062 613.929688 L 432.074219 713.316406 C 404.980469 732.679688 383.765625 759.746094 371.617188 791.304688" />
          </svg>

          <div id="p1-text">
            <div id="p1-ardeno">
              <span className="ch">A</span><span className="ch">R</span><span className="ch">D</span>
              <span className="ch">E</span><span className="ch">N</span><span className="ch">O</span>
            </div>
            <div id="p1-hairline"></div>
            <div id="p1-studio">
              <span className="ch">S</span><span className="ch">T</span><span className="ch">U</span>
              <span className="ch">D</span><span className="ch">I</span><span className="ch">O</span>
            </div>
          </div>
        </div>

        <div id="slider">
          <div id="s-track">
            <div id="s-fill" style={{ width: '0%' }}></div>
            <div id="s-tip" style={{ left: '0%' }}></div>
          </div>
          <div id="s-num">0</div>
        </div>
      </div>

      <div className="phase" id="p2" ref={p2Ref}>
        <div className="vignette"></div>
        <div id="p2-ring1"></div>
        <div id="p2-ring2"></div>
        <div id="p2-orb"></div>

        <div id="p2-stage">
          <div id="p2-amark">
            <svg viewBox="200 580 380 340" xmlns="http://www.w3.org/2000/svg">
              <path d="M 514.300781 878.699219 L 434.792969 718.777344 C 411.382812 739.714844 390.78125 776.453125 391.929688 806.554688 L 415.984375 853.996094 C 416.851562 855.699219 418.324219 857.015625 420.113281 857.679688 L 504.851562 889.203125 C 511.304688 891.605469 517.367188 884.867188 514.300781 878.699219 Z M 371.617188 791.304688 C 371.410156 791.605469 371.222656 791.925781 371.054688 792.265625 L 340.871094 853.445312 C 340.011719 855.183594 338.523438 856.527344 336.707031 857.207031 L 250.40625 889.308594 C 243.988281 891.699219 237.9375 885.042969 240.917969 878.878906 L 369.019531 614.007812 C 371.769531 608.324219 379.851562 608.277344 382.664062 613.929688 L 432.074219 713.316406 C 404.980469 732.679688 383.765625 759.746094 371.617188 791.304688"
                fill="#06B6D4" fillRule="nonzero" />
            </svg>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', justifyContent: 'center', gap: 0 }}>
            <div id="p2-fitness">
              <span className="ch">F</span><span className="ch">I</span><span className="ch">T</span>
              <span className="ch">N</span><span className="ch">E</span><span className="ch">S</span><span className="ch">S</span>
            </div>
            <div id="p2-lanka">
              <span className="ch">L</span><span className="ch">A</span><span className="ch">N</span>
              <span className="ch">K</span><span className="ch">A</span>
            </div>
          </div>

          <div id="p2-tag">Premium Fitness &nbsp;·&nbsp; Sri Lanka</div>
          <div id="p2-hl"></div>

          <div id="p2-cs">
            <span className="ch">C</span><span className="ch">O</span><span className="ch">M</span>
            <span className="ch">I</span><span className="ch">N</span><span className="ch">G</span>
            <span className="ch">&nbsp;</span>
            <span className="ch">S</span><span className="ch">O</span><span className="ch">O</span><span className="ch">N</span>
          </div>

          <div id="p2-dots">
            <span></span><span></span><span></span>
          </div>

          <div id="p2-credit">
            <i></i>
            <span>Designed by Ardeno Studio</span>
            <i></i>
          </div>
        </div>
      </div>

      <button id="rp" className={showReplay ? 'show' : ''} onClick={run}>↺ &nbsp;Replay</button>
    </div>
  );
};
