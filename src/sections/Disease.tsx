import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bug, Wind, HeartPulse, Syringe, Calendar, AlertTriangle } from "lucide-react";
import { diseaseCards, vaccinationSchedule } from "../data/diseaseInfo";

gsap.registerPlugin(ScrollTrigger);

const iconMap = { Bug, Wind, HeartPulse, Syringe, Calendar, AlertTriangle };

export default function Disease() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const tableRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade-up
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

      // Cards stagger
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
          }
        );
      }

      // Table bars animation
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const fill = vaccinationSchedule[i]?.fill || 0;
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${fill}%`,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: tableRef.current, start: "top 80%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="disease"
      ref={sectionRef}
      className="w-full py-20 bg-off-white"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div data-header className="text-center max-w-[700px] mx-auto mb-14">
          <span className="gold-label">THE DISEASE</span>
          <h2 className="font-display text-[26px] sm:text-[32px] lg:text-[40px] text-royal-blue leading-[1.2] mt-3">
            What Every Community Must Know About Diphtheria
          </h2>
          <p className="text-base text-text-mid font-body mt-4">
            Diphtheria is not a disease of the past. It is actively claiming lives
            in Nigerian communities today. Understanding it is the first step to stopping it.
          </p>
        </div>

        {/* Six Clinical Info Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {diseaseCards.map((card, i) => {
            const IconComp = iconMap[card.icon];
            return (
              <div key={i} className="clinical-card">
                <div className="flex items-center gap-3 mb-3">
                  {IconComp && <IconComp className="w-6 h-6 text-royal-blue" />}
                  <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                    {card.title.split(" ")[0] === "DPT" ? "THE VACCINE" :
                     card.title.split(" ")[0] === "Nigeria" ? "SCHEDULE" :
                     card.title.split(" ")[0] === "Re-emergence" ? "OUTBREAK" :
                     card.title.split(" ")[0].toUpperCase()}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-royal-blue mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-text-mid font-body leading-relaxed">
                  {card.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Vaccination Schedule Table */}
        <div
          ref={tableRef}
          className="mt-12 bg-navy rounded-2xl p-6 sm:p-8"
        >
          <h3 className="font-display text-xl text-white mb-6">
            Official DPT Vaccination Schedule — Nigeria EPI Programme
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-white/50 uppercase tracking-wider border-b border-white/10">
                  <th className="pb-3 pr-4 font-medium">Dose</th>
                  <th className="pb-3 pr-4 font-medium">Age</th>
                  <th className="pb-3 pr-4 font-medium">Vaccine</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {vaccinationSchedule.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="py-4 pr-4 text-sm text-white font-medium">
                      {row.dose}
                    </td>
                    <td className="py-4 pr-4 text-sm text-white/70">
                      {row.age}
                    </td>
                    <td className="py-4 pr-4 text-sm text-white/70">
                      {row.vaccine}
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-sky-blue/20 text-sky-blue">
                        {row.type}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="w-[120px] h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          ref={(el) => { barsRef.current[i] = el; }}
                          className="h-full rounded-full bg-sky-blue"
                          style={{ width: "0%" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-white/50 mt-4">
            All vaccines free at government PHCs &middot; Catch-up available
          </p>
        </div>
      </div>
    </section>
  );
}
