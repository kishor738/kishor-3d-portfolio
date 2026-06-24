import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Official colored brand SVG Icons for all 20 mockup tech stack items
const TechIcon = ({ type }) => {
  const icons = {
    html: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M1.5 0h21l-1.9 19.1L12 24l-8.6-4.9L1.5 0z" fill="#E34F26" />
        <path d="M12 2.2V21.8l6.7-3.8 1.6-15.8H12z" fill="#EF652A" />
        <path d="M12 7.7H8.4l.2 2.3h3.4v2.3H8.9l.2 2.3h2.9v2.3L12 18V7.7z" fill="#EBEBEB" />
        <path d="M12 7.7h3.6l-.3 3.6h-3.3v-3.6zm0 5.9h3.1l-.3 3.3L12 18v-4.4z" fill="#FFFFFF" />
      </svg>
    ),
    css: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M1.5 0h21l-1.9 19.1L12 24l-8.6-4.9L1.5 0z" fill="#1572B6" />
        <path d="M12 2.2V21.8l6.7-3.8 1.6-15.8H12z" fill="#33A9DC" />
        <path d="M12 7.7H8.4l.2 2.3h3.4v2.3H8.9l.2 2.3h2.9v2.3L12 18V7.7z" fill="#EBEBEB" />
        <path d="M12 7.7h3.6l-.3 3.6h-3.3v-3.6zm0 5.9h3.1l-.3 3.3L12 18v-4.4z" fill="#FFFFFF" />
      </svg>
    ),
    javascript: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M0 0h24v24H0V0z" fill="#F7DF1E" />
        <path d="M22 22h-3.9v-3.4c0-1 0-1.8-.7-1.8-.6 0-.8.5-.8 1.1v4.1H12.7V12.9h3.9v1.2c.4-.6.9-1.2 1.8-1.2 1.9 0 3.6 1.4 3.6 3.6V22zM8.3 12.9h3.9V22H8.3v-9.1zm0-3.3h3.9v2.3H8.3V9.6z" fill="#000000" />
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M0 0h24v24H0V0z" fill="#3178C6" />
        <path d="M11.7 8.3v10.3H8.3V8.3H3.7V5.2h12.7v3.1h-4.7zm8.4.9c-.3-.5-.7-.8-1.3-.8-.7 0-1 .4-1 1 0 .5.3.8.9 1l.9.3c1 .3 1.7.9 1.7 2.1v.3c0 1.2-1 2-2.3 2-1.3 0-2.1-.5-2.5-1.5l1.9-1.1c.3.5.7.7 1.1.7.5 0 .8-.2.8-.6v-.3c0-.4-.3-.6-.8-.8l-.9-.3c-1.1-.3-1.8-.9-1.8-2.1v-.3c0-1.2.9-2 2.2-2 1.2 0 1.9.5 2.2 1.2l-1.9 1.1z" fill="#FFFFFF" />
      </svg>
    ),
    react: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
      </svg>
    ),
    nextjs: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 shrink-0">
        <circle cx="12" cy="12" r="11.5" stroke="rgba(255,255,255,0.15)" fill="#000000" />
        <path d="M7.5 17.5L14.2 9M14.2 9v6.5M14.2 9l2.3 8.5" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>
    ),
    tailwind: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 shrink-0">
        <path d="M12 6c-1.8 0-3 1.2-3.6 3.6.6-.6 1.4-.9 2.4-.9 1.8 0 3.2 1.4 3.9 4.2.3-1.8-.3-3.3-1.8-4.5.9.3 1.5.9 1.8 1.8.3.9-.3 2.1-1.8 3.6-1.5 1.5-2.7 1.8-3.6 1.2.6.3 1.2.3 1.8 0 .9-.6 1.5-1.8 1.8-3.6C12.3 8.4 10.9 7 9.1 7c-1.8 0-3 1.2-3.6 3.6.6-.6 1.4-.9 2.4-.9" fill="#38BDF8" />
      </svg>
    ),
    reactquery: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 shrink-0">
        <path d="M12 2a10 10 0 0 0-7.07 17.07A10 10 0 0 0 19.07 4.93 10 10 0 0 0 12 2zm3.89 12.3c.3.5.3 1.1-.1 1.5l-2.4 2.4c-.4.4-1 .4-1.5 0l-3.8-3.8c-.4-.4-.4-1.1 0-1.5l2.4-2.4c.4-.4 1.1-.4 1.5 0l3.9 3.8z" fill="#FF4154" />
      </svg>
    ),
    nodejs: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 shrink-0">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#339933" />
        <path d="M12 4.2v15.6l6.8-3.8V8L12 4.2z" fill="#66CC33" />
        <path d="M12 8.4l-3 1.7v3.4l3 1.7V8.4z" fill="#FFFFFF" opacity="0.9" />
      </svg>
    ),
    express: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 shrink-0">
        <rect x="2" y="3" width="20" height="18" rx="2" fill="#222" stroke="rgba(255,255,255,0.1)" />
        <path d="M5 8h4v2H7v2h2v2H7v2H5V8zm6 0h2.5c1 0 1.5.5 1.5 1.5s-.5 1.5-1.5 1.5H12v3h-1V8zm1 1.5h1.2v1H12v-1zm5-1.5h3.5v2h-2v1h2v2h-2v1H17V8z" fill="#FFFFFF" />
      </svg>
    ),
    mongodb: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M12.015.006c-.198-.01-.396.096-.516.294-.3.498-3.13 5.45-3.13 11.23a4.996 4.996 0 0 0 4.3 4.94l-.066 5.86c0 .878.583 1.488 1.488 1.488V.006zm-.322.022v21.57a1.458 1.458 0 0 0 .548-.258c.28-.242.302-3.83.302-7.14a4.996 4.996 0 0 0 3.32-4.67c0-5.78-2.83-10.73-3.13-11.23a.586.586 0 0 0-.54-.272z" fill="#47A248" />
      </svg>
    ),
    postgresql: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6.1 9.1L8 18.5a6.5 6.5 0 0 1 8 0l-.1 2.6c3.6-1.5 6.1-5 6.1-9.1 0-5.5-4.5-10-10-10zm2.5 11c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5z" fill="#336791" />
      </svg>
    ),
    firebase: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M3.9 18.2l8.2-16.1c.2-.4.7-.4.9 0l2.2 4.1-11.3 12zm16.2.2l-3.3-6.2-2.2 4.1 5.5 2.1zm-6.2-6.5l-2.4-4.5L3.3 18.8l10.6-6.9z" fill="#FFCA28" />
      </svg>
    ),
    springboot: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <circle cx="12" cy="12" r="11" fill="#6DB33F" />
        <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-1 12v-8l5 4-5 4z" fill="#FFFFFF" />
      </svg>
    ),
    rest: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 shrink-0">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="#0055FF" />
        <path d="M7 8h4v2H7v1.5h3v1.5H7V15H5V8h2zm6 0h4c.8 0 1.5.7 1.5 1.5V11c0 .8-.7 1.5-1.5 1.5h-2.5V15h-1.5V8zm1.5 1.5v1.5h2.5V9.5h-2.5z" fill="#FFFFFF" />
      </svg>
    ),
    git: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M23.3 10.9L13.1.7c-.9-.9-2.5-.9-3.4 0L7.4 3l3.6 3.6c.7-.2 1.6 0 2.2.6.6.6.8 1.5.6 2.2l3.6 3.6c.7-.2 1.6 0 2.2.6.9.9.9 2.5 0 3.4s-2.5.9-3.4 0c-.6-.6-.8-1.5-.6-2.2L12 11.2c-.2.2-.5.3-.8.3-.3 0-.6-.1-.8-.3-.6-.6-.6-1.6 0-2.2.2-.2.5-.3.8-.3.3 0 .6.1.8.3l3.6 3.6c.2-.2.5-.3.8-.3.3 0 .6.1.8.3.9.9.9 2.5 0 3.4s-2.5.9-3.4 0z" fill="#F05032" />
      </svg>
    ),
    docker: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M24 12.5H19.5v-1a5 5 0 0 0 4.5 4.5v-1H2v1A5 5 0 0 0 6.5 17h11a5 5 0 0 0 4.5-4.5v-1z" fill="#2496ED" />
        <path d="M2 13h17v-1.5c0-.8-.7-1.5-1.5-1.5H3.5a1.5 1.5 0 0 0-1.5 1.5V13z" fill="#1D6F9C" />
        <rect x="5" y="4" width="2.5" height="2.5" rx="0.5" fill="#2496ED" />
        <rect x="9" y="4" width="2.5" height="2.5" rx="0.5" fill="#2496ED" />
        <rect x="13" y="4" width="2.5" height="2.5" rx="0.5" fill="#2496ED" />
      </svg>
    ),
    aws: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.3 7.1 9.5l.5-2c-3.1-.9-5.1-3.6-5.1-6.5 0-3.9 3.1-7 7-7s7 3.1 7 7c0 2.9-2 5.6-5.1 6.5l.5 2C19 20.3 22 16.5 22 12c0-5.5-4.5-10-10-10z" fill="#FF9900" />
      </svg>
    ),
    vercel: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M12 2L2 21h20L12 2z" fill="#FFFFFF" stroke="rgba(255,255,255,0.1)" />
      </svg>
    ),
    figma: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0">
        <path d="M12 0h-4.5a4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0 4.5 4.5H12V0zM7.5 9A4.5 4.5 0 0 0 3 13.5 4.5 4.5 0 0 0 7.5 18H12V9H7.5zM7.5 18A4.5 4.5 0 0 0 3 22.5 4.5 4.5 0 0 0 7.5 27H12v-9H7.5z" fill="#F24E1E" />
        <path d="M12 0h4.5a4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5H12V0zm0 9h4.5a4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5H12V9zm4.5 9a4.5 4.5 0 0 1 0 9H12v-9h4.5z" fill="#FF7262" />
      </svg>
    ),
  }

  return icons[type] || (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-white shrink-0">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}

const skillsList = [
  // Row 1
  {
    name: 'HTML',
    category: 'Frontend',
    iconKey: 'html',
    color: '#E34F26',
    rgb: '227, 79, 38',
    level: 95,
    summary: 'Building clean, semantic markup and accessible documents that scale across devices.',
    techDesc: [
      'Semantic structure, W3C accessibility (a11y), and SEO-friendly document construction.'
    ],
    performFor: [
      'Reliable UI foundations, email templates, and performance-focused layouts.'
    ]
  },
  {
    name: 'CSS',
    category: 'Frontend',
    iconKey: 'css',
    color: '#1572B6',
    rgb: '21, 114, 182',
    level: 92,
    summary: 'Styling responsive, accessible layouts with modern constructs like Grid and Flexbox.',
    techDesc: [
      'Advanced CSS layouts using Flexbox, CSS Grid, keyframes, transitions, and variables.'
    ],
    performFor: [
      'Smooth animations, responsive page flows, and maintainable styling systems.'
    ]
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    iconKey: 'javascript',
    color: '#F7DF1E',
    rgb: '247, 223, 30',
    level: 95,
    summary: 'Implementing dynamic interactive modules, async triggers, and logic pipelines.',
    techDesc: [
      'Modern ES6+ syntax, asynchronous control flow, DOM manipulation, and performance tuning.'
    ],
    performFor: [
      'High performance client state routines, async network requests, and user controls.'
    ]
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    iconKey: 'typescript',
    color: '#3178C6',
    rgb: '49, 120, 198',
    level: 90,
    summary: 'Preventing client execution crashes via compile-time static type analysis.',
    techDesc: [
      'Custom types mapping, strict interfaces validation, generic functions, and compiler settings.'
    ],
    performFor: [
      'Enterprise scalable architectures, collaborative code codebases, and safe API inputs.'
    ]
  },
  {
    name: 'React.js',
    category: 'Frontend',
    iconKey: 'react',
    color: '#61DAFB',
    rgb: '97, 218, 251',
    level: 95,
    summary: 'Structuring modular component-driven visual layouts with high rendering efficiency.',
    techDesc: [
      'Virtual DOM reconciliation, state variables management, custom hook builders, and Context API.'
    ],
    performFor: [
      'State-driven user interfaces, responsive reusable modules, and swift page updates.'
    ]
  },
  // Row 2
  {
    name: 'Next.js',
    category: 'Frontend',
    iconKey: 'nextjs',
    color: '#FFFFFF',
    rgb: '255, 255, 255',
    level: 90,
    summary: 'Building hybrid server-side rendered layouts optimized for indexing and load times.',
    techDesc: [
      'SSR, Static Site Generation (SSG), Incremental Static Regeneration (ISR), and file routing.'
    ],
    performFor: [
      'First Contentful Paint (FCP) optimization, SEO rankings, and integrated backend routes.'
    ]
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    iconKey: 'tailwind',
    color: '#38BDF8',
    rgb: '56, 189, 248',
    level: 95,
    summary: 'Enabling rapid, flexible styling via predefined inline utilities and layouts.',
    techDesc: [
      'Utility-first layouts grid systems, dark mode filters, and custom extended configurations.'
    ],
    performFor: [
      'Extremely rapid design implementation, zero CSS file bloat, and polished breakpoints.'
    ]
  },
  {
    name: 'React Query',
    category: 'Frontend',
    iconKey: 'reactquery',
    color: '#FF4154',
    rgb: '255, 65, 84',
    level: 90,
    summary: 'Synchronizing frontend cache layers automatically with backend database endpoints.',
    techDesc: [
      'Caching state configurations, server-side mutations handlers, and query key refetches.'
    ],
    performFor: [
      'Seamless data fetching layers, automatic out-of-sync queries refresh, and offline caching.'
    ]
  },
  {
    name: 'Node.js',
    category: 'Backend',
    iconKey: 'nodejs',
    color: '#339933',
    rgb: '51, 153, 51',
    level: 92,
    summary: 'Powering high concurrency server execution, API routes, and system files controls.',
    techDesc: [
      'Non-blocking event loop handling, asynchronous core modules, and pipeline execution.'
    ],
    performFor: [
      'Highly scalable backend instances, real-time message routers, and local tool pipelines.'
    ]
  },
  {
    name: 'Express.js',
    category: 'Backend',
    iconKey: 'express',
    color: '#FFFFFF',
    rgb: '255, 255, 255',
    level: 90,
    summary: 'Routing REST requests, setting headers, and checking query criteria blocks.',
    techDesc: [
      'Request routing trees, custom middleware stacks, validation routines, and proxy mappings.'
    ],
    performFor: [
      'Fast, minimal REST backend structures, secure headers integration, and router routing.'
    ]
  },
  // Row 3
  {
    name: 'MongoDB',
    category: 'Database',
    iconKey: 'mongodb',
    color: '#47A248',
    rgb: '71, 162, 72',
    level: 88,
    summary: 'Saving flexible document models and data structures without rigid schema bounds.',
    techDesc: [
      'JSON-like document collections, query indexing filters, aggregation pipelines, and clusters.'
    ],
    performFor: [
      'Rapid prototype iterations, polymorphic entity storage, and fast read index lookups.'
    ]
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    iconKey: 'postgresql',
    color: '#336791',
    rgb: '51, 103, 145',
    level: 90,
    summary: 'Storing strict structured relations, ledgers, and queries with full ACID safety.',
    techDesc: [
      'Schema key boundaries, relational joins, table indexes mapping, and query performance tuning.'
    ],
    performFor: [
      'High auditing accuracy, complex analytical datasets, and reliable relational bounds.'
    ]
  },
  {
    name: 'Firebase',
    category: 'Database',
    iconKey: 'firebase',
    color: '#FFCA28',
    rgb: '255, 202, 40',
    level: 88,
    summary: 'Providing instant data streams, authentication routines, and simple storage files hosting.',
    techDesc: [
      'Realtime Database sync, OAuth Google/Github logins, storage folders, and cloud functions.'
    ],
    performFor: [
      'Instant real-time app sync channels, safe user logins, and quick early deployments.'
    ]
  },
  {
    name: 'Spring Boot',
    category: 'Backend',
    iconKey: 'springboot',
    color: '#6DB33F',
    rgb: '109, 179, 63',
    level: 92,
    summary: 'Spinning up secure, compiled microservices with dependency injection routing.',
    techDesc: [
      'Spring Boot auto-configurations, JPA/Hibernate mapping, MVC routing, and Actuator metrics.'
    ],
    performFor: [
      'Enterprise backend stability, multi-role endpoint checks, and high throughput queues.'
    ]
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    iconKey: 'rest',
    color: '#0055FF',
    rgb: '0, 85, 255',
    level: 95,
    summary: 'Designing HTTP interface channels to securely connect client UI and server data.',
    techDesc: [
      'RESTful routing formats, JSON payload validations, headers auth checking, and CORS settings.'
    ],
    performFor: [
      'Robust interface integration contracts, secure API gateways, and modular clients.'
    ]
  },
  // Row 4
  {
    name: 'Git',
    category: 'Tools & Others',
    iconKey: 'git',
    color: '#F05032',
    rgb: '240, 80, 50',
    level: 92,
    summary: 'Maintaining safe source code audit logs, branching rules, and version releases.',
    techDesc: [
      'Git merge workflows, rebase cleanups, conflicts resolution, stashing, and commit tags.'
    ],
    performFor: [
      'Code history preservation, team merge checkouts, and continuous deployment triggers.'
    ]
  },
  {
    name: 'Docker',
    category: 'Tools & Others',
    iconKey: 'docker',
    color: '#2496ED',
    rgb: '36, 150, 237',
    level: 85,
    summary: 'Wrapping systems dependencies inside isolated running container layers.',
    techDesc: [
      'Dockerfile setup lines, multi-container compose settings, and volume storage bounds.'
    ],
    performFor: [
      'Eliminating "works on my machine" issues, safe isolated testing, and cloud runners.'
    ]
  },
  {
    name: 'AWS',
    category: 'Tools & Others',
    iconKey: 'aws',
    color: '#FF9900',
    rgb: '255, 153, 0',
    level: 82,
    summary: 'Hosting virtual servers, balance routing networks, and storage asset files.',
    techDesc: [
      'AWS EC2 compute units, S3 secure files buckets, route paths routing, and IAM roles access.'
    ],
    performFor: [
      'High-performance cloud routing, reliable storage hosting, and scalable web endpoints.'
    ]
  },
  {
    name: 'Vercel',
    category: 'Tools & Others',
    iconKey: 'vercel',
    color: '#FFFFFF',
    rgb: '255, 255, 255',
    level: 90,
    summary: 'Running serverless code routes, domain routing checks, and edge cache layers.',
    techDesc: [
      'Continuous deployment triggers, edge functions configuration, and CDN domain routing.'
    ],
    performFor: [
      'Immediate staging preview URLs, low latency frontend delivery, and serverless routers.'
    ]
  },
  {
    name: 'Figma',
    category: 'Tools & Others',
    iconKey: 'figma',
    color: '#F24E1E',
    rgb: '242, 78, 30',
    level: 85,
    summary: 'Translating visual component specs, grids, layouts, and assets into react code.',
    techDesc: [
      'Figma design spaces layout inspect, vector assets extraction, and typography spacing.'
    ],
    performFor: [
      'Perfect implementation matching, clean style variables mapping, and asset layouts.'
    ]
  }
]

function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')
  
  // Initialize the selected skill to the first item in the list
  const [selectedSkillName, setSelectedSkillName] = useState(skillsList[0].name)
  const [hoveredSkillName, setHoveredSkillName] = useState(null)
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false)

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools & Others']

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setHoveredSkillName(null)
    
    // Auto-select the first skill in that category
    const catSkills = category === 'All' 
      ? skillsList 
      : skillsList.filter(s => s.category === category)
    if (catSkills.length > 0) {
      setSelectedSkillName(catSkills[0].name)
    }
    setMobileDetailsOpen(false)
  }

  // Active skill mapping for Left Column
  const activeSkillName = hoveredSkillName || selectedSkillName
  const activeSkill = skillsList.find(s => s.name === activeSkillName) || skillsList[0]

  // Filter skills list for the grid on the right
  const filteredSkills = activeCategory === 'All'
    ? skillsList
    : skillsList.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 relative overflow-x-clip overflow-y-visible bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05)_0%,transparent_60%)]">
      {/* Decorative Orbs */}
      <div className="absolute w-[350px] h-[350px] rounded-full blur-[140px] opacity-[0.08] pointer-events-none top-[10%] left-[-100px] bg-[#4361EE]"></div>
      <div className="absolute w-[350px] h-[350px] rounded-full blur-[140px] opacity-[0.08] pointer-events-none bottom-[15%] right-[-100px] bg-[#38BDF8]"></div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-[50px]">
          <p className="inline-block text-[0.8rem] font-bold tracking-[0.18em] uppercase mb-3 text-[#38BDF8]">
            Technical Core
          </p>
          <h2 className="text-[clamp(1.85rem,9vw,2.35rem)] sm:text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em] leading-[1.1] mt-0 mb-4 text-white">
            Skills <span className="bg-gradient-to-r from-[#38BDF8] to-[#6366F1] bg-clip-text text-transparent">&amp; Technologies</span>
          </h2>
          <p className="max-w-[620px] text-[#e8edf8]/70 text-[0.95rem] leading-[1.6] mx-auto mb-0">
            A carefully curated overview of my full-stack capabilities, based on real-world delivery and modern tools.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-nowrap overflow-x-auto scrollbar-none justify-start sm:justify-center gap-3 mb-[45px] -mx-4 px-4 pb-2 sm:flex-wrap sm:overflow-visible sm:px-0 sm:mx-0 sm:pb-0">
          {categories.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                className={`category-button ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
                style={{
                  '--category-color': '#4361EE',
                  '--category-rgb': '67, 97, 238'
                }}
              >
                <span className="z-10 text-[0.9rem]">{category}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeSkillsTabUnderline"
                    className="absolute bottom-0 left-[12%] right-[12%] h-[2px] rounded-full z-[1] bg-[#4361EE]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Compact mobile active profile drawer */}
        <div className="lg:hidden sticky top-[72px] z-30 mb-5">
          <motion.div
            layout
            className="pro-panel-glass relative overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#040B18]/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.32)]"
            style={{
              borderColor: `rgba(${activeSkill.rgb}, 0.2)`,
              boxShadow: `0 18px 45px rgba(${activeSkill.rgb}, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            <button
              type="button"
              className="flex w-full items-start justify-between gap-3 text-left"
              onClick={() => setMobileDetailsOpen((value) => !value)}
              aria-expanded={mobileDetailsOpen}
              aria-controls="mobile-active-skill-details"
            >
              <div className="min-w-0">
                <span className="inline-flex rounded-full bg-white/[0.04] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#38BDF8]">
                  Active Profile
                </span>
                <h3 className="mt-2 text-[1.18rem] font-extrabold leading-tight text-white">
                  {activeSkill.name}
                </h3>
                <p className="mt-1.5 text-[0.78rem] leading-[1.5] text-white/55">
                  Tap a skill card below to update this profile.
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[0.85rem] font-black text-white">
                {activeSkill.level}%
              </div>
            </button>

            <div className="mt-3 flex items-center gap-3">
              <div className="relative h-16 w-16 shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle className="fill-none stroke-white/[0.05] stroke-[8]" cx="50" cy="50" r="42" />
                  <motion.circle
                    className="fill-none stroke-[8] stroke-linecap-round"
                    cx="50"
                    cy="50"
                    r="42"
                    style={{
                      stroke: activeSkill.color,
                      strokeDasharray: '264',
                    }}
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (264 * activeSkill.level) / 100 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[0.92rem] font-extrabold leading-none text-white">{activeSkill.level}%</span>
                  <span className="mt-0.5 text-[0.48rem] font-bold uppercase tracking-wider text-[#8892A4]">Mastery</span>
                </div>
              </div>
              <p className="m-0 text-[0.82rem] leading-[1.55] text-white/78">
                {activeSkill.summary}
              </p>
            </div>

            <AnimatePresence initial={false}>
              {mobileDetailsOpen && (
                <motion.div
                  id="mobile-active-skill-details"
                  key={activeSkill.name}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="mt-4 max-h-[38vh] overflow-y-auto border-t border-white/[0.06] pt-4 pr-1"
                >
                  <div className="space-y-4">
                    <div>
                      <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8892A4]">
                        Technical Description
                      </span>
                      <ul className="m-0 flex list-none flex-col gap-2 p-0">
                        {activeSkill.techDesc.map((desc, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[0.82rem] leading-[1.5] text-white/75">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8892A4]">
                        Perform for
                      </span>
                      <ul className="m-0 flex list-none flex-col gap-2 p-0">
                        {activeSkill.performFor.map((desc, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[0.82rem] leading-[1.5] text-white/75">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-[0.8rem] font-semibold text-white/80 transition-all hover:border-white/[0.14] hover:bg-white/[0.06]"
              onClick={() => setMobileDetailsOpen((value) => !value)}
            >
              {mobileDetailsOpen ? 'Hide details' : 'View details'}
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${mobileDetailsOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Skills Two-Column Layout (V2 Mockup Dashboard) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.65fr] gap-6 md:gap-8 items-start">
          
          {/* LEFT COLUMN: Active Profile panel */}
          <div className="sticky top-[76px] lg:top-[100px] z-20 hidden w-full lg:block">
            <div 
              className="pro-panel-glass relative p-5 sm:p-8 max-sm:rounded-[18px] max-sm:p-4 max-sm:shadow-[0_18px_40px_rgba(0,0,0,0.28)] lg:min-h-[460px] flex flex-col justify-between transition-all duration-300"
              style={{
                border: `1px solid rgba(${activeSkill.rgb}, 0.25)`,
                boxShadow: `0 15px 45px rgba(${activeSkill.rgb}, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)`
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col h-full grow"
                >
                  {/* Active profile badge + Title */}
                  <div className="mb-4 sm:mb-5">
                    <div className="inline-flex py-1 px-3.5 rounded-full text-[0.72rem] font-bold tracking-[0.05em] uppercase mb-3" style={{ backgroundColor: `rgba(${activeSkill.rgb}, 0.12)`, color: activeSkill.color }}>
                      Active Profile
                    </div>
                    <h3 className="m-0 text-[1.45rem] sm:text-[1.65rem] font-extrabold text-white tracking-tight">{activeSkill.name}</h3>
                    <p className="mt-2 mb-0 text-[0.78rem] sm:text-[0.85rem] text-white/45 lg:hidden">
                      Tap any skill card below to update this profile.
                    </p>
                  </div>

                  {/* Circular progress gauge row */}
                  <div className="flex sm:flex-row flex-col items-start sm:items-center gap-4 sm:gap-6 mb-5 sm:mb-6">
                    <div className="relative w-[74px] h-[74px] sm:w-[84px] sm:h-[84px] shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle className="fill-none stroke-white/[0.04] stroke-[8]" cx="50" cy="50" r="42" />
                        <motion.circle 
                          className="fill-none stroke-[8] stroke-linecap-round" 
                          cx="50" 
                          cy="50" 
                          r="42"
                          style={{ 
                            stroke: activeSkill.color,
                            strokeDasharray: '264',
                          }}
                          initial={{ strokeDashoffset: 264 }}
                          animate={{ strokeDashoffset: 264 - (264 * activeSkill.level) / 100 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[1rem] sm:text-[1.12rem] font-extrabold leading-none text-white">{activeSkill.level}%</span>
                        <span className="text-[0.54rem] sm:text-[0.56rem] text-[#8892A4] uppercase mt-0.5 font-bold tracking-wider">Mastery</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="m-0 text-[0.84rem] sm:text-[0.9rem] text-white/80 leading-[1.55]">{activeSkill.summary}</p>
                    </div>
                  </div>

                  {/* Technical description lists with checkmarks */}
                  <div className="flex flex-col gap-4 mt-1 border-t border-white/[0.04] pt-4 grow justify-start">
                    <div>
                      <span className="block text-[0.72rem] font-bold text-[#8892A4] uppercase tracking-wider mb-2">Technical Description</span>
                      <ul className="list-none m-0 p-0 flex flex-col gap-2">
                        {activeSkill.techDesc.map((desc, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-white/75 text-[0.84rem] sm:text-[0.88rem] leading-[1.55]">
                            <svg className="text-[#38BDF8] shrink-0 mt-0.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="block text-[0.72rem] font-bold text-[#8892A4] uppercase tracking-wider mb-2">Perform for</span>
                      <ul className="list-none m-0 p-0 flex flex-col gap-2">
                        {activeSkill.performFor.map((desc, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-white/75 text-[0.84rem] sm:text-[0.88rem] leading-[1.55]">
                            <svg className="text-[#38BDF8] shrink-0 mt-0.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: 5x4 Grid of 20 skill cards showing colored logos */}
          <div className="w-full">
            <motion.div 
              layout 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
              key={activeCategory}
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, idx) => {
                  const isSelected = selectedSkillName === skill.name
                  const isActive = hoveredSkillName === skill.name || isSelected
                  return (
                    <motion.div
                      key={skill.name}
                      className={`skill-card-wrapper pointer-events-auto ${isActive ? 'active' : ''}`}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 15 }}
                      transition={{ duration: 0.25, delay: idx * 0.015 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      onPointerEnter={() => setHoveredSkillName(skill.name)}
                      onPointerLeave={() => setHoveredSkillName(null)}
                      onClick={() => setSelectedSkillName(skill.name)}
                      onFocus={() => setHoveredSkillName(skill.name)}
                      onBlur={() => setHoveredSkillName(null)}
                      role="button"
                      tabIndex="0"
                      aria-pressed={isSelected}
                      style={{ 
                        '--skill-color': skill.color,
                        '--skill-rgb': skill.rgb
                      }}
                    >
                      <div className="skill-card-bg"></div>
                      <div className="skill-card-glow"></div>
                      <div className="skill-card-border"></div>
                      
                      <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-center group">
                        <TechIcon type={skill.iconKey} />
                        <span className="text-[0.76rem] font-bold text-white/80 transition-colors duration-300 group-hover:text-white">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

        {/* Technical Core Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 pt-10 border-t border-white/[0.05]">
          
          {/* Tech Domains */}
          <div className="p-5 rounded-2xl bg-[#040B18]/50 border border-white/[0.04] backdrop-blur-[12px] flex items-center justify-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#4361EE]/[0.05] hover:border-[#4361EE]/25 hover:shadow-[0_15px_40px_rgba(67,97,238,0.1)] group">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#4361EE]/[0.08] border border-[#4361EE]/[0.14] text-[#4361EE] transition-all duration-300 group-hover:bg-[#4361EE] group-hover:text-white group-hover:scale-[1.05] group-hover:shadow-[0_0_14px_rgba(67,97,238,0.4)] shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <div className="flex flex-col items-start text-left">
              <h3 className="text-[1.4rem] m-0 font-extrabold text-white leading-tight">3</h3>
              <p className="text-[0.7rem] mt-0.5 m-0 text-[#8892A4] font-bold uppercase tracking-wider">Tech Domains</p>
            </div>
          </div>

          {/* Key Competencies */}
          <div className="p-5 rounded-2xl bg-[#040B18]/50 border border-white/[0.04] backdrop-blur-[12px] flex items-center justify-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#6366F1]/[0.05] hover:border-[#6366F1]/25 hover:shadow-[0_15px_40px_rgba(99,102,241,0.08)] group">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#6366F1]/[0.08] border border-[#6366F1]/[0.14] text-[#6366F1] transition-all duration-300 group-hover:bg-[#6366F1] group-hover:text-white group-hover:scale-[1.05] group-hover:shadow-[0_0_14px_rgba(99,102,241,0.4)] shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div className="flex flex-col items-start text-left">
              <h3 className="text-[1.4rem] m-0 font-extrabold text-white leading-tight">23+</h3>
              <p className="text-[0.7rem] mt-0.5 m-0 text-[#8892A4] font-bold uppercase tracking-wider">Key Competencies</p>
            </div>
          </div>

          {/* Clean Code Score */}
          <div className="p-5 rounded-2xl bg-[#040B18]/50 border border-white/[0.04] backdrop-blur-[12px] flex items-center justify-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#10B981]/[0.05] hover:border-[#10B981]/25 hover:shadow-[0_15px_40px_rgba(16,185,129,0.08)] group">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#10B981]/[0.08] border border-[#10B981]/[0.14] text-[#10B981] transition-all duration-300 group-hover:bg-[#10B981] group-hover:text-white group-hover:scale-[1.05] group-hover:shadow-[0_0_14px_rgba(16,185,129,0.4)] shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="flex flex-col items-start text-left">
              <h3 className="text-[1.4rem] m-0 font-extrabold text-white leading-tight">99%</h3>
              <p className="text-[0.7rem] mt-0.5 m-0 text-[#8892A4] font-bold uppercase tracking-wider">Clean Code Score</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Skills
