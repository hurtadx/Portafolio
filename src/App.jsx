import { useState, useEffect, useRef, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser';

import ProjectCard from './components/ProjectCard'
import ParticleBackground from './components/ParticleBackground'
import MouseFollower from './components/MouseFollower'
import ParallaxBg from './components/ParallaxBg'
import { projects, skillsData } from './data/projectsData'
import './App.css'
import profileImage from './assets/IMG/uy.jpg';

const ScrollIndicator = ({ sections, activeSection, onClickIndicator }) => (
  <div className="scroll-indicator-container">
    {sections.map((section) => (
      <div 
        key={section}
        className={`scroll-indicator ${activeSection === section ? 'active' : ''}`}
        onClick={() => onClickIndicator(section)}
        aria-label={`Ir a sección ${section}`}
      />
    ))}
  </div>
);

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
    if (section && portfolioRef.current) {
      const sectionTop = section.offsetTop;
      portfolioRef.current.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  const handleIndicatorClick = (section) => {
    scrollToSection(section);
  };

  const currentYear = new Date().getFullYear();
  
  const [showAllProjects, setShowAllProjects] = useState(false);

  const toggleProjectsView = () => {
    setShowAllProjects(!showAllProjects);
    
    if (showAllProjects) {
      setTimeout(() => {
        scrollToSection('projects');
      }, 100);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  
  const formRef = useRef();
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: null
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'El mensaje es requerido';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const serviceId = 'service_edek7ch';
    const templateId = 'template_qyan9xm';
    const publicKey = 'ht2gdXdfRrjETjVwD';
    
    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        setIsSubmitting(false);
        setSubmitStatus('success');

        setFormData({
          name: '',
          email: '',
          message: ''
        });
        
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setSubmitStatus('error');
        
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      });
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
            Desarrollador enfocado en crear soluciones web eficientes, con experiencia en 
            frontend y creciente especialización en tecnologías backend como Go y Node.js, 
            buscando contribuir en arquitecturas distribuidas y microservicios.
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
          
          <motion.div 
            className="social-links-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a href="https://github.com/hurtadx" target="_blank" rel="noopener noreferrer" className="social-link github">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/andres-hurtado-molina-1a7801349/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://codepen.io/hurtadx" target="_blank" rel="noopener noreferrer" className="social-link codepen">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075-.003-.018-.015-.034-.02-.05l-.035-.067-.03-.05-.044-.06-.046-.045-.06-.045-.046-.03-.06-.044-.044-.04-.015-.02L12.58.19c-.347-.232-.796-.232-1.142 0L.453 7.502l-.015.015-.044.035-.06.05-.038.04-.05.056-.037.045-.05.06c-.02.017-.03.03-.03.046l-.05.06-.02.06c-.02.01-.02.04-.03.07l-.01.05C0 8.12 0 8.15 0 8.18v7.497c0 .044.003.09.01.135l.01.046c.005.03.01.06.02.086l.015.05c.01.027.016.053.027.075l.022.05c0 .01.015.04.03.06l.03.04c.015.01.03.04.045.06l.03.04.04.04c.01.013.01.03.03.03l.06.042.04.03.01.014 10.97 7.33c.164.12.375.163.57.163s.39-.06.57-.18l10.99-7.28.014-.01.046-.037.06-.043.048-.036.052-.058.033-.045.04-.06.03-.05.03-.07.016-.052.03-.077.015-.045.03-.08v-7.5c0-.05 0-.095-.016-.14l-.014-.045.044.003zm-11.99 6.28l-3.65-2.44 3.65-2.442 3.65 2.44-3.65 2.44zm-1.034-6.674l-4.473 2.99L2.89 8.362l8.086-5.39V7.79zm-6.33 4.233l-2.582 1.73V10.3l2.582 1.726zm1.857 1.25l4.473 2.99v4.82L2.89 15.69l3.618-2.417v-.004zm6.537 2.99l4.474-2.98 3.613 2.42-8.087 5.39v-4.82zm6.33-4.23l2.583-1.72v3.456l-2.583-1.73zm-1.855-1.24L13.042 7.8V2.97l8.085 5.39-3.612 2.415v.003z"/>
              </svg>
              <span className="sr-only">CodePen</span>
            </a>
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
                Soy un estudiante de Desarrollo de Software en CESDE, apasionado por construir 
                sistemas backend eficientes y escalables. Actualmente estoy profundizando en Go 
                para desarrollo de microservicios, explorando Node.js y ampliando mis conocimientos 
                en arquitecturas distribuidas y bases de datos NoSQL.
              </p>
              
              <div className="experience-section">
                <h4 className="experience-title">Experiencia Profesional</h4>
                
                <div className="experience-card">
                  <div className="experience-header">
                    <h5>Especialista de Sistemas</h5>
                    <div className="experience-meta">
                      <span className="company">Arcoli SAS</span>
                      <span className="duration">Enero - Junio 2025</span>
                    </div>
                  </div>
                  <ul className="experience-list">
                    <li>Desarrollo e implementación de un sistema interno de seguimiento de inventario con 
arquitectura modular que optimizó los procesos de registro y control de equipos.</li>
                    <li>Diseño de APIs REST para la comunicación entre los componentes del sistema de inventario.</li>
                    <li>Implementación de soluciones de almacenamiento en caché para mejorar el rendimiento 
de las aplicaciones internas.</li>
                    <li>Mantenimiento y mejora de la infraestructura de red y sistemas informáticos de la empresa.</li>
                    <li>Soporte técnico y resolución de incidencias para garantizar la continuidad de operaciones.</li>
                    <li>Gestión de copias de seguridad y restauración de datos para proteger la información crítica de la empresa.</li>
                    <li>Implementación de medidas de seguridad informática para proteger los activos digitales de la organización.</li>
                  </ul>
                </div>
              </div>
              
              <p>
                Esta experiencia laboral combinada con mi formación técnica en Desarrollo de Software (2024-2025) 
                y mi aprendizaje autodidacta me ha permitido desarrollar una perspectiva integral, 
                donde puedo aplicar conocimientos de infraestructura IT y soporte técnico junto con 
                habilidades de desarrollo para crear soluciones eficientes.
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
            
            <form 
              ref={formRef} 
              className={`contact-form ${isSubmitting ? 'submitting' : ''} ${submitStatus ? `form-${submitStatus}` : ''}`}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input 
                  type="text" 
                  id="name" 
                  name="user_name"
                  placeholder="Tu nombre" 
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={formErrors.name ? 'input-error' : ''}
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="user_email"
                  placeholder="Tu email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={formErrors.email ? 'input-error' : ''}
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="5" 
                  placeholder="Tu mensaje" 
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={formErrors.message ? 'input-error' : ''}
                ></textarea>
                {formErrors.message && <span className="error-message">{formErrors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="button-loader">
                    <span className="loader-dot"></span>
                    <span className="loader-dot"></span>
                    <span className="loader-dot"></span>
                  </span>
                ) : 'Enviar Mensaje'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="form-notification success">
                  <strong>¡Enviado con éxito!</strong> Me pondré en contacto contigo pronto.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="form-notification error">
                  <strong>Error.</strong> Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">AH</div>
            <p className="footer-tagline">Desarrollador Web Frontend</p>
          </div>
          
          <div className="footer-center">
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
          
          <div className="footer-right">
            <div className="footer-social">
              <a href="https://github.com/hurtadx" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="social-icon github"></i>
              </a>
              <a href="https://www.linkedin.com/in/andres-hurtado-hurtado-molina-1a7801349/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="social-icon linkedin"></i>
              </a>
              <a href="https://codepen.io/hurtadx" target="_blank" rel="noopener noreferrer" aria-label="CodePen">
                <i className="social-icon codepen"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {currentYear} Andres Hurtado. Todos los derechos reservados.</p>
        </div>
      </footer>
    </motion.div>
  )
}

function App() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="loading">Cargando...</div>}>
        <MainPortfolio />
      </Suspense>
    </AnimatePresence>
  )
}

export default App
