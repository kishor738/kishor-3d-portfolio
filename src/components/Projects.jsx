import { motion } from 'framer-motion'
import projects from '../data/projects.js'

const previewThemes = [
  {
    accent: 'linear-gradient(135deg, #5eead4, #67e8f9)',
    icon: '01',
    badge: 'Frontend',
  },
  {
    accent: 'linear-gradient(135deg, #67e8f9, #818cf8)',
    icon: '02',
    badge: 'Full Stack',
  },
  {
    accent: 'linear-gradient(135deg, #5eead4, #818cf8)',
    icon: '03',
    badge: 'Realtime',
  },
]

function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 26, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="projects" className="projects-section section pro-projects-section">
      <div className="section-heading pro-section-heading">
        <p>Selected Work</p>
        <h2>Focused projects built for clarity, speed, and practical use.</h2>
      </div>

      <motion.div
        className="project-grid pro-project-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {projects.map((project, index) => {
          const theme = previewThemes[index] ?? previewThemes[0]

          return (
            <motion.article
              key={project.title}
              className="project-card pro-project-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="project-preview" aria-hidden="true" style={{ '--preview-gradient': theme.accent }}>
                <span className="preview-orb" />
                <span className="preview-line line-one" />
                <span className="preview-line line-two" />
                <span className="preview-node node-one" />
                <span className="preview-node node-two" />
                <span className="preview-icon-badge">{theme.icon}</span>
                <span className="preview-chip">{theme.badge}</span>
              </div>

              <div className="project-card-header">
                <span className="label">{project.type}</span>
                <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
              </div>

              <h3>{project.title}</h3>
              <p className="project-summary">{project.description}</p>

              <div className="project-highlights">
                {project.highlights?.slice(0, 2).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="project-tags">
                {project.tech.slice(0, 5).map((item) => (
                  <motion.span key={item} className="project-tag" whileHover={{ y: -1 }}>
                    {item}
                  </motion.span>
                ))}
                {project.tech.length > 5 && <span className="project-tag more-tag">+{project.tech.length - 5}</span>}
              </div>

              <motion.a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="case-study-link"
                whileHover={{ x: 4 }}
              >
                View Case Study <span className="link-arrow">-&gt;</span>
              </motion.a>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}

export default Projects
