import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillsData } from '../data/skills.js'
import projects from '../data/projects.js'

// Custom high-quality SVG Icons for each tech stack item
const TechIcon = ({ type, color }) => {
  const icons = {
    html: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 3h16l-1.5 16L12 21l-6.5-2L4 3z" />
        <path d="M12 7h3.5l-.5 4.5H12M12 11.5H8.5l-.2-2H12M8.1 7h7.8M9 15.5l3 1 3-1V15" />
      </svg>
    ),
    css: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 3h16l-1.5 16L12 21l-6.5-2L4 3z" />
        <path d="M8.5 7h7M8.8 10h6.4l-.5 4.5-2.7.8-2.7-.8-.2-2" />
      </svg>
    ),
    javascript: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M16 11.5c.6.3 1 .9 1 1.5 0 1.4-1.1 2-2.5 2a3 3 0 0 1-2.5-1M11.5 14.5c.3.5.7.5 1 .5h.5c.8 0 1-.4 1-.8v-.4c0-.4-.2-.8-.8-1l-1.4-.5c-1-.4-1.8-1-1.8-2.3v-.5c0-1.2 1-2 2.3-2 1.3 0 2 .5 2.5 1.5" />
      </svg>
    ),
    react: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    nextjs: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M7.5 17.5L14.2 9M14.2 9v6.5M14.2 9l2.3 8.5" />
      </svg>
    ),
    reactnative: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M12 18h.01M9 6h6" />
        <ellipse cx="12" cy="12" rx="5" ry="1.8" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="5" ry="1.8" transform="rotate(150 12 12)" />
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 8h4M11 8v8M14.5 13.5c.3.5.8.7 1.3.7.8 0 1.2-.5 1.2-1.2 0-.6-.3-.9-1-1.2l-1-.4c-.9-.4-1.5-.9-1.5-1.9v-.3c0-1 .8-1.7 1.8-1.7 1 0 1.5.5 1.7 1.2" />
      </svg>
    ),
    tailwind: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 6c-1.8 0-3 1.2-3.6 3.6.6-.6 1.4-.9 2.4-.9 1.8 0 3.2 1.4 3.9 4.2.3-1.8-.3-3.3-1.8-4.5.9.3 1.5.9 1.8 1.8.3.9-.3 2.1-1.8 3.6-1.5 1.5-2.7 1.8-3.6 1.2.6.3 1.2.3 1.8 0 .9-.6 1.5-1.8 1.8-3.6C12.3 8.4 10.9 7 9.1 7c-1.8 0-3 1.2-3.6 3.6.6-.6 1.4-.9 2.4-.9" />
      </svg>
    ),
    bootstrap: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M8.5 7h4c1.4 0 2.2.7 2.2 1.8 0 .9-.6 1.4-1.3 1.6.9.2 1.6.8 1.6 1.8 0 1.3-.9 2.1-2.5 2.1h-4V7zm1.8 1.5v2h2.2c.4 0 .7-.2.7-.8 0-.5-.3-.7-.7-.7h-2.2zm0 3.5v2.2h2.5c.4 0 .8-.2.8-.8s-.4-.8-.8-.8h-2.5z" />
      </svg>
    ),
    java: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 15c0 2.5 3 3 6 3s6-.5 6-3" />
        <path d="M8 18c0 1.5 2 2 4 2s4-.5 4-2" />
        <path d="M11 2c-.5 1-1 2.5 0 4M14 1.5c-.5 1-1.5 3 0 4.5" />
        <path d="M4 11h16a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2a1 1 0 0 1 1-1z" />
      </svg>
    ),
    python: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2c-2.8 0-3 .2-3 1v2h3v1H9C6.8 6 6 6.8 6 9v3c0 .6.4 1 1 1h1v-2c0-1.7 1.3-3 3-3h3V5c0-.8-.2-1-3-1V2zm0 20c2.8 0 3-.2 3-1v-2h-3v-1h3c2.2 0 3-.8 3-3V9c0-.6-.4-1-1-1h-1v2c0 1.7-1.3 3-3 3H9v4c0 .8.2 1 3 1v2z" />
        <circle cx="9.5" cy="5.5" r="0.75" fill="currentColor" />
        <circle cx="14.5" cy="18.5" r="0.75" fill="currentColor" />
      </svg>
    ),
    jdbc: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="7" ry="2" />
        <path d="M5 5v5c0 1.1 3.1 2 7 2s7-.9 7-2V5M5 10v5c0 1.1 3.1 2 7 2s7-.9 7-2v-5M12 17v4M8 21h8" />
      </svg>
    ),
    jsp: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M8 13l-2 2 2 2M12 17l2-2-2-2" />
      </svg>
    ),
    hibernate: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3v18M18 3v18M6 12h12M9 7h6M9 17h6" />
      </svg>
    ),
    spring: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.5 9 8.5 9.8V13.5c-1.5-.2-2.5-1.2-2.5-2.5s2-4 4-5c1 1.5 2 3.5 1 5.5s-2 1.5-2.5 1v1.5c2 .2 3.5 1.5 3.5 3s-2.5 3.5-4 4.8c4-.5 7.5-4 7.5-8.8 0-5.5-4.5-10-10-10z" />
      </svg>
    ),
    springboot: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.5 9 8.5 9.8V13.5c-1.5-.2-2.5-1.2-2.5-2.5s2-4 4-5" />
        <circle cx="16" cy="14" r="5" />
        <path d="M16 11v6M13 14h6" />
      </svg>
    ),
    microservices: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="4" r="2" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="20" cy="12" r="2" />
        <circle cx="12" cy="20" r="2" />
        <path d="M12 6v3M12 15v3M6 12h3M15 12h3" />
      </svg>
    ),
    sql: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
    swagger: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    git: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 15V9a4 4 0 0 0-4-4H9M6 9v6" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    postman: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 22h20L12 2zM12 9v6M9 12h6" />
      </svg>
    ),
    vscode: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6.5L18.5 2v20L4 17.5M18.5 12L4 9M18.5 12L4 15" />
      </svg>
    ),
    docker: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12.5H2v1a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5v-1zM6 12.5V8M10 12.5V6M14 12.5V6M18 12.5V8" />
        <rect x="5" y="4" width="2" height="2" rx="0.5" />
        <rect x="9" y="4" width="2" height="2" rx="0.5" />
        <rect x="13" y="4" width="2" height="2" rx="0.5" />
      </svg>
    ),
    jira: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.5 3L2 12.5v7L11.5 10l9.5 9.5v-7L11.5 3z" />
      </svg>
    )
  }

  return (
    <div style={{ color: color || '#fff' }} className="tech-icon-svg-wrapper">
      {icons[type] || (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )}
    </div>
  )
}

function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(() => skillsData.Frontend?.skills?.[0]?.name ?? null)
  const [activeCategory, setActiveCategory] = useState('Frontend')

  const categories = Object.keys(skillsData)
  const currentCategoryData = skillsData[activeCategory]
  
  // Find projects that match the hovered skill, or the active category
  const getLinkedProjects = (skillName) => {
    if (!skillName) return []
    // Match logic: checks if the project tech array contains the skill name (case insensitive)
    return projects.filter(proj => 
      proj.tech.some(t => 
        t.toLowerCase().replace(/\s+/g, '') === skillName.toLowerCase().replace(/\s+/g, '') ||
        t.toLowerCase().includes(skillName.toLowerCase()) ||
        skillName.toLowerCase().includes(t.toLowerCase())
      )
    )
  }

  const activeSkillName = hoveredSkill || selectedSkill
  const activeHoverSkill = currentCategoryData.skills.find(s => s.name === activeSkillName)
  const linkedProjects = activeHoverSkill ? getLinkedProjects(activeHoverSkill.name) : []

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setHoveredSkill(null)
    setSelectedSkill(skillsData[category]?.skills?.[0]?.name ?? null)
  }

  return (
    <section id="skills" className="skills-section pro-skills-section">
      {/* Decorative Blur Orbs */}
      <div className="skills-orb skills-orb-1" style={{ '--orb-color': currentCategoryData.color }}></div>
      <div className="skills-orb skills-orb-2" style={{ '--orb-color': '#4f46e5' }}></div>

      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <motion.p 
            className="section-label"
            style={{ color: currentCategoryData.color }}
            animate={{ color: currentCategoryData.color }}
          >
            Technical Core
          </motion.p>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-description">
            A carefully curated and structured overview of my full-stack capabilities, backend systems design, and workflow tools.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="skills-category-selector">
          {categories.map((category) => {
            const isActive = activeCategory === category
            const catColor = skillsData[category].color
            return (
              <button
                key={category}
                className={`category-button ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
                style={{ 
                  '--category-color': catColor,
                  '--category-rgb': skillsData[category].rgb
                }}
              >
                <span className="category-icon">{skillsData[category].icon}</span>
                <span className="category-name">{category}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    className="category-underline" 
                    style={{ backgroundColor: catColor }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Dashboard Frame */}
        <div className="skills-dashboard">
          
          {/* Left Column: Interactive Diagnostic Panel */}
          <div className="diagnostic-column">
            <div className="diagnostic-card glass-panel" style={{ '--theme-color': currentCategoryData.color }}>
              <AnimatePresence mode="wait">
                {!activeHoverSkill ? (
                  <motion.div
                    key="category-summary"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="diagnostic-content default-state"
                  >
                    <div className="diagnostic-header">
                      <div className="cat-pill" style={{ backgroundColor: `rgba(${currentCategoryData.rgb}, 0.15)`, color: currentCategoryData.color }}>
                        {currentCategoryData.icon} {activeCategory} Hub
                      </div>
                      <h3>Engineered Solutions</h3>
                    </div>
                    
                    <p className="diagnostic-summary">
                      {currentCategoryData.summary}
                    </p>

                    <div className="quick-stats-grid">
                      <div className="quick-stat">
                        <span className="stat-label">Total Techs</span>
                        <strong className="stat-val" style={{ color: currentCategoryData.color }}>
                          {currentCategoryData.skills.length}
                        </strong>
                      </div>
                      <div className="quick-stat">
                        <span className="stat-label">Level</span>
                        <strong className="stat-val">Core</strong>
                      </div>
                    </div>

                    <div className="recruiter-tip">
                      <span className="tip-icon">i</span>
                      <p>Hover or click any skill badge to lock its active profile, technical depth, primary use cases, and project integrations.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeHoverSkill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="diagnostic-content skill-active-state"
                  >
                    <div className="diagnostic-header">
                      <div className="cat-pill" style={{ backgroundColor: `rgba(${currentCategoryData.rgb}, 0.15)`, color: currentCategoryData.color }}>
                        Active Profile
                      </div>
                      <h3>{activeHoverSkill.name}</h3>
                    </div>

                    <div className="meter-section">
                      <div className="gauge-wrapper">
                        {/* Circular Progress Gauge */}
                        <svg className="circular-gauge" viewBox="0 0 100 100">
                          <circle className="gauge-bg" cx="50" cy="50" r="42" />
                          <motion.circle 
                            className="gauge-progress" 
                            cx="50" 
                            cy="50" 
                            r="42"
                            style={{ 
                              stroke: currentCategoryData.color,
                              strokeDasharray: '264',
                            }}
                            initial={{ strokeDashoffset: 264 }}
                            animate={{ strokeDashoffset: 264 - (264 * activeHoverSkill.level) / 100 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </svg>
                        <div className="gauge-text">
                          <span className="percentage" style={{ color: currentCategoryData.color }}>{activeHoverSkill.level}%</span>
                          <span className="label">Mastery</span>
                        </div>
                      </div>

                      <div className="use-case-box">
                        <span className="use-case-title">Core Use Case</span>
                        <p>{activeHoverSkill.useCase}</p>
                      </div>
                    </div>

                    <div className="skill-details-text">
                      <span className="details-title">Technical Description</span>
                      <p>{activeHoverSkill.desc}</p>
                    </div>

                    {/* Integrated Project Mapping */}
                    <div className="linked-projects-wrapper">
                      <span className="projects-title">Portfolio Integration</span>
                      {linkedProjects.length > 0 ? (
                        <div className="linked-projects-list">
                          {linkedProjects.map((p, idx) => (
                            <a href="#projects" key={idx} className="project-link-badge">
                              <span className="proj-dot" style={{ backgroundColor: currentCategoryData.color }}></span>
                              <span className="proj-title">{p.title}</span>
                              <span className="proj-arrow">-&gt;</span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="empty-projects">
                          <span>Primary Skill (Core competency applied across minor systems)</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Skills Badges Grid */}
          <div className="skills-grid-column">
            <motion.div 
              layout 
              className="skills-grid"
              key={activeCategory}
            >
              {currentCategoryData.skills.map((skill, idx) => {
                const isSelected = selectedSkill === skill.name
                const isActive = activeSkillName === skill.name
                return (
                  <motion.div
                    key={skill.name}
                    className={`skill-card-wrapper ${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''}`}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    onPointerEnter={() => setHoveredSkill(skill.name)}
                    onPointerLeave={() => setHoveredSkill(null)}
                    onClick={() => setSelectedSkill(skill.name)}
                    onFocus={() => setHoveredSkill(skill.name)}
                    onBlur={() => setHoveredSkill(null)}
                    role="button"
                    tabIndex="0"
                    aria-pressed={isSelected}
                    style={{ 
                      '--skill-color': currentCategoryData.color,
                      '--skill-rgb': currentCategoryData.rgb
                    }}
                  >
                    <div className="skill-card-bg"></div>
                    <div className="skill-card-glow"></div>
                    <div className="skill-card-border"></div>
                    
                    <div className="skill-card-content">
                      <TechIcon type={skill.iconKey} color={isActive ? currentCategoryData.color : '#cbd5e1'} />
                      <span className="skill-badge-name">{skill.name}</span>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
          
        </div>

        {/* Global Summary Statistics */}
        <div className="skills-summary-grid">
          <div className="summary-item" style={{ '--delay': '0.1s' }}>
            <div className="summary-number">3</div>
            <div className="summary-label">Tech Domains</div>
          </div>
          <div className="summary-item" style={{ '--delay': '0.2s' }}>
            <div className="summary-number">23</div>
            <div className="summary-label">Key Competencies</div>
          </div>
          <div className="summary-item" style={{ '--delay': '0.3s' }}>
            <div className="summary-number">99%</div>
            <div className="summary-label">Clean Code</div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Skills
