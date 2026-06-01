import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFadeUp(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-fade-up]");
    const targets = children.length > 0 ? children : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: options.stagger || 0.1,
          scrollTrigger: {
            trigger: el,
            start: options.start || "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options.stagger, options.start]);

  return ref;
}

export function useCountUp(targetValue, options = {}) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: options.start || "top 80%",
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          const obj = { value: 0 };
          gsap.to(obj, {
            value: targetValue,
            duration: options.duration || 1.5,
            ease: options.ease || "power2.out",
            onUpdate: () => {
              if (el) {
                const prefix = options.prefix || "";
                const suffix = options.suffix || "";
                el.textContent = prefix + Math.round(obj.value) + suffix;
              }
            },
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [targetValue, options.prefix, options.suffix, options.duration, options.ease, options.start]);

  return ref;
}

export function useBarAnimation(targetWidth, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { width: "0%" },
        {
          width: targetWidth + "%",
          duration: options.duration || 1,
          ease: options.ease || "power2.out",
          scrollTrigger: {
            trigger: el.closest("[data-bar-trigger]"),
            start: options.start || "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [targetWidth, options.duration, options.ease, options.start]);

  return ref;
}
