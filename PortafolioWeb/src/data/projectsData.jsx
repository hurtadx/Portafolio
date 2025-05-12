import { useState, useEffect, useRef, Suspense } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Intro2D from './components/Intro2D'
import ProjectCard from './components/ProjectCard'
import ParticleBackground from './components/ParticleBackground'
import MouseFollower from './components/MouseFollower'
import ParallaxBg from './components/ParallaxBg'
import { projects, skillsData } from './data/projectsData'
import './App.css'
import profileImage from './assets/IMG/uy.jpg';

const ScrollIndicator = ({ sections, activeSection, onClickIndicator }) => {
  return (
    <div className="scroll-indicator-container">
      {sections.map((section, index) => (
        <div 
          key={section}
          className={`scroll-indicator ${activeSection === section ? 'active' : ''}`}
          onClick={() => onClickIndicator(section)}
          aria-label={`Ir a sección ${section}`}
        />
      ))}
    </div>
  );
};


const AnimatedTitle = ({ children, delay = 0 }) => (
  <span className="animated-title">
    <span 
      className="animated-title-inner"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  </span>
);


function MainPortfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const portfolioRef = useRef(null);
  const sections = ['home', 'projects', 'about', 'contact'];
  

  const [homeRef, homeInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.2 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.2 });
  const [contactRef, contactInView] = useInView({ threshold: 0.2 });
  

  const [projectsContentRef, projectsContentInView] = useInView({ 
    triggerOnce: false,
    threshold: 0.1
  });
  const [aboutContentRef, aboutContentInView] = useInView({ 
    triggerOnce: false,
    threshold: 0.05  
  });
  const [contactContentRef, contactContentInView] = useInView({ 
    triggerOnce: false,
    threshold: 0.1
  });

  
  useEffect(() => {
    const handleScroll = () => {
      if (!portfolioRef.current) return;
      
      const currentScrollY = portfolioRef.current.scrollTop;
      
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const portfolioElement = portfolioRef.current;
    if (portfolioElement) {
      portfolioElement.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (portfolioElement) {
        portfolioElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lastScrollY]);


  useEffect(() => {
    if (homeInView) setActiveSection('home');
    else if (projectsInView) setActiveSection('projects');
    else if (aboutInView) setActiveSection('about');
    else if (contactInView) setActiveSection('contact');
  }, [homeInView, projectsInView, aboutInView, contactInView]);


  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const portfolio = portfolioRef.current;
      if (portfolio) {
        const sectionTop = section.offsetTop;
        portfolio.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
      }
    }
  };


  const handleIndicatorClick = (section) => {
    scrollToSection(section);
  };


  const currentYear = new Date().getFullYear();

  
  const profileImageUrl = profileImage; 

  const [showAllProjects, setShowAllProjects] = useState(false);
  
  const toggleProjectsView = () => {
    setShowAllProjects(!showAllProjects);
    
    if (showAllProjects) {
      setTimeout(() => {
        scrollToSection('projects');
      }, 100);
    }
  };
  
  return (
    <motion.div 
      className="portfolio"
      ref={portfolioRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
    
      <MouseFollower />
      
      <header className={`navbar ${showNavbar ? '' : 'hidden'}`}>
        <div className="navbar-container">
          <motion.div 
            className="logo"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            AH
          </motion.div>
          <motion.ul 
            className="nav-links"
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {sections.map((section) => (
              <li 
                key={section}
                className={activeSection === section ? 'active' : ''}
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </li>
            ))}
          </motion.ul>
         
        </div>
      </header>

    
      <ScrollIndicator 
        sections={sections} 
        activeSection={activeSection} 
        onClickIndicator={handleIndicatorClick} 
      />

     
      <motion.section 
        id="home"
        ref={homeRef}
        className="home-section"
      >
        <ParticleBackground />
        
        <div className="hero-content">
          <motion.div 
            className="hero-image-container"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src={profileImage} 
              alt="Andres Hurtado" 
              className="hero-image"
              onError={(e) => {
                console.error("Failed to load profile image, using fallback");
                e.target.src = "https://via.placeholder.com/180x180?text=AH";
              }}
            />
            <div className="image-decoration"></div>
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Hola, soy <span className="highlight">Andres Hurtado</span>
          </motion.h1>
          
          <motion.h2 
            className="profession"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Desarrollador Web
          </motion.h2>
          
          <motion.div 
            className="tags-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="tech-tag">
              <span className="tech-icon"></span>
              Go
            </span>
            <span className="tech-tag">
              <span className="tech-icon"></span>
              React
            </span>
            <span className="tech-tag">
              <span className="tech-icon"></span>
              JavaScript
            </span>
            <span className="tech-tag">
              <span className="tech-icon"></span>
              FrontEnd
            </span>
            <span className="tech-tag">
              <span className="tech-icon"></span>
              BackEnd
            </span>
          </motion.div>
          
          <motion.p 
            className="intro-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Desarrollador enfocado en crear soluciones web eficientes, con experiencia en frontend y creciente especialización en tecnologías backend como Go y Node.js, buscando contribuir en arquitecturas distribuidas y microservicios.
          </motion.p>
          
          <motion.div 
            className="cta-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.button 
              className="cta-button primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('projects')}
            >
              Ver Proyectos
            </motion.button>
            
            <motion.button 
              className="cta-button secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact')}
            >
              Contáctame
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          className="scroll-down-indicator"
          onClick={() => scrollToSection('projects')}
          aria-label="Desplázate hacia abajo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Descubre más
        </motion.div>
        
        <div className="decoration-element left"></div>
        <div className="decoration-element right"></div>
      </motion.section>

 
      <section id="projects" className="section-container" ref={projectsRef}>
        <ParallaxBg section="projects" />
        <div 
          className={`section-content ${projectsContentInView ? 'in-view' : ''}`}
          ref={projectsContentRef}
        >
          <div className="section-header">
            <h2>Mis Proyectos</h2>
            <div className="section-divider"></div>
            <p>Una selección de mis trabajos recientes y proyectos destacados.</p>
          </div>
          
          <div className="projects-grid">
            {projects.slice(0, showAllProjects ? projects.length : 3).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          
          <div className="more-projects">
            <motion.button 
              className="text-button"
              onClick={toggleProjectsView}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllProjects ? "Mostrar menos" : "Ver más proyectos"}
              <span className="arrow-icon">
                {showAllProjects ? "↑" : "→"}
              </span>
            </motion.button>
          </div>
        </div>
      </section>


      <section id="about" className="section-container" ref={aboutRef}>
        <ParallaxBg section="about" />
        <div 
          className={`section-content ${aboutContentInView ? 'in-view' : ''}`}
          ref={aboutContentRef}
        >
          <div className="section-header">
            <h2>Sobre Mí</h2>
            <div className="section-divider"></div>
            <p>Conozca mi trayectoria, habilidades y pasión por el desarrollo web.</p>
          </div>

          <div className="about-content">
            <div className="about-text">
              <h3>Mi historia</h3>
              <p>
                Soy un estudiante de Desarrollo de Software en CESDE, apasionado por el desarrollo web 
                y muy interesado en el frontend. Actualmente estoy profundizando en React, 
                explorando Node.js para backend y aprendiendo Go como nuevo lenguaje de programación.
              </p>
              <p>
                Me enfoco en crear interfaces atractivas y funcionales, mientras aprendo sobre
                arquitectura de aplicaciones web y exploro herramientas modernas como Vite, Electron y Next.js.
              </p>
              <p>
                Mi formación técnica en Desarrollo de Software (2024-2025) y mi constante aprendizaje 
                autodidacta me permiten enfrentar nuevos desafíos con creatividad y soluciones eficientes.
              </p>
              
              <a href="https://drive.google.com/drive/folders/14sg0HaqIVR5Qy7T2ZmuxzBs3Fa7NRiYE?usp=drive_link" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="resume-button">
                Ver Certificados
                <span className="icon">↓</span>
              </a>
            </div>
            
            <div className="skills-container">
              <h3>Mis habilidades</h3>
              
              {skillsData.map((category, index) => (
                <div key={index} className="skill-category">
                  <h4>{category.category}</h4>
                  <div className="skills-grid">
                    {category.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="learning-section">
                <h4>Actualmente aprendiendo</h4>
                <div className="learning-tags">
                  <span className="skill-tag learning-tag">
                    <span className="learning-icon"></span> Go
                  </span>
                  <span className="skill-tag learning-tag">
                    <span className="learning-icon"></span> Next.js
                  </span>
                  <span className="skill-tag learning-tag">
                    <span className="learning-icon"></span> Arquitectura de aplicaciones
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-container" ref={contactRef}>
        <ParallaxBg section="contact" />
        <div 
          className={`section-content ${contactContentInView ? 'in-view' : ''}`}
          ref={contactContentRef}
        >
          <div className="section-header">
            <h2>Contacto</h2>
            <div className="section-divider"></div>
            <p>¿Interesado en trabajar juntos? Póngase en contacto conmigo.</p>
          </div>

          <div className="contact-container">
            <div className="contact-info">
              <div className="contact-method">
                <div className="contact-icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:andreshm253@gmail.com">andreshm253@gmail.com</a>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">🌐</div>
                <div>
                  <h4>Redes Sociales</h4>
                  <div className="social-links">
                    <a href="https://www.linkedin.com/in/andres-hurtado-hurtado-molina-1a7801349/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://github.com/hurtadx" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://codepen.io/hurtadx" target="_blank" rel="noopener noreferrer">Codepen</a>
                  </div>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Ubicación</h4>
                  <p>Colombia</p>
                </div>
              </div>
            </div>
            
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" placeholder="Tu nombre" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Tu email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea id="message" rows="5" placeholder="Tu mensaje" required></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">AH</div>
          <p>© {currentYear} Andres Hurtado. Todos los derechos reservados.</p>
          <div className="footer-links">
            {sections.map((section) => (
              <a 
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section);
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </motion.div>
  )
}

function App() {
  const [introCompleted, setIntroCompleted] = useState(false)

  const handleIntroComplete = () => {
    setIntroCompleted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {!introCompleted ? (
        <Intro2D onIntroComplete={handleIntroComplete} />
      ) : (
        <Suspense fallback={<div className="loading">Cargando...</div>}>
          <MainPortfolio />
        </Suspense>
      )}
    </AnimatePresence>
  )
}

export default App