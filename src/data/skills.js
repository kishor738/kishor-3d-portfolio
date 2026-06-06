const skillsData = {
  'Frontend': {
    color: '#06b6d4',
    rgb: '6, 182, 212',
    icon: '🎨',
    summary: 'Developing interactive, visually stunning, and highly responsive user interfaces using modern frameworks and cutting-edge styling solutions.',
    skills: [
      {
        name: 'HTML',
        level: 95,
        desc: 'Semantic structure, web accessibility (a11y), and SEO-friendly document construction.',
        useCase: 'Building clean, compliant document structures for optimal crawlability and rendering.',
        iconKey: 'html'
      },
      {
        name: 'CSS',
        level: 92,
        desc: 'Advanced layouts using Flexbox, CSS Grid, custom properties, keyframe animations, and transitions.',
        useCase: 'Designing responsive web layouts and fluid, interactive styling components.',
        iconKey: 'css'
      },
      {
        name: 'JavaScript',
        level: 95,
        desc: 'Modern ES6+ syntax, asynchronous control flow, DOM API integration, and performance tuning.',
        useCase: 'Powering rich, client-side interactions and asynchronous state manipulation.',
        iconKey: 'javascript'
      },
      {
        name: 'React Js',
        level: 95,
        desc: 'Virtual DOM, component life cycles, advanced custom hooks, Context API, and state optimization.',
        useCase: 'Constructing robust, single-page application architectures with reusable modules.',
        iconKey: 'react'
      },
      {
        name: 'Next Js',
        level: 90,
        desc: 'Server-Side Rendering (SSR), Static Site Generation (SSG), incremental static regeneration, and API routing.',
        useCase: 'Building fast, SEO-optimized, production-ready full-stack React projects.',
        iconKey: 'nextjs'
      },
      {
        name: 'React Native',
        level: 85,
        desc: 'Cross-platform mobile compilation, native bridge communications, and mobile device integration.',
        useCase: 'Crafting responsive mobile applications for iOS and Android from a single codebase.',
        iconKey: 'reactnative'
      },
      {
        name: 'TypeScript',
        level: 90,
        desc: 'Static typing, custom type definitions, interfaces, generics, and strict compile-time safety.',
        useCase: 'Preventing run-time bugs and facilitating scale in collaborative codebases.',
        iconKey: 'typescript'
      },
      {
        name: 'Tailwind',
        level: 95,
        desc: 'Utility-first CSS styling, custom configuration, responsive utilities, and micro-interaction utilities.',
        useCase: 'Enabling rapid styling iterations without bloating the CSS footprint.',
        iconKey: 'tailwind'
      },
      {
        name: 'Bootstrap',
        level: 88,
        desc: 'Responsive grid systems, styling defaults, responsive templates, and quick form layouts.',
        useCase: 'Building grid layouts and rapid wireframes for early-stage interfaces.',
        iconKey: 'bootstrap'
      }
    ]
  },
  'Backend': {
    color: '#a855f7',
    rgb: '168, 85, 247',
    icon: '⚙️',
    summary: 'Developing enterprise-grade backends with high concurrency, robust database interactions, and resilient microservices architectures.',
    skills: [
      {
        name: 'Core Java',
        level: 90,
        desc: 'Object-Oriented Programming, Collection Framework, Multi-threading, Exception Handling, and Java Stream API.',
        useCase: 'Writing highly secure, platform-independent enterprise business logic.',
        iconKey: 'java'
      },
      {
        name: 'Core Python Basic',
        level: 80,
        desc: 'Basic syntax, standard libraries, scripting, data automation, and backend utilities.',
        useCase: 'Scripting auxiliary micro-processes and automating developer workloads.',
        iconKey: 'python'
      },
      {
        name: 'JDBC',
        level: 85,
        desc: 'Relational database connectivity, SQL statement processing, result mapping, and transaction boundaries.',
        useCase: 'Executing direct query processes and establishing database pipelines.',
        iconKey: 'jdbc'
      },
      {
        name: 'JSP',
        level: 75,
        desc: 'Server-side rendering templates, Servlet linking, dynamic HTML generation, and custom tags.',
        useCase: 'Serving dynamic content via server-side execution cycles.',
        iconKey: 'jsp'
      },
      {
        name: 'Hibernate',
        level: 88,
        desc: 'Object-Relational Mapping (ORM), Entity Lifecycle, HQL/Criteria queries, and caching levels.',
        useCase: 'Mapping Java objects to SQL tables automatically to reduce boilerplate JDBC code.',
        iconKey: 'hibernate'
      },
      {
        name: 'Spring',
        level: 90,
        desc: 'Dependency Injection (DI), Inversion of Control (IoC), Aspect-Oriented Programming (AOP), and Spring MVC.',
        useCase: 'Providing modular architecture and loose coupling across components.',
        iconKey: 'spring'
      },
      {
        name: 'Spring Boot',
        level: 92,
        desc: 'Auto-configuration, starter dependencies, embedded server deployment, and Actuator metrics.',
        useCase: 'Spinning up independent production-ready RESTful web services in minutes.',
        iconKey: 'springboot'
      },
      {
        name: 'Microservice Architecture',
        level: 88,
        desc: 'Service Discovery (Eureka), API Gateway (Spring Cloud), Feign Client, circuit breakers, and config server.',
        useCase: 'Designing scalable systems split into isolated, fault-tolerant services.',
        iconKey: 'microservices'
      },
      {
        name: 'SQL',
        level: 90,
        desc: 'Complex joins, subqueries, relational indexing, query performance tuning, and DDL/DML transactions.',
        useCase: 'Storing, manipulating, and retrieving tabular relational structures efficiently.',
        iconKey: 'sql'
      }
    ]
  },
  'Tools': {
    color: '#ec4899',
    rgb: '236, 72, 153',
    icon: '🛠️',
    summary: 'Leveraging standard development tools, containers, API environments, and project trackers for rapid, modern delivery.',
    skills: [
      {
        name: 'Swagger',
        level: 92,
        desc: 'OpenAPI specification, auto-generating documentation, visual sandbox testing, and endpoint mocks.',
        useCase: 'Presenting intuitive, interactive API sandboxes to integrate front-to-back layers.',
        iconKey: 'swagger'
      },
      {
        name: 'Git',
        level: 92,
        desc: 'Distributed version control, branching models, stash, commit history rebase, and conflict resolution.',
        useCase: 'Managing local source code integrity and revision history.',
        iconKey: 'git'
      },
      {
        name: 'GitHub',
        level: 90,
        desc: 'Collaborative code reviews, pull request workflows, issue tracking, and automated CI/CD actions.',
        useCase: 'Hosting remote code bases and running deployment build scripts.',
        iconKey: 'github'
      },
      {
        name: 'Postman',
        level: 92,
        desc: 'API client execution, custom request collections, environment variables, and pre-request scripts.',
        useCase: 'Mocking, debugging, and verifying backend endpoints pre-integration.',
        iconKey: 'postman'
      },
      {
        name: 'VS Code',
        level: 95,
        desc: 'Interactive debugger, local terminal, workspace setup, extensions, and code formatting hooks.',
        useCase: 'Serving as the primary local editor for clean development cycles.',
        iconKey: 'vscode'
      },
      {
        name: 'Docker',
        level: 85,
        desc: 'Containerizing applications, Dockerfile writing, multi-container orchestration with Docker Compose, and image layers.',
        useCase: 'Isolating application environments for reliable, identical runs in dev and prod.',
        iconKey: 'docker'
      },
      {
        name: 'JIRA',
        level: 80,
        desc: 'Sprint planning, backlog prioritization, Epic/Story tracking, burndown metrics, and status workflows.',
        useCase: 'Tracking product features and task progression under agile frameworks.',
        iconKey: 'jira'
      }
    ]
  }
}

// Flat array for backward compatibility
const skills = [
  'React Js',
  'Next Js',
  'TypeScript',
  'JavaScript',
  'Spring Boot',
  'Tailwind CSS',
  'SQL',
  'REST APIs',
  'Docker',
  'Java',
  'Python',
  'Responsive Design'
]

export { skillsData }
export default skills
