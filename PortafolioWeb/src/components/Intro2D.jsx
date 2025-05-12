import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Intro2D.css';

const Intro2D = ({ onIntroComplete }) => {
  const [tvOn, setTvOn] = useState(false);
  const [showStatic, setShowStatic] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Gestionar secuencia de animación
  useEffect(() => {
    if (tvOn) {
      // Mostrar estática después de encender la TV
      const staticTimer = setTimeout(() => {
        setShowStatic(true);
        
        // Añadir efecto de glitch antes del contenido
        const glitchTimer = setTimeout(() => {
          setGlitchEffect(true);
          
          // Mostrar mensaje después de la estática
          const contentTimer = setTimeout(() => {
            setGlitchEffect(false);
            setShowContent(true);
            
            // Completar la intro después de mostrar el contenido
            const completeTimer = setTimeout(() => {
              onIntroComplete();
            }, 3500);
            
            return () => clearTimeout(completeTimer);
          }, 500);
          
          return () => clearTimeout(contentTimer);
        }, 1200);
        
        return () => clearTimeout(glitchTimer);
      }, 800);
      
      return () => clearTimeout(staticTimer);
    }
  }, [tvOn, onIntroComplete]);

  return (
    <motion.div 
      className="intro-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="tv-container">
        <motion.div 
          className="tv-frame"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="tv-screen" onClick={() => !tvOn && setTvOn(true)}>
            {!tvOn && (
              <motion.div 
                className="tv-off"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="click-instruction">Iniciar experiencia</span>
              </motion.div>
            )}
            
            <AnimatePresence>
              {tvOn && showStatic && (
                <motion.div 
                  className="tv-static"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: glitchEffect ? [0.7, 0.2, 0.9, 0.5, 0.8] : 0.7,
                    x: glitchEffect ? [0, -5, 3, -2, 0] : 0
                  }}
                  transition={{ 
                    duration: glitchEffect ? 0.5 : 0.3,
                    times: glitchEffect ? [0, 0.2, 0.4, 0.6, 1] : [0, 1]
                  }}
                />
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {tvOn && showContent && (
                <motion.div 
                  className="tv-content"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                  >
                    Andres Hurtado
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                  >
                    Desarrollador Web 
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Intro2D;