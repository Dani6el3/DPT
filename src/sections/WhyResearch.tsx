import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertTriangle,
  TrendingDown,
  Calendar,
  Shield,
} from "lucide-react";
import { urgencyStats, kapBaseline, barriers } from "../data/diseaseInfo";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  AlertTriangle,
  TrendingDown,
  Calendar,
  Shield,
};

export default function WhyResearch() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const statValueRefs = useRef([]);
  const kapRef = useRef(null);
  const kapBarsRef = useRef([]);
  const barriersRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      const header = sectionRef.current?.querySelector("[data-header]");
      if (header) {
        gsap.fromTo(
          header.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: header, start: "top 85%" },
          }
        );
      }

      // Urgency stat cards
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          }
        );
      }

      // Count-up for stats
      statValueRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = urgencyStats[i];
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: stat.value,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                if (el) {
                  const prefix = stat.prefix || "";
                  const suffix = stat.suffix || "";
                  el.textContent = prefix + Math.round(obj.val) + suffix;
                }
              },
            });
          },
        });
      });

      // KAP bars
      kapBarsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const item = kapBaseline[i];
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${item.value}%`,
            duration: 1,
            ease: "power2.out",
            delay: i * 0.2,
            scrollTrigger: { trigger: kapRef.current, start: "top 80%" },
          }
        );
      });

      // Barriers
      if (barriersRef.current) {
        gsap.fromTo(
          barriersRef.current.children,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: barriersRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative w-full py-20 bg-pale-blue overflow-hidden"
    >
      {/* Medical cross watermark */}
      <svg
        className="absolute -left-[60px] top-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-[0.04] pointer-events-none"
        viewBox="0 0 100 100"
      >
        <path
          d="M40 0 h20 v35 h40 v20 h-40 v45 h-20 v-45 h-40 v-20 h40 z"
          fill="#0a1628"
        />
      </svg>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div data-header className="mb-10">
          <span className="gold-label">THE EVIDENCE GAP</span>
          <h2 className="font-display text-[26px] sm:text-[32px] lg:text-[40px] text-royal-blue leading-[1.2] mt-3">
            Why This Study is Critically Needed Now
          </h2>
          <p className="text-base text-text-mid font-body mt-4 max-w-[700px]">
            Despite a nationally declared diphtheria outbreak, community-level
            data on vaccine knowledge, attitudes, and practices in Kwara State is
            severely limited. Without evidence, interventions remain generic.
            This study changes that.
          </p>
        </div>

        {/* Urgency Stat Cards */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
        >
          {urgencyStats.map((stat, i) => {
            const IconComp = iconMap[stat.icon];
            return (
              <div
                key={i}
                className="bg-white border border-gold rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  {IconComp && <IconComp className="w-5 h-5 text-royal-blue" />}
                </div>
                <span
                  ref={(el) => { statValueRefs.current[i] = el; }}
                  className="font-mono text-[32px] font-bold text-royal-blue block"
                >
                  0
                </span>
                <p className="text-sm text-text-mid font-body mt-2">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Two-column: KAP + Barriers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* KAP Baseline Chart */}
          <div ref={kapRef} className="bg-navy rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-lg text-white">
              Estimated Pre-Study KAP Baseline — Kwara State
            </h3>
            <p className="text-xs text-white/40 mt-1 mb-6">
              Based on available regional immunization and surveillance data
            </p>

            <div className="space-y-6">
              {kapBaseline.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/80">{item.label}</span>
                    <span className="font-mono text-sm text-white">{item.value}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      ref={(el) => { kapBarsRef.current[i] = el; }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color, width: "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-white/30 mt-6">
              Indicative estimates — primary study data will validate these
            </p>
          </div>

          {/* Barriers */}
          <div>
            <h3 className="font-display text-lg text-royal-blue mb-4">
              Identified Barriers to DPT Uptake in Kwara State
            </h3>
            <div ref={barriersRef} className="space-y-3">
              {barriers.map((barrier, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4"
                  style={{ borderLeft: `4px solid ${barrier.color}` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${barrier.color}15`,
                        color: barrier.color,
                      }}
                    >
                      {barrier.severity}
                    </span>
                    <span className="text-sm font-medium text-text-dark">
                      {barrier.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="mt-10 bg-royal-blue/[0.06] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-text-mid font-body">
            Without community-level KAP data, Kwara State cannot design effective,
            targeted interventions. This study is the first step toward evidence-based
            immunization policy for the region.
          </p>
          <a
            href="#research-design"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#research-design")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-shrink-0 px-5 py-2.5 bg-royal-blue text-white text-sm font-medium rounded-lg hover:bg-mid-blue transition-colors"
          >
            See Our Research Approach
          </a>
        </div>
      </div>
    </section>
  );
}
