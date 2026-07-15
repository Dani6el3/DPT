import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Shield, MapPin, Calendar, Mail, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const eligibilityItems = [
  "Adults aged 18 years and above",
  "Resident or working in Ilorin West LGA",
  "Able to communicate in English, Yoruba, or Hausa",
  "Willing to provide informed consent",
  "No prior participation in this study",
];

const whatToExpect = [
  "Approached by a trained research assistant",
  "Briefed on study purpose and your rights",
  "Consent obtained (voluntary, no consequences for declining)",
  "Questionnaire administered (15–20 minutes)",
  "Your data secured anonymously",
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

      const cols = sectionRef.current?.querySelectorAll("[data-col]");
      cols?.forEach((col, i) => {
        gsap.fromTo(
          col,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: col, start: "top 85%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="participate"
      ref={sectionRef}
      className="w-full py-20 bg-deep-blue"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div data-header className="text-center max-w-[600px] mx-auto mb-12">
          <span className="gold-label">JOIN THE STUDY</span>
          <h2 className="font-display text-[26px] sm:text-[32px] lg:text-[40px] text-white leading-[1.2] mt-3">
            Your Participation Saves Lives
          </h2>
          <p className="text-base text-white/70 font-body mt-4">
            Every questionnaire completed brings us closer to the evidence that
            will reshape vaccine policy in Kwara State. This is science at the
            community level — and you are at its center.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Eligibility */}
          <div data-col className="bg-white rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-xl text-royal-blue mb-5">
              Who Can Participate?
            </h3>

            <div className="space-y-3">
              {eligibilityItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-mid-blue mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-text-mid font-body">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* What to expect */}
            <div className="mt-8">
              <h4 className="font-display text-base text-royal-blue mb-4">
                What to Expect
              </h4>
              <div className="space-y-4">
                {whatToExpect.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-pale-blue flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-xs font-bold text-royal-blue">
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-[13px] text-text-mid font-body pt-1">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy note */}
            <div className="mt-6 bg-pale-blue rounded-lg p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-royal-blue flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-text-mid font-body">
                All responses are strictly anonymous and confidential. Data is
                stored securely and used only for academic research purposes.
              </p>
            </div>
          </div>

          {/* Right — Contact Card */}
          <div
            data-col
            className="bg-navy/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8"
          >
            <h3 className="font-display text-xl text-white mb-6">
              Contact the Research Team
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-blue flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/80 font-body">
                  Hospitals, Mosques, Markets — Ilorin West LGA
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-sky-blue flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/80 font-body">
                  Mon–Fri clinic days + Friday mosque visits
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sky-blue flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/50 font-body">
                  aabdulbasit5@gmail.com
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-blue flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/50 font-body">
                  +234 806 810 5240
                </span>
              </div>
            </div>

            {/* Affiliation card */}
            <div className="mt-6 bg-white/[0.06] rounded-lg p-4">
              <p className="text-xs text-white/50 font-body leading-relaxed">
                This study is conducted under the academic and ethical oversight
                of [Institution] and is affiliated with RSTHM and NIHR. All data
                handling complies with Nigerian data protection regulations and
                international research ethics standards.
              </p>
            </div>

            {/* CTA */}
            <button className="w-full mt-6 py-3.5 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors">
              Express Interest via Email
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-white/[0.05] rounded-lg p-4 text-center">
          <p className="text-xs text-white/40 font-body">
            Participation is entirely voluntary. You may withdraw at any point
            without explanation or consequence. Ethical clearance certificate
            available on request.
          </p>
        </div>
      </div>
    </section>
  );
}
