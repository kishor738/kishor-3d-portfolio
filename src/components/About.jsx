import { useState } from 'react'
import { motion } from 'framer-motion'

const expertise = [
  {
    icon: 'R',
    title: 'Frontend Engineering',
    description: 'Scalable React and Next.js interfaces with reusable components, accessible layouts, and polished interaction systems.',
  },
  {
    icon: 'UI',
    title: 'Interface Systems',
    description: 'Responsive, accessible layouts with clean visual hierarchy, polished interaction states, and design-system thinking.',
  },
  {
    icon: 'API',
    title: 'Backend & APIs',
    description: 'REST APIs, authentication flows, Spring Boot services, Firebase, and predictable data handling across complex dashboards.',
  },
  {
    icon: 'PF',
    title: 'Performance',
    description: 'Lazy loading, code splitting, memoization, and responsive delivery tuned for fast, smooth user experiences.',
  },
]

// const achievements = [
//   { label: '1.6+', value: 'Years Experience', desc: 'Full Stack Development' },
//   { label: '3+', value: 'Projects Delivered', desc: 'Production-Level Applications' },
//   { label: '500+', value: 'Problems solved', desc: 'Solved & Mastered' },
// ]

const highlights = [
  'Multi-role dashboard development with RBAC',
  'Real-time chat and notification systems',
  'Firebase integration and authentication',
  'REST API optimization and state management',
  'Component-driven architecture',
  'Cross-browser responsive implementation',
]

function About() {
  const [activeCard, setActiveCard] = useState(0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="about" className="about-section pro-about-section">
      <div className="about-container">
        <div className="about-header">
          <p className="section-label">About Me</p>
          <h2 className="section-title">Full Stack Developer Building Scalable Digital Products</h2>
          <p className="section-subtitle">
            I turn product ideas into responsive interfaces, reliable APIs, and production-ready workflows.
          </p>
        </div>

        {/* <motion.div
          className="about-stats about-metrics-strip"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {achievements.map((stat) => (
            <motion.div key={stat.value} className="stat-box" variants={itemVariants} whileHover={{ y: -6 }}>
              <div className="stat-number">{stat.label}</div>
              <div className="stat-label">{stat.value}</div>
              <div className="stat-desc">{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div> */}

        <div className="about-content">
          <motion.div
            className="about-text-block"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-intro pro-panel">
              <span className="panel-index">01</span>
              <h3>Professional Summary</h3>
              <p>
                Full Stack Developer focused on scalable, responsive, production-ready applications. I work across
                React.js, Next.js, TypeScript, Spring Boot, REST APIs, Firebase, and dashboard interfaces with a
                strong focus on user experience, performance, and maintainable systems.
              </p>
              <p>
                My work includes multi-service platforms, real-time communication systems, role-based admin products,
                and integrated data flows where clean code, reliability, and polished interaction matter.
              </p>
            </div>

            <div className="about-highlights pro-panel">
              <span className="panel-index">02</span>
              <h3>Key Expertise</h3>
              <ul className="highlights-list">
                {highlights.map((highlight, idx) => (
                  <motion.li
                    key={highlight}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <span className="highlight-dot" />
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="about-expertise"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {expertise.map((expert, idx) => (
              <motion.div
                key={expert.title}
                className={`expertise-card ${activeCard === idx ? 'active' : ''}`}
                onMouseEnter={() => setActiveCard(idx)}
                onFocus={() => setActiveCard(idx)}
                variants={itemVariants}
                whileHover={{ x: 6 }}
                tabIndex="0"
              >
                <div className="expertise-icon">{expert.icon}</div>
                <div>
                  <h3 className="expertise-title">{expert.title}</h3>
                  <p className="expertise-text">{expert.description}</p>
                </div>
                <div className="expertise-line" />
              </motion.div>
            ))}

            <motion.div
              className="about-signal-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              <div className="signal-rings" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div>
                <span className="signal-label">Workflow</span>
                <h3>Design detail, engineering discipline, production focus.</h3>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
