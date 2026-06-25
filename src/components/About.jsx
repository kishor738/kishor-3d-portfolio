import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeProvider";

const expertise = [
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Frontend Engineering",
    description:
      "React.js, Next.js, Tailwind CSS, Shadcn/UI, state management, animations, accessibility, and pixel-perfect UI.",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    title: "Backend & APIs",
    description:
      "REST APIs, authentication flows, Spring Boot services, Firebase, and production data handling across dashboards.",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
      </svg>
    ),
    title: "Interface Systems",
    description:
      "Responsive layouts with clean visual hierarchy, polished micro-interactions, and engaging UI flows.",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Performance",
    description:
      "Lazy loading, code splitting, memoization, and responsive delivery tuned for fast, smooth user experiences.",
  },
];

const highlights = [
  "Multi-role dashboard development with RBAC",
  "Scalable real-time chat and notification systems",
  "Performance optimization and architecture design",
  "REST API development & database management",
];

function About() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [activeCard, setActiveCard] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="py-16 sm:py-20 px-[clamp(16px,5vw,32px)] max-sm:px-3 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* About section label and header */}
        <div className="text-center mb-14 max-sm:mb-[34px] animate-[slideDown_0.8s_ease-out]">
          <p className="inline-block text-[0.8rem] font-bold tracking-[0.18em] uppercase mb-3 text-[#38BDF8]">
            About Me
          </p>
          <h2 className="text-[clamp(1.85rem,9vw,2.35rem)] sm:text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em] leading-[1.1] mt-0 mb-4 text-white">
            Full Stack Developer Building <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#38BDF8] to-[#6366F1] bg-clip-text text-transparent">
              Scalable Digital Products
            </span>
          </h2>
          <p
            className={`max-w-[620px] mt-3 mx-auto mb-0 text-[0.95rem] leading-[1.6]
${isLight ? "text-slate-600" : "text-[#e8edf8]/70"}`}
          >
            I turn product ideas into responsive interfaces, reliable APIs, and
            production-ready workflows.
          </p>
        </div>

        {/* About columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-[18px] md:gap-[40px] items-start">
          {/* Left column: Summary & Expertise Bullets */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Card 1: Professional Summary */}
            <div className="pro-panel-glass relative p-6 sm:p-8 overflow-hidden">
              <div className="flex items-center gap-3.5 mb-5">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center
  ${
    isLight
      ? "bg-indigo-50 border border-indigo-200 text-indigo-600"
      : "bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1]"
  }`}
                >
                  {" "}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h3
                  className={`m-0 text-[1.15rem] font-bold uppercase tracking-wider
  ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  Professional Summary
                </h3>
              </div>
              <p
                className={`text-[0.95rem] leading-[1.7]
  ${isLight ? "text-slate-600" : "text-white/75"}`}
              >
                Full Stack Developer focused on scalable, responsive,
                product-ready applications. I work across React.js, Next.js,
                TypeScript, Spring Boot, REST APIs, Firebase, and relational
                databases with a strong focus on user experience, performance,
                and maintainable systems.
              </p>
              <p
                className={`text-[0.95rem] leading-[1.7]
  ${isLight ? "text-slate-600" : "text-white/75"}`}
              >
                My work includes multi-service platforms, real-time
                communication systems, role-based admin products, and integrated
                data flows where clean code, reliability, and polished
                interaction matter.
              </p>
            </div>

            {/* Card 2: Key Expertise */}
            <div
              className={`relative p-6 sm:p-8 overflow-hidden rounded-2xl border backdrop-blur-xl
${
  isLight
    ? "bg-white border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
    : "bg-[#040B18]/60 border-white/10"
}`}
            >
              <div className="flex items-center gap-3.5 mb-5">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center
  ${
    isLight
      ? "bg-blue-50 border border-blue-200 text-blue-600"
      : "bg-[#4361EE]/10 border border-[#4361EE]/20 text-[#4361EE]"
  }`}
                >
                  {" "}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className="m-0 text-[1.15rem] font-bold text-white uppercase tracking-wider">
                  Key Expertise
                </h3>
              </div>
              <ul className="list-none m-0 p-0 flex flex-col gap-3.5">
                {highlights.map((highlight, idx) => (
                  <motion.li
                    key={highlight}
                    className="flex items-start gap-3 text-white/80 text-[0.95rem] leading-[1.5] transition-all duration-300 hover:text-[#38BDF8] hover:translate-x-1.5"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <svg
                      className="text-[#38BDF8] shrink-0 mt-0.5 w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right column: 4 stackable cards of Expertise */}
          <motion.div
            className="grid grid-cols-1 gap-3.5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {expertise.map((expert, idx) => (
              <motion.div
                key={expert.title}
                className={`pro-panel-glass transition-all duration-400 relative overflow-hidden flex gap-4 items-start p-5 hover:translate-x-1.5 hover:bg-[#4361EE]/[0.06] hover:border-[#4361EE]/25 hover:shadow-[0_15px_40px_rgba(67,97,238,0.08)] cursor-pointer group ${activeCard === idx ? "active" : ""}`}
                onMouseEnter={() => setActiveCard(idx)}
                onFocus={() => setActiveCard(idx)}
                variants={itemVariants}
                tabIndex="0"
              >
                {/* Arrow up-right in the top-right corner */}
                <span
                  className="absolute top-4.5 right-4.5 text-white/30 group-hover:text-[#4361EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-[1.1rem]"
                  aria-hidden="true"
                >
                  ↗
                </span>

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
${
  isLight
    ? "bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm"
    : "bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1]"
}`}
                >
                  {expert.icon}
                </div>
                <div className="pr-4">
                  <h3 className="m-0 mb-1.5 text-[1.05rem] font-bold text-white transition-colors duration-300 group-hover:text-[#4361EE]">
                    {expert.title}
                  </h3>
                  <p className="m-0 text-white/65 text-[0.88rem] leading-[1.5]">
                    {expert.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
