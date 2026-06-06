import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <motion.header
      className="cyber-nav pro-nav"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.a href="#hero" className="logo nav-logo" onClick={closeMenu} whileHover={{ y: -1 }}>
        <span>Kishor</span>.dev
      </motion.a>

      <div className="nav-right">
        <nav className="nav-links nav-links-desktop" aria-label="Primary navigation">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="nav-item"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.06 + 0.1, ease: 'easeOut' }}
              whileHover={{ y: -2 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <motion.a href="#contact" className="btn-cyber nav-hire" whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
          Hire Me
        </motion.a>

        <button
          className={`nav-menu-toggle ${isOpen ? 'active' : ''}`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="mobile-nav-panel"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <a className="mobile-hire" href="#contact" onClick={closeMenu}>
              Hire Me
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
