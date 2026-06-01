import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "../data/timeline";

gsap.registerPlugin(ScrollTrigger);

const statusConfig = {
  completed: { color: "#16a34a", label: "COMPLETED", icon: "✓" },
  active: { color: "#d4a017", label: "ACTIVE", icon: "⏳" },
  upcoming: { color: "#94a3b8", label: "UPCOMING", icon: "○" },
};

export default function CampaignProgress() {
  const sectionRef = useRef(null);
  const progressBarRef = useRef(null);
  const timelineLineRef = useRef(null);
  const phaseRefs = useRef([]);
  const progressNumberRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
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

      // Progress bar
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: "0%" },
          {
            width: `${timeline.overallProgress}%`,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: progressBarRef.current.closest("[data-dashboard]"),
              start: "top 80%",
            },
          }
        );
      }

      // Progress number count-up
      if (progressNumberRef.current) {
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: progressNumberRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: timeline.overallProgress,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                if (progressNumberRef.current) {
                  progressNumberRef.current.textContent = Math.round(obj.val) + "%";
                }
              },
            });
          },
        });
      }

      // Timeline line draw
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineLineRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          }
        );
      }

      // Phase cards
      phaseRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="progress"
      ref={sectionRef}
      className="w-full py-20 bg-pale-blue"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div data-header className="mb-10">
          <span className="gold-label">CAMPAIGN PROGRESS</span>
          <h2 className="font-display text-[26px] sm:text-[32px] lg:text-[40px] text-royal-blue leading-[1.2] mt-3">
            Study Milestones — Phase by Phase
          </h2>
        </div>

        {/* Progress Dashboard */}
        <div
          data-dashboard
          className="bg-white rounded-2xl p-6 sm:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            {/* Progress bar */}
            <div className="flex-1 w-full">
              <div className="w-full h-3 rounded-full bg-navy/10 overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #0a1628, #1a4a8a)",
                    width: "0%",
                  }}
                />
              </div>
            </div>
            {/* Percentage */}
            <div className="flex items-baseline gap-2 flex-shrink-0">
              <span
                ref={progressNumberRef}
                className="font-display text-[40px] sm:text-[48px] text-royal-blue leading-none"
              >
                0%
              </span>
              <span className="text-sm text-text-muted font-body">
                Campaign Complete
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-sm text-gold">
              Phase {timeline.currentPhase} of {timeline.totalPhases} Active
            </span>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-status-completed" />
                Completed ({timeline.completedPhases})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-status-active" />
                In Progress ({timeline.inProgressPhases})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-status-upcoming" />
                Upcoming ({timeline.upcomingPhases})
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={timelineLineRef}
            className="absolute left-[24px] lg:left-[80px] top-0 bottom-0 w-0.5 bg-light-blue"
          />

          <div className="space-y-8">
            {timeline.phases.map((phase, i) => {
              const status = statusConfig[phase.status];
              const isActive = phase.status === "active";
              return (
                <div
                  key={i}
                  ref={(el) => { phaseRefs.current[i] = el; }}
                  className="relative flex items-start gap-6 lg:gap-8"
                >
                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isActive ? "animate-gold-pulse" : ""
                      }`}
                      style={{
                        backgroundColor:
                          phase.status === "upcoming" ? "transparent" : status.color,
                        borderColor: status.color,
                      }}
                    >
                      {phase.status === "completed" && (
                        <span className="text-[8px] text-white font-bold">✓</span>
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 bg-white rounded-xl p-5 sm:p-6 border-l-4 shadow-sm ${
                      isActive ? "shadow-lg" : ""
                    }`}
                    style={{
                      borderLeftColor: isActive ? "#d4a017" : status.color,
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${status.color}15`,
                          color: status.color,
                        }}
                      >
                        {status.label}
                      </span>
                      <span className="text-xs text-text-muted">
                        {phase.date}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-text-dark mb-2">
                      {phase.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {phase.highlights.map((h, hi) => (
                        <span
                          key={hi}
                          className="text-xs text-text-muted bg-pale-blue px-2 py-1 rounded"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {phase.keyMoment && (
                      <span className="inline-block text-xs px-3 py-1 rounded-full bg-gold-pale text-gold font-medium mt-1">
                        {phase.keyMoment}
                      </span>
                    )}

                    {phase.enrollment && (
                      <div className="mt-4 pt-4 border-t border-light-blue">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-text-dark">
                            LIVE Enrollment
                          </span>
                          <span className="font-mono text-sm text-sky-blue">
                            {phase.enrollment.current} / {phase.enrollment.target}
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-light-blue overflow-hidden">
                          <div
                            className="h-full rounded-full bg-sky-blue"
                            style={{ width: `${phase.enrollment.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-muted mt-1 block">
                          {phase.enrollment.percentage}% enrolled
                        </span>
                      </div>
                    )}

                    {phase.badge && (
                      <span className="inline-block text-xs px-3 py-1 rounded-full bg-pale-blue text-royal-blue font-medium mt-2">
                        {phase.badge}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
