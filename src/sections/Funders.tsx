import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const funders = [
  {
    name: "The Royal Society of Tropical Medicine and Hygiene",
    abbreviation: "RSTMH",
    image: "/images/funders/rstmh.jpg",
    url: "https://www.rstmh.org/",
  },
  {
    name: "National Institute for Health and Care Research",
    abbreviation: "NIHR",
    image: "/images/funders/nihr.jpg",
    url: "https://www.nihr.ac.uk/",
  },
];

export default function Funders() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = sectionRef.current?.querySelectorAll("[data-funder-content]");
      if (content?.length) {
        gsap.fromTo(
          content,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="funders" ref={sectionRef} className="w-full py-16 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div data-funder-content className="text-center max-w-[680px] mx-auto">
          <span className="gold-label">ACKNOWLEDGEMENTS</span>
          <h2 className="font-display text-[26px] sm:text-[32px] text-royal-blue leading-[1.2] mt-3">
            Supported by Our Funders
          </h2>
          <p className="text-base text-text-mid font-body mt-4">
            We gratefully acknowledge the organisations whose support made this research possible.
          </p>
        </div>

        <div data-funder-content className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[860px] mx-auto">
          {funders.map((funder) => (
            <a
              key={funder.abbreviation}
              href={funder.url}
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-xl border border-royal-blue/10 p-6 flex flex-col items-center justify-center min-h-[190px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(26,74,138,0.1)] transition-all"
            >
              <img
                src={funder.image}
                alt={`${funder.name} logo`}
                className="max-h-20 w-auto max-w-full object-contain"
              />
              <p className="mt-5 text-center text-sm font-medium text-royal-blue font-body">
                {funder.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
