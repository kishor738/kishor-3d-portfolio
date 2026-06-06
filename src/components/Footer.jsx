import { motion } from 'framer-motion'

const navigationLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/kishor738' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kishor-rathod-1b4a34221/' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/kishorrathod6203/' },
  { label: 'Email', href: 'mailto:kishorrathod6203@gmail.com' },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer pro-footer">
      <div className="footer-container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="footer-brand">
            <p className="footer-kicker">Frontend Developer</p>
            <h3 className="footer-logo">Kishor Rathod</h3>
            <p className="footer-description">
              Building responsive React products with clean architecture, refined interfaces, and smooth interaction.
            </p>
            <a className="footer-cta" href="mailto:kishorrathod6203@gmail.com">
              Start a conversation
            </a>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-title">Navigation</h4>
              <ul className="footer-list">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <motion.a href={link.href} whileHover={{ x: 4 }}>
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Connect</h4>
              <ul className="footer-list">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <motion.a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" whileHover={{ x: 4 }}>
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            Copyright {currentYear} Kishor Rathod. Built with React, Vite, Framer Motion, and Three.js.
          </p>
          <div className="footer-credits">
            <a href="#hero" className="footer-credit-link">Back to top</a>
            <span className="separator">/</span>
            <a href="#projects" className="footer-credit-link">Selected work</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
