import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Building2, HeartHandshake, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const communityRecommendations = [
  "Ensure children receive every routine DPT-containing vaccine dose at the recommended ages.",
  "Seek vaccine information from trained healthcare workers and government health facilities.",
  "Discuss vaccine concerns early with a healthcare worker instead of relying on rumours or misinformation.",
  "Encourage caregivers, families and community leaders to support routine childhood immunisation.",
];

const authorityRecommendations = [
  "Sustain culturally appropriate DPT health education in markets, motor parks, religious centres and schools.",
  "Provide information in languages communities understand and directly address common questions and misconceptions.",
  "Strengthen convenient access to routine immunisation services and maintain reliable vaccine availability.",
  "Use community feedback and local data to monitor vaccine confidence, uptake and outreach priorities.",
];

export default function Participate() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          },
        );
      }

      const columns = sectionRef.current?.querySelectorAll("[data-col]");
      columns?.forEach((column, index) => {
        gsap.fromTo(
          column,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: index * 0.15,
            scrollTrigger: { trigger: column, start: "top 85%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="recommendations" ref={sectionRef} className="w-full py-20 bg-deep-blue">
      <div className="max-w-[1200px] mx-auto px-6">
        <div data-header className="text-center max-w-[700px] mx-auto mb-12">
          <span className="gold-label">FROM EVIDENCE TO ACTION</span>
          <h2 className="font-display text-[26px] sm:text-[32px] lg:text-[40px] text-white leading-[1.2] mt-3">
            Recommendations for Communities and Health Authorities
          </h2>
          <p className="text-base text-white/70 font-body mt-4">
            Data collection and analysis have been completed. These actions turn the study&apos;s evidence into practical steps that can strengthen DPT vaccine confidence and uptake in Ilorin West.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div data-col className="bg-white rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-pale-blue flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-royal-blue" />
              </div>
              <h3 className="font-display text-xl text-royal-blue">For Communities and Caregivers</h3>
            </div>
            <div className="space-y-4">
              {communityRecommendations.map((recommendation) => (
                <div key={recommendation} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-mid-blue mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-text-mid font-body leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-col className="bg-navy/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-sky-blue" />
              </div>
              <h3 className="font-display text-xl text-white">For Health Authorities and Partners</h3>
            </div>
            <div className="space-y-4">
              {authorityRecommendations.map((recommendation) => (
                <div key={recommendation} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-sky-blue mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-white/80 font-body leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
            <a href="mailto:aabdulbasit5@gmail.com" className="w-full mt-7 py-3.5 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Contact the Research Team
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/40 font-body">
          Recommendations are informed by the completed community-based study in Ilorin West LGA, Kwara State.
        </p>
      </div>
    </section>
  );
}
