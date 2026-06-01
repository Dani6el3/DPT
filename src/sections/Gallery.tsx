import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight, Camera, Info } from "lucide-react";
import { gallery } from "../data/gallery";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const filteredItems =
    activeFilter === "all"
      ? gallery.items
      : gallery.items.filter((item) => item.category === activeFilter);

  const openLightbox = useCallback((index) => {
    setLightbox(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightbox((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : null
    );
  }, [filteredItems.length]);

  const goPrev = useCallback(() => {
    setLightbox((prev) =>
      prev !== null
        ? (prev - 1 + filteredItems.length) % filteredItems.length
        : null
    );
  }, [filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, goNext, goPrev]);

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

  return (
    <section id="gallery" ref={sectionRef} className="w-full py-20 bg-navy">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div data-header className="mb-8">
          <span className="gold-label">GALLERY</span>
          <h2 className="font-display text-[26px] sm:text-[32px] lg:text-[40px] text-white leading-[1.2] mt-3">
            Campaign in Action
          </h2>
          <p className="text-base text-white/50 font-body mt-4 max-w-[600px]">
            A growing visual record of the study's journey — field work,
            community engagement, team training, and the people at the center of
            this research.
          </p>
        </div>
        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {gallery.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat.id
                  ? "bg-gold text-navy"
                  : "bg-white/[0.08] text-white/60 hover:bg-white/[0.15]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4"
        >
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className={`break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg ${
                item.featured ? "sm:col-span-2" : ""
              }`}
              onClick={() => openLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.caption}
                className={`w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 ${
                  item.featured ? "aspect-[16/10]" : "aspect-[4/3]"
                }`}
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-royal-blue/0 group-hover:bg-royal-blue/30 transition-colors duration-300 rounded-lg" />
              {/* Category badge */}
              <span className="absolute top-3 right-3 text-[11px] px-2 py-0.5 rounded-full bg-navy/70 text-white capitalize opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.category}
              </span>
              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg">
                <p className="text-sm text-white font-body">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && filteredItems[lightbox] && (
        <div
          className="fixed inset-0 z-[100] bg-navy/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-royal-blue flex items-center justify-center text-white hover:bg-sky-blue transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-royal-blue flex items-center justify-center text-white hover:bg-sky-blue transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightbox].src}
              alt={filteredItems[lightbox].caption}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <p className="text-white text-base font-body mt-4 text-center">
              {filteredItems[lightbox].caption}
            </p>
            <p className="text-white/50 font-mono text-sm mt-2">
              {lightbox + 1} / {filteredItems.length}
            </p>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 capitalize mt-2">
              {filteredItems[lightbox].category}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
