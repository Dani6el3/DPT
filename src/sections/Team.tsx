import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { team } from "../data/team";

gsap.registerPlugin(ScrollTrigger);

const badgeColorMap = {
  gold: "bg-gold-pale text-gold",
  "royal-blue": "bg-royal-blue/10 text-royal-blue",
  "sky-blue": "bg-sky-blue/10 text-sky-blue",
  "light-blue": "bg-light-blue/30 text-navy",
  purple: "bg-purple-100 text-purple-700",
};

function Avatar({ photo, initials, size = "md" }) {
  const [error, setError] = useState(false);
  const sizeClasses = {
    lg: "w-[100px] h-[100px] text-4xl",
    md: "w-[72px] h-[72px] text-2xl",
  };

  if (!photo || error) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-royal-blue to-sky-blue flex items-center justify-center flex-shrink-0`}
      >
        <span className="font-display font-bold text-white">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={photo}
      alt=""
      className={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0`}
      onError={() => setError(true)}
    />
  );
}

export default function Team() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

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

      const piCard = sectionRef.current?.querySelector("[data-pi]");
      if (piCard) {
        gsap.fromTo(
          piCard,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: piCard, start: "top 85%" },
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pi = team.principalInvestigator;

  return (
    <section id="team" ref={sectionRef} className="w-full py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div data-header className="text-center max-w-[700px] mx-auto mb-12">
          <span className="gold-label">THE TEAM</span>
          <h2 className="font-display text-[26px] sm:text-[32px] lg:text-[40px] text-royal-blue leading-[1.2] mt-3">
            The People Behind This Study
          </h2>
          <p className="text-base text-text-mid font-body mt-4">
            A dedicated multidisciplinary team of medical professionals,
            epidemiologists, and community health researchers working to protect
            Kwara State communities from diphtheria.
          </p>
        </div>

        {/* Lead Researcher — Feature Card */}
        <div data-pi className="bg-navy rounded-2xl p-6 sm:p-10 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar photo={pi.photo} initials={pi.initials} size="lg" />
            <div className="flex-1">
              <span
                className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full mb-3 ${
                  badgeColorMap[pi.badgeColor]
                }`}
              >
                {pi.badge}
              </span>
              <h3 className="font-display text-[24px] sm:text-[28px] text-white font-semibold">
                {pi.name}
              </h3>
              <p className="text-sm text-sky-blue mt-1">{pi.credentials}</p>
              <p className="text-[13px] text-white/50 mt-1">{pi.institution}</p>
              <p className="text-[15px] text-white/70 font-body mt-4 leading-relaxed max-w-[600px]">
                {pi.bio}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="text-xs px-3 py-1.5 rounded-full bg-royal-blue text-light-blue">
                  {pi.speciality}
                </span>
                {pi.email && (
                  <a
                    href={`mailto:${pi.email}`}
                    className="text-sm text-sky-blue hover:underline"
                  >
                    {pi.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {team.members.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-center hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(26,74,138,0.1)] transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <Avatar
                  photo={member.photo}
                  initials={member.initials}
                  size="md"
                />
              </div>
              <span
                className={`inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-2 ${
                  badgeColorMap[member.badgeColor] ||
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {member.badge}
              </span>
              <h4 className="font-display text-lg font-semibold text-text-dark">
                {member.name}
              </h4>
              <p className="text-sm text-sky-blue font-body mt-0.5">
                {member.role}
              </p>
              {member.affiliation && (
                <p className="text-xs text-text-muted font-body mt-1">
                  {member.affiliation}
                </p>
              )}
              {member.qualification && (
                <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-pale-blue text-royal-blue mt-2">
                  {member.qualification}
                </span>
              )}
              <p className="text-[13px] text-text-mid font-body mt-3 line-clamp-2">
                {member.bio}
              </p>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="text-sm text-sky-blue hover:underline mt-3 inline-block"
                >
                  {member.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
