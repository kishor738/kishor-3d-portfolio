import './App.css'
import { useEffect } from 'react'
import GlobalScene3D from './components/GlobalScene3D.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  // Scroll reveal observer to animate sections on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    )

    const sections = document.querySelectorAll('section')
    sections.forEach((sec) => {
      sec.classList.add('reveal-on-scroll')
      observer.observe(sec)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app-shell">
      <GlobalScene3D mode="particles" theme="dark" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App