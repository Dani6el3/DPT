import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ruler, Target, BarChart3, TrendingUp } from "lucide-react";
import { studySites } from "../data/diseaseInfo";

gsap.registerPlugin(ScrollTrigger);

const methodCards = [
  {
    icon: Ruler,
    title: "STUDY DESIGN",
    body: "Cross-sectional KAP survey design. Structured, interviewer-administered questionnaires covering 7 domains: socio-demographic data, knowledge (Yes/No/Not sure), attitude (5-point Likert), social influence, practice and uptake, barrier analysis, and qualitative FGD guide. 39 items total.",
  },
  {
    icon: Target,
    title: "SAMPLING STRATEGY",
    body: "Purposive sampling targeting 400 adult community members in Ilorin West LGA. Recruitment at designated clinic days (primary) with mosque Friday Jumu'ah visits as secondary strategy to meet enrollment targets. All framed as community surveillance, not clinical research.",
  },
  {
    icon: BarChart3,
    title: "DATA COLLECTION",
    body: "Trained research assistants administer questionnaires face-to-face at hospitals, primary healthcare centres, community mosques, and open markets. Data secured digitally via Google Forms. Weekly team review sessions ensure consistency and quality control.",
  },
  {
    icon: TrendingUp,
    title: "ANALYSIS PLAN",
    body: "Data entered into SPSS/Stata. Descriptive statistics for KAP domain frequencies. Chi-square tests for associations. Logistic regression to identify predictors of DPT uptake. Findings to be submitted to a peer-reviewed journal and presented to Kwara State Ministry of Health.",
  },
];

const statusColors = {
  primary: "#16a34a",
  secondary: "#d4a017",
  supplementary: "#3b82f6",
};

export default function StudyDesign() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

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
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
          }
        );
      }

      const sitesPanel = sectionRef.current?.querySelector("[data-sites]");
      if (sitesPanel) {
        gsap.fromTo(
          sitesPanel,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: sitesPanel, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="research-design"
      ref={sectionRef}
      className="w-full py-20 bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div data-header className="mb-12">
          <span className="gold-label">THE RESEARCH</span>
          <h2 className="font-display text-[26px] sm:text-[32px] lg:text-[40px] text-royal-blue leading-[1.2] mt-3">
            A Rigorous Community-Based Epidemiological Study
          </h2>
        </div>

        {/* Method Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {methodCards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden border-t-4 border-royal-blue hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(26,74,138,0.1)] transition-all duration-300 group"
            >
              <div className="bg-navy px-5 py-3 flex items-center gap-3">
                <card.icon className="w-5 h-5 text-white" />
                <span className="text-[11px] font-medium text-white uppercase tracking-wider">
                  {card.title}
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-text-mid font-body leading-relaxed">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Study Sites Panel */}
        <div data-sites className="mt-12 bg-navy rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-xl text-white mb-6">
            Active Data Collection Sites
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studySites.map((site, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: statusColors[site.status] }}
                />
                <div>
                  <p className="text-[15px] font-medium text-white">
                    {site.name}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{site.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
