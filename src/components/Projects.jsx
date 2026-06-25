import { useState } from "react";
import projects from "../data/projects.js";
import { useTheme } from "../ThemeProvider";

const projectBadges = [
  ["React js", "Next.js", "React Native"],
  ["Spring Boot", "React"],
  ["Socket.io", "Next.js"],
];

const projectBullets = [
  ["Multi-role Dashboards", "Real-time Chat", "Payment Integration"],
  ["Event Booking System", "Smart Notifications", "Role-Based Access"],
  ["Real-time Messaging", "WebSocket Integration", "Push Notifications"],
];

const projectTechTags = [
  ["React.js", "Next.js", "TypeScript", "Firebase", "REST APIs", "SaaS"],
  ["React.js", "Next.js", "Spring Boot", "REST APIs", "SaaS", "DB"],
  ["React.js", "Next.js", "Socket.io", "Context API", "Material UI"],
];

function ProjectCard({ project, index, compact = false, isLight }) {
  const badges = projectBadges[index] || ["React", "Next.js"];
  const bullets = projectBullets[index] || project.highlights || [];
  const techTags = projectTechTags[index] || project.tech;
  const cardNum = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300
  hover:border-[#4361EE]/30 hover:bg-[#4361EE]/[0.04]
  hover:shadow-[0_20px_50px_rgba(67,97,238,0.1)]
  ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}
  ${
    isLight
      ? "bg-white border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
      : "pro-panel-glass"
  }`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {badges.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-1 text-[0.74rem] font-bold transition-colors
        ${
          isLight
            ? "border-slate-200 bg-slate-100 text-slate-700"
            : "border-[#4361EE]/20 bg-[#4361EE]/8 text-[#38BDF8]"
        }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className={`shrink-0 text-lg transition-all duration-300
    group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#4361EE]
    ${isLight ? "text-slate-500 hover:text-slate-900" : "text-white/40"}`}
          aria-label={`Visit ${project.title} in a new tab`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </a>
      </div>

      <div className="mb-3 flex items-baseline gap-2">
        <span
          className={`text-[0.8rem] font-black uppercase tracking-widest ${isLight ? "text-slate-400" : "text-white/30"}`}
        >
          {cardNum}
        </span>
        <h3
          className={`m-0 font-extrabold tracking-[-0.01em] leading-tight ${isLight ? "text-slate-900" : "text-white"} ${
            compact
              ? "text-[1.08rem] sm:text-[1.18rem]"
              : "text-[1.15rem] sm:text-[1.22rem]"
          }`}
        >
          {project.title}
        </h3>
      </div>

      <p
        className={`m-0 mb-5 grow leading-[1.6] ${isLight ? "text-slate-600" : "text-white/70"} ${compact ? "text-[0.88rem]" : "text-[0.92rem]"}`}
      >
        {project.description}
      </p>

      <ul
        className={`m-0 mb-4 list-none border-t p-0 pt-4
  ${isLight ? "border-slate-200" : "border-white/[0.04]"}`}
      >
        {" "}
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className={`flex items-center gap-2 text-[0.88rem] ${isLight ? "text-slate-700" : "text-white/80"}`}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#38BDF8]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mb-5 mt-2.5 flex flex-wrap gap-1.5">
        {techTags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2.5 py-1 text-[0.7rem] font-medium transition-all
${
  isLight
    ? "border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
    : "border border-white/[0.07] bg-white/[0.02] text-white/50 hover:bg-white/[0.05] hover:text-white"
}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className={`flex items-center justify-between gap-3 border-t ${isLight ? "border-slate-200" : "border-white/[0.04]"} pt-4`}
      >
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 whitespace-nowrap text-[0.88rem] font-bold text-[#4361EE] transition-colors duration-300 hover:text-[#38BDF8]"
        >
          <span>View Case Study</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </a>
      </div>
    </article>
  );
}

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasProjects = projects.length > 0;
  const canSlide = projects.length > 1;
  const { theme } = useTheme();
  const isLight = theme === "light";

  const prevSlide = () => {
    if (!canSlide) return;
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (!canSlide) return;
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-[1240px] overflow-hidden px-[18px] py-16 sm:py-20 sm:px-6"
    >
      <div className="mx-auto mb-12 max-w-[760px] text-center">
        <p className="m-0 mx-auto mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">
          Selected Work
        </p>
        <h2
          className={`text-[clamp(1.85rem,9vw,2.35rem)] sm:text-[clamp(2rem,4vw,3.2rem)]
  font-extrabold tracking-[-0.03em] leading-[1.1] mt-0 mb-4
  ${isLight ? "text-slate-900" : "text-white"}`}
        >
          {" "}
          Focused projects built for{" "}
          <span className="bg-gradient-to-r from-[#38BDF8] via-[#4361EE] to-[#6366F1] bg-clip-text text-transparent">
            clarity, speed, and practical use.
          </span>
        </h2>
      </div>

      {!hasProjects ? (
        <div className="mx-auto max-w-[680px] rounded-2xl border border-white/[0.06] bg-[#040B18]/60 p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:p-8">
          <p className="m-0 text-[0.95rem] leading-[1.7] text-white/80">
            Projects will appear here once they are added. The layout stays
            static, so there is no empty carousel or horizontal scroll when the
            list is empty.
          </p>
        </div>
      ) : (
        <div className="w-full">
          <div className="lg:hidden">
            {canSlide ? (
              <>
                <div className="overflow-hidden py-4">
                  <div
                    className="flex w-full transition-transform duration-500 ease-out will-change-transform"
                    style={{
                      transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
                    }}
                  >
                    {projects.map((project, index) => (
                      <div
                        key={project.title}
                        className="w-full shrink-0 px-1.5"
                      >
                        <ProjectCard
                          project={project}
                          index={index}
                          compact
                          isLight={isLight}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-[auto,1fr,auto] items-center gap-3 px-1">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#040B18]/60 text-white/60 transition-all hover:border-white/20 hover:text-white hover:scale-105 active:scale-95"
                    aria-label="Previous project"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentIndex === index
                            ? "w-6 bg-[#38BDF8]"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to project ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={nextSlide}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#040B18]/60 text-white/60 transition-all hover:border-white/20 hover:text-white hover:scale-105 active:scale-95"
                    aria-label="Next project"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="mx-auto max-w-[420px] py-4">
                <ProjectCard
                  project={projects[0]}
                  index={0}
                  compact
                  isLight={isLight}
                />
              </div>
            )}
          </div>

          <div className="hidden w-full gap-6 lg:grid lg:grid-cols-3">
            {projects.length === 1 ? (
              <div className="mx-auto max-w-[420px] lg:col-span-3">
                <ProjectCard
                  project={projects[0]}
                  index={0}
                  isLight={isLight}
                />
              </div>
            ) : (
              projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  isLight={isLight}
                />
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
