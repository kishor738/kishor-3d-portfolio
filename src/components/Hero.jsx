import { motion } from "framer-motion";
import ThreeAvatar from "./ThreeAvatar";

const stats = [
  {
    value: "1.6+",
    label: "Years Experience",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a4 4 0 0 1 4 4v5a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
      </svg>
    ),
  },
  {
    value: "3+",
    label: "Projects Delivered",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M12 2C6.5 2 2 6.5 2 12c0 2 1.5 4 1.5 4L9 10.5M22 2s-3 1-5.5 3.5L10.5 12M13.5 15l-5.5 5.5s2 1.5 4 1.5c5.5 0 10-4.5 10-10 0-2.5-1-5.5-1-5.5" />
      </svg>
    ),
  },
  {
    value: "500+",
    label: "Problems Solved",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    value: "10+",
    label: "Tech Stack Mastered",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center pt-[82px] sm:pt-[100px] px-[18px] sm:px-6 lg:px-[8%] pb-[36px] sm:pb-[60px] text-white font-sans relative overflow-visible"
    >
      {/* Background glow blobs */}
      <div className="absolute w-[560px] h-[560px] top-[-100px] right-[-100px] rounded-full bg-[radial-gradient(circle,rgba(67,97,238,0.12),transparent_70%)] pointer-events-none z-[1]" />
      <div className="absolute w-[420px] h-[420px] bottom-[-80px] left-[-100px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.09),transparent_70%)] pointer-events-none z-[1]" />
      <div className="hero-grid-overlay absolute inset-0 pointer-events-none z-[1]" />

      {/* Main split grid/flex row */}
      <div className="w-full max-w-[1200px] flex lg:flex-row flex-col items-stretch lg:items-center justify-between gap-8 lg:gap-12 relative z-10">
        {/* ── LEFT CONTENT ── */}
        <motion.div
          className="flex-1 w-full max-w-full lg:max-w-[600px] relative flex flex-col lg:items-start items-center gap-0 lg:text-left text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Available badge (dark green theme) */}
          <motion.div
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#064e3b]/30 border border-[#059669]/30 backdrop-blur-[16px] shadow-[0_2px_14px_rgba(0,0,0,0.2)] mb-5 text-[#34d399]"
            variants={itemVariants}
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981,0_0_16px_#10b981] animate-[pulseDot_2.2s_infinite] shrink-0" />
            <span className="text-[0.7rem] font-bold tracking-[1.8px] uppercase">
              Available for work
            </span>
          </motion.div>

          {/* Hi, I'm label */}
          <motion.p
            className="text-[0.95rem] text-[#38BDF8] font-semibold tracking-[0.5px] mb-1 mt-0 uppercase"
            variants={itemVariants}
          >
            Hi, I'm
          </motion.p>

          {/* Name */}
          <motion.h2
            className="text-[clamp(1.8rem,4.5vw,3.6rem)] font-bold leading-[1.08] tracking-[-1px] mb-2.5 mt-0 bg-[linear-gradient(135deg,#ffffff_10%,#38bdf8_55%,#6366f1_100%)] bg-[length:200%_200%] bg-clip-text text-transparent animate-[nameGradientMove_6s_ease-in-out_infinite_alternate]"
            variants={itemVariants}
          >
            Kishor Rathod
          </motion.h2>

          {/* Tagline */}
          <motion.h1
            className="text-[clamp(1.8rem,4.2vw,3.5rem)] leading-[1.12] font-extrabold tracking-[-1px] mt-0 mb-4 text-white"
            variants={itemVariants}
          >
            Turning Ideas Into
            <br />
            <span className="bg-gradient-to-r from-[#38BDF8] to-[#6366F1] bg-clip-text text-transparent">
              Scalable Products.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-[0.95rem] sm:text-[1rem] leading-[1.7] text-[#8892A4] max-w-[520px] mt-0 mb-6 lg:text-left text-center lg:mx-0 mx-auto"
            variants={itemVariants}
          >
            Full Stack Developer specializing in modern web applications,
            backend systems, and user-focused experiences using React,React
            Native, Next.js, Node.js, Spring Boot, Tailwind CSS, Three.js,
            MySQL, MongoDB and cloud technologies.
          </motion.p>

          {/* CTAs - Three Button Row matching mockup */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap lg:justify-start justify-center gap-3 w-full sm:w-auto"
            variants={itemVariants}
          >
            {/* Primary CTA */}
            <a
              href="#projects"
              className="py-3 px-6 rounded-xl font-semibold text-[0.95rem] text-white bg-[#4361EE] shadow-[0_4px_18px_rgba(67,97,238,0.30)] transition-all duration-300 inline-flex items-center justify-center gap-2.5 hover:-translate-y-[3px] hover:bg-[#3451D1] hover:shadow-[0_8px_28px_rgba(67,97,238,0.45)] w-full sm:w-auto group animate-none"
            >
              <span>View Projects</span>
              <svg
                className="transition-transform duration-300 group-hover:translate-x-1 shrink-0"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            {/* Secondary CTA */}
            <a
              href="/resume/KishorFullStack1Year.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-xl text-[0.95rem] text-white border border-white/[0.12] bg-white/[0.03] backdrop-blur-[12px] transition-all duration-300 inline-flex items-center justify-center gap-2.5 hover:-translate-y-[3px] hover:bg-white/[0.06] hover:border-white/[0.2] w-full sm:w-auto group"
            >
              <span>View Resume</span>

              {/* External Link Icon */}
              <svg
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            {/* Contact Me CTA */}
            <a
              href="#contact"
              className="py-3 px-6 rounded-xl text-[0.95rem] text-white border border-white/[0.12] bg-white/[0.03] backdrop-blur-[12px] transition-all duration-300 inline-flex items-center justify-center gap-2.5 hover:-translate-y-[3px] hover:bg-white/[0.06] hover:border-white/[0.2] w-full sm:w-auto group"
            >
              <span>Contact Me</span>
              <svg
                className="transition-transform duration-300 group-hover:scale-105 shrink-0"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </motion.div>

          {/* Social Icons row (GitHub, LinkedIn, LeetCode, Email) */}
          <motion.div
            className="flex items-center gap-3 mt-7 mb-8 lg:mx-0 mx-auto"
            variants={itemVariants}
          >
            <a
              href="https://github.com/kishor738"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#4361EE]/40 hover:bg-[#4361EE]/[0.08] hover:text-[#4361EE] flex items-center justify-center text-white/70 transition-all duration-300 hover:-translate-y-0.5"
              aria-label="GitHub Profile"
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
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/kishor-rathod-1b4a34221/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#4361EE]/40 hover:bg-[#4361EE]/[0.08] hover:text-[#4361EE] flex items-center justify-center text-white/70 transition-all duration-300 hover:-translate-y-0.5"
              aria-label="LinkedIn Profile"
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
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.hackerrank.com/profile/kishorrathod6203"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#4361EE]/40 hover:bg-[#4361EE]/[0.08] hover:text-[#4361EE] flex items-center justify-center text-white/70 transition-all duration-300 hover:-translate-y-0.5"
              aria-label="HackerRank Profile"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.052 9.05a1.375 1.375 0 0 0 0 1.944l2.19 2.185c.254.254.673.254.927 0l7.973-7.973a.516 0 0 1 .728.73l-7.325 7.325a.516.516 0 0 1-.728 0l-2.19-2.185a1.375 1.375 0 0 0-1.943 0l-2.19 2.185a1.375 1.375 0 0 0 0 1.944l9.051 9.05a1.378 1.378 0 0 0 1.944 0l9.052-9.05a1.375 1.375 0 0 0 0-1.944L14.444.414A1.374 1.374 0 0 0 13.483 0zm.014 3.96a.784.784 0 1 1 0 1.568.784.784 0 0 1 0-1.568z" />
              </svg>
            </a>
            <a
              href="mailto:kishorrathod6203@gmail.com"
              className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#4361EE]/40 hover:bg-[#4361EE]/[0.08] hover:text-[#4361EE] flex items-center justify-center text-white/70 transition-all duration-300 hover:-translate-y-0.5"
              aria-label="Send Email"
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
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT 3D CANVAS ── */}
        <motion.div
          className="flex-none w-full lg:w-[440px] max-w-full sm:max-w-[420px] lg:max-w-none lg:mt-0 mt-4 flex flex-col justify-center items-center relative z-10"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          <ThreeAvatar />
        </motion.div>
      </div>

      {/* ── FULL-WIDTH METRICS SECTION AT THE BOTTOM ── */}
      <motion.div
        className="w-full max-w-[1200px] mx-auto mt-14 grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-4 gap-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {stats.map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-[#040B18]/50 border border-white/[0.05] backdrop-blur-[18px] flex items-center gap-3.5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#4361EE]/[0.05] hover:border-[#4361EE]/25 hover:shadow-[0_15px_40px_rgba(67,97,238,0.1)] group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#4361EE]/[0.08] border border-[#4361EE]/[0.14] text-[#4361EE] transition-all duration-300 group-hover:bg-[#4361EE] group-hover:text-white group-hover:scale-[1.05] group-hover:shadow-[0_0_14px_rgba(67,97,238,0.4)] shrink-0">
              {item.icon}
            </div>
            <div className="flex flex-col items-start text-left">
              <h3 className="text-[1.35rem] m-0 font-extrabold text-white leading-tight">
                {item.value}
              </h3>
              <p className="text-[0.72rem] mt-0.5 m-0 text-[#8892A4] font-semibold uppercase tracking-wider">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default Hero;
