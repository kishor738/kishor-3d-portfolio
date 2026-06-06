// import { motion } from 'framer-motion'
// import ThreeAvatar from './ThreeAvatar'

// const stats = [
//   { value: '1.6+', label: 'Years experience' },
//   { value: '3+', label: 'Projects launched' },
//   { value: '500+', label: 'Problems solved' },
// ]

// function Hero() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.12, delayChildren: 0.15 },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 28 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
//   }

//   return (
//     <section id="hero" className="hero-section pro-hero">
//       <motion.div className="hero-copy" variants={containerVariants} initial="hidden" animate="visible">
//         <motion.p className="label hero-kicker" variants={itemVariants}>
//           Kishor Rathod
//         </motion.p>
//         <motion.h1 variants={itemVariants}>Designing polished web experiences that feel fast, clear, and memorable.</motion.h1>
//         <motion.p className="lead" variants={itemVariants}>
//           I’m Kishor Rathod, a full stack developer who turns ideas into responsive interfaces, reliable APIs, and smooth user journeys across every screen.
//         </motion.p>
//         <motion.div className="hero-actions" variants={itemVariants}>
//           <motion.a className="btn" href="#projects" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
//             View Work
//           </motion.a>
//           <motion.a className="btn btn-outline" href="#contact" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
//             Let's Talk
//           </motion.a>
//           <motion.a
//             className="btn btn-outline hero-cv-btn"
//             href="/Kishor-Rathod-Resume-Demo.txt"
//             download
//             whileHover={{ y: -3 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Download CV
//           </motion.a>
//         </motion.div>
//         <motion.div className="hero-stats" variants={itemVariants}>
//           {stats.map((stat, index) => (
//             <motion.article className="stat-card" key={stat.label} whileHover={{ y: -8 }} style={{ '--index': index }}>
//               <strong>{stat.value}</strong>
//               <span>{stat.label}</span>
//             </motion.article>
//           ))}
//         </motion.div>
//       </motion.div>
//       <motion.div
//         className="hero-visual"
//         initial={{ opacity: 0, x: 42 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
//       >
//         <ThreeAvatar />
//       </motion.div>
//     </section>
//   )
// }

// export default Hero
import { motion } from 'framer-motion';
import ThreeAvatar from './ThreeAvatar';
import './Hero.css';

const stats = [
  { value: '1.6+', label: 'Years experience' },
  { value: '3+', label: 'Projects launched' },
  { value: '500+', label: 'Problems solved' },
]

function Hero() {
  return (
    <section id="hero" className="hero">

      {/* LEFT CONTENT */}
      <motion.div
        className="hero-left"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="hero-name-container"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.07, delayChildren: 0.3 },
            },
          }}
        >
          {"Kishor Rathod".split('').map((char, i) => (
            <motion.span
              key={i}
              className="hero-name-char"
              variants={{
                hidden: { opacity: 0, y: 30, rotate: -15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    duration: 0.6,
                  },
                },
              }}
              whileHover={{ scale: 1.2, color: "#38bdf8" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        <h1>
          Crafting <span>Next-Level</span><br />
          Web Experiences
        </h1>

        <p className="hero-desc">
          Full Stack Developer building fast, scalable, and visually stunning applications
          using React, Three.js, and modern backend systems.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">View Work</a>
          <a href="#contact" className="btn-outline">Let's Talk</a>
        </div>

        <div className="hero-stats">
          {stats.map((item, i) => (
            <div className="stat" key={i}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT 3D */}
      <motion.div
        className="hero-right"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <ThreeAvatar />
      </motion.div>

    </section>
  )
}

export default Hero