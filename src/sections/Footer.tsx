import { Microscope } from "lucide-react";

const navLinksRow1 = [
  { label: "About the Disease", href: "#disease" },
  { label: "The Research", href: "#research-design" },
  { label: "Campaign Progress", href: "#progress" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Participate", href: "#participate" },
];

const navLinksRow2 = [
  { label: "Privacy Policy", href: "#" },
  { label: "Data Protection", href: "#" },
  { label: "Ethical Clearance", href: "#" },
  { label: "Contact", href: "#participate" },
];

export default function Footer() {
  const handleClick = (href) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#060f1e]">
      {/* Top area */}
      <div className="max-w-[1200px] mx-auto px-6 py-16 border-b border-white/[0.06]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Microscope className="w-5 h-5 text-sky-blue" />
            <div className="flex flex-col">
              <span className="font-display text-base font-semibold text-white leading-tight">
                DPTResearch
              </span>
              <span className="text-[11px] text-gold font-body">
                Kwara State &middot; 2026
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinksRow1.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleClick(link.href)}
                  className="text-[13px] text-white/40 hover:text-white/80 transition-colors font-body"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinksRow2.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleClick(link.href)}
                  className="text-[13px] text-white/40 hover:text-white/80 transition-colors font-body"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom area */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/30 font-body">
            A DPT Research Initiative &middot; Ilorin West LGA, Kwara State,
            Nigeria &middot; 2026
          </p>
          <p className="text-xs text-white/30 font-body">
            Ethical clearance obtained &middot; Community surveillance study
          </p>
          <p className="text-xs text-white/30 font-body">
            &copy; 2026 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
