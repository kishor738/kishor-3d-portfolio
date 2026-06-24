import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 w-full z-[100] overflow-visible flex items-center justify-between transition-all duration-300 animate-[slideDown_0.6s_ease-out] backdrop-blur-[20px] border-b border-white/[0.06] bg-[#040B18]/90 py-3.5 px-3 sm:px-5 md:px-[clamp(14px,4vw,40px)]"
    >
      {" "}
      {/* KR Logo Avatar + Brand name */}
      <motion.a
        href="#hero"
        className="flex items-center gap-2.5 flex-[0_0_auto] cursor-pointer hover:opacity-90 transition-opacity duration-300"
        onClick={closeMenu}
        whileHover={{ y: -1 }}
      >
        <span className="w-8 h-8 rounded-full flex items-center justify-center text-[0.72rem] font-black text-white bg-gradient-to-br from-[#4361EE] to-[#6366f1] shadow-[0_0_12px_rgba(67,97,238,0.4)] shrink-0">
          KR
        </span>
        <span className="text-[0.95rem] sm:text-[1rem] font-bold text-white tracking-[-0.02em]">
          Kishor<span className="text-[#4361EE]">.dev</span>
        </span>
      </motion.a>
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Desktop nav */}
        <nav
          className="min-[900px]:flex hidden gap-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] items-center"
          aria-label="Primary navigation"
        >
          {navItems.map((item, idx) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-[0.875rem] font-medium transition-all duration-300 relative py-2 px-4 rounded-full text-white/60 hover:text-white hover:bg-white/[0.07]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.06 + 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -1 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Moon Icon Toggle (Decorative dark-mode outline) */}
        <button
          type="button"
          className="min-[900px]:inline-flex hidden items-center justify-center w-9 h-9 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all text-white/80 hover:text-white"
          aria-label="Toggle dark mode"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        {/* Hire Me CTA — gradient */}
        <motion.a
          href="#contact"
          className="min-[900px]:inline-flex hidden py-2.5 px-5 rounded-lg bg-gradient-to-r from-[#4361EE] to-[#6366F1] text-white text-[0.875rem] font-semibold transition-all duration-300 shadow-[0_4px_14px_rgba(67,97,238,0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(67,97,238,0.4)] min-w-max items-center gap-2"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          Hire Me
        </motion.a>

        {/* Hamburger — mobile */}
        <button
          className="min-[900px]:hidden flex w-[38px] h-[38px] border border-white/10 rounded-lg bg-white/[0.04] items-center justify-center flex-col gap-[5px] text-white"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span
            className={`w-[16px] h-[1.5px] rounded-full bg-current transition-all duration-300 ${isOpen ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span
            className={`w-[16px] h-[1.5px] rounded-full bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-[16px] h-[1.5px] rounded-full bg-current transition-all duration-300 ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </div>
      {/* Mobile dropdown */}
      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="absolute top-[calc(100%+10px)] left-3 right-3 z-[999] grid gap-2 rounded-2xl border border-[#1E293B] bg-[#040B18] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.75)]"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="mb-2 border-b border-white/5 pb-3">
              <h3 className="text-base font-semibold text-white">Navigation</h3>
            </div>

            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0B1425] px-4 py-3 text-[0.95rem] font-medium text-white transition-all duration-300 hover:border-[#4361EE]/30 hover:bg-[#101B31]"
              >
                {item.label}
                <span className="text-white/30">→</span>
              </a>
            ))}

            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#4361EE] to-[#6366F1] py-3 text-[0.95rem] font-semibold text-white shadow-[0_8px_20px_rgba(67,97,238,0.35)]"
            >
              Hire Me
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
