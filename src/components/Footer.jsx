const navigationLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/kishor738" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kishor-rathod-1b4a34221/",
  },
  { label: "Hackerrank", href: "https://www.hackerrank.com/kishorrathod6203" },
  { label: "Email", href: "mailto:kishorrathod6203@gmail.com" },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#040B18] border-t border-white/[0.05] py-10 sm:py-12 px-5 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 pb-10 border-b border-white/[0.05]">
          {/* Brand */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="
            w-10 h-10
            rounded-full
            flex items-center justify-center
            font-black
            text-sm
            text-white
            bg-gradient-to-br
            from-[#4361EE]
            to-[#6366F1]
            shadow-[0_0_20px_rgba(67,97,238,.4)]
          "
              >
                KR
              </span>

              <h3 className="text-white font-extrabold text-xl">
                Kishor Rathod
              </h3>
            </div>

            <p
              className="
          text-white/60
          max-w-md
          leading-relaxed
          text-sm
        "
            >
              Building responsive React products with clean architecture,
              refined interfaces, and smooth user experiences.
            </p>

            <a
              href="mailto:kishorrathod6203@gmail.com"
              className="
            mt-6
            inline-flex
            items-center
            justify-center
            px-5 py-3
            rounded-xl
            bg-gradient-to-r
            from-[#4361EE]
            to-[#6366F1]
            text-white
            text-sm
            font-semibold
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-[0_10px_30px_rgba(67,97,238,.35)]
          "
            >
              Start a Conversation
            </a>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10">
            <div>
              <h4
                className="text-white/80 text-xs uppercase tracking-[3px] font-bold mb-5">
                Navigation
              </h4>

              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/50 text-sm transition-all duration-300 hover:text-[#38BDF8] hover:translate-x-1
                    inline-block">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="
            text-white/80
            text-xs
            uppercase
            tracking-[3px]
            font-bold
            mb-5
          "
              >
                Connect
              </h4>

              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel="noreferrer"
                      className="text-white/50 text-sm transition-all duration-300 hover:text-[#38BDF8] hover:translate-x-1
                    inline-block
                  "
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center
      sm:text-left">
          <p className="text-white/40 text-xs sm:text-sm">
            © 2026 Kishor Rathod. Built with React, Vite & Tailwind CSS.
          </p>

          <div className="flex items-center gap-2 text-white/30 text-xs sm:text-sm">
            <span>Built to Ship</span>
            <span>•</span>
            <span>Designed to Scale</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
