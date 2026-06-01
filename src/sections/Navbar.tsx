import { useEffect, useState } from "react";
import { Menu, X, Microscope } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
        >
          <Microscope className="w-6 h-6 text-sky-blue" />
          <div className="flex flex-col">
            <span className="font-display text-lg font-semibold text-white leading-tight">
              DPTResearch
            </span>
            <span className="text-[11px] text-gold font-body">
              Kwara State &middot; 2025
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-medium text-white/80 hover:text-sky-blue transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-sky-blue transition-all duration-200 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-gold/30">
            <span className="w-2 h-2 rounded-full bg-gold animate-gold-pulse" />
            <span className="text-xs font-medium text-gold">
              Live Data Collection
            </span>
          </div>
          <button
            onClick={() => handleNavClick("#participate")}
            className="px-5 py-2 bg-mid-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue transition-colors"
          >
            Join Study
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden absolute top-16 left-0 right-0 bg-navy/95 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {siteConfig.nav.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-left text-base font-medium text-white/80 hover:text-sky-blue transition-colors py-2"
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-gold/30 w-fit mt-2">
            <span className="w-2 h-2 rounded-full bg-gold animate-gold-pulse" />
            <span className="text-xs font-medium text-gold">
              Active Study
            </span>
          </div>
          <button
            onClick={() => handleNavClick("#participate")}
            className="mt-2 w-full py-3 bg-mid-blue text-white text-sm font-medium rounded-lg hover:bg-royal-blue transition-colors"
          >
            Join Study
          </button>
        </div>
      </div>
    </nav>
  );
}
