import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, MapPin, Clipboard, Microscope, ChevronDown } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

gsap.registerPlugin(ScrollTrigger);

const WAVE_PATH = "M0,60 L50,60 L60,30 L70,90 L80,20 L90,100 L100,60 L200,60 L210,40 L220,80 L230,60 L350,60 L360,35 L370,85 L380,25 L390,95 L400,60 L800,60";

const statItems = [
  { icon: Users, value: 400, label: "Target Participants", sub: "Community members, Ilorin West LGA" },
  { icon: MapPin, value: 6, suffix: "+", label: "Active Study Sites", sub: "PHCs, Hospitals, Mosques, Markets" },
  { icon: Clipboard, value: 39, label: "Questionnaire Items", sub: "Across 7 KAP domains" },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const panelRef = useRef(null);
  const statRefs = useRef([]);
  const headlineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin hero and fade on scroll
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (leftRef.current) {
            gsap.set(leftRef.current, {
              y: -80 * p,
              opacity: 1 - 0.7 * p,
            });
          }
          if (panelRef.current) {
            gsap.set(panelRef.current, {
              y: -40 * p,
              opacity: 1 - 0.5 * p,
            });
          }
        },
      });

      // Headline text reveal
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.03,
            delay: 0.3,
          }
        );
      }

      // Stat count-up
      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = statItems[i].value;
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                if (el) el.textContent = Math.round(obj.val) + (statItems[i].suffix || "");
              },
            });
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Split text into characters
  const renderChars = (text, lineIndex) => {
    const words = text.split(" ");
    let charGlobalIndex = 0;
    return words.map((word, wi) => (
      <span key={wi} style={{ display: "inline-block", whiteSpace: "pre" }}>
        {word.split("").map((char, ci) => {
          const idx = charGlobalIndex++;
          return (
            <span
              key={ci}
              className="char"
              style={{
                display: "inline-block",
                opacity: 0,
                animationDelay: `calc(${lineIndex} * 0.15s + ${idx} * 0.04s)`,
              }}
            >
              {char}
            </span>
          );
        })}
        {wi < words.length - 1 && (
          <span className="char" style={{ display: "inline-block", opacity: 0 }}>&nbsp;</span>
        )}
      </span>
    ));
  };

  const handleExploreClick = () => {
    const el = document.querySelector("#disease");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleParticipateClick = () => {
    const el = document.querySelector("#participate");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] bg-navy overflow-hidden flex items-center"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25 z-[1]"
      >
        <source src="/videos/atp.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.75) 50%, rgba(15,45,92,0.6) 100%)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: Math.random() > 0.5 ? "#3b82f6" : "#2563eb",
              opacity: 0.1 + Math.random() * 0.2,
              animationDuration: `${6 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Waveform container */}
      <div className="absolute inset-0 z-[3] flex flex-col justify-center pl-[10vw] pointer-events-none">
        {[
          { top: "calc(50% - 100px)", stroke: "#3b82f6", opacity: 0.7, delay: "0s" },
          { top: "calc(50% - 60px)", stroke: "#2563eb", opacity: 0.4, delay: "0.6s" },
          { top: "calc(50% - 20px)", stroke: "#1a4a8a", opacity: 0.25, delay: "1.2s" },
          { top: "calc(50% + 20px)", stroke: "#2563eb", opacity: 0.35, delay: "0.3s" },
          { top: "calc(50% + 60px)", stroke: "#3b82f6", opacity: 0.15, delay: "1.8s" },
        ].map((cfg, i) => (
          <svg
            key={i}
            className="waveform absolute"
            style={{
              top: cfg.top,
              opacity: cfg.opacity,
              filter: i === 0 ? "drop-shadow(0 0 4px rgba(59,130,246,0.4))" : "none",
            }}
            viewBox="0 0 800 120"
          >
            <path
              d={WAVE_PATH}
              stroke={cfg.stroke}
              style={{ animationDelay: cfg.delay }}
            />
          </svg>
        ))}
      </div>

      {/* Scan line */}
      <div className="absolute top-0 h-full w-[2px] z-[4] pointer-events-none animate-scan"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.3), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left column */}
          <div ref={leftRef}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.08] border border-gold/40 mb-8">
              <span className="w-2 h-2 rounded-full bg-gold animate-gold-pulse" />
              <Microscope className="w-4 h-4 text-gold" />
              <span className="text-[13px] text-white/70 font-body">
                Epidemiological Study &middot; Ilorin West LGA, Kwara State
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-display text-[32px] sm:text-[40px] lg:text-[56px] leading-[1.1] mb-6 opacity-reveal-animated"
            >
              <span className="block text-white">
                {renderChars("Diphtheria is", 0)}
              </span>
              <span className="block headline-gold">
                {renderChars("Re-emerging.", 1)}
              </span>
              <span className="block text-white">
                {renderChars("We're Studying Why.", 2)}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-[17px] text-white/65 font-body max-w-[480px] mb-4">
              A community-based KAP study investigating DPT vaccine knowledge,
              attitudes, and practices across Kwara State — to build the evidence
              that protects lives.
            </p>

            {/* Meta line */}
            <p className="text-[13px] text-white/40 font-body mb-8">
              400 Target Participants &middot; Ilorin West LGA &middot; Ethical clearance obtained
              &middot; Affiliated with Lifinity Ltd.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleExploreClick}
                className="px-7 py-3 bg-sky-blue text-white font-medium rounded-lg hover:bg-mid-blue transition-all hover:-translate-y-0.5"
              >
                Explore the Research
              </button>
              <button
                onClick={handleParticipateClick}
                className="px-7 py-3 border border-white/40 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
              >
                Participate in the Study
              </button>
            </div>
          </div>

          {/* Right column — Clinical Data Panel */}
          <div ref={panelRef} className="hidden lg:block">
            <div className="bg-deep-blue/60 backdrop-blur-2xl border border-sky-blue/15 rounded-2xl p-8">
              <span className="gold-label">Study at a Glance</span>

              <div className="mt-6 space-y-8">
                {statItems.map((stat, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <stat.icon className="w-5 h-5 text-sky-blue mt-1 flex-shrink-0" />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span
                          ref={(el) => { statRefs.current[i] = el; }}
                          className="font-mono text-[28px] font-bold text-white"
                        >
                          0
                        </span>
                        <span className="text-sm font-medium text-white">
                          {stat.label}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 mt-0.5">{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Separator */}
              <div className="my-6 h-px bg-white/10" />

              {/* Disease alert */}
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-[13px] text-white/80">
                    Diphtheria outbreak active in Nigeria since 2022
                  </p>
                  <p className="text-[11px] text-white/40 mt-1">
                    Kwara State confirmed as affected region &middot; NCDC Alert
                  </p>
                </div>
              </div>

              {/* Phase pips */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-white/50 mb-3">
                  Phase 5 of 7 &middot; Data Collection Active
                </p>
                <div className="flex gap-2">
                  {[...Array(7)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < 5 ? "bg-sky-blue" : "bg-white/20 border border-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="relative w-px h-10 bg-white/20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-white/50 animate-scroll-line" />
        </div>
        <span className="text-[11px] text-white/30 font-body">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 text-white/30 animate-bounce" />
      </div>
    </section>
  );
}
