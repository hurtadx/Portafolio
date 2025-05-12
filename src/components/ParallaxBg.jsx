import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBg = ({ section }) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  
  let yTransform, opacityTransform;
  
  switch(section) {
    case 'projects':
      yTransform = useTransform(scrollYProgress, [0, 1], [0, 100]);
      opacityTransform = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
      break;
    case 'about':
      yTransform = useTransform(scrollYProgress, [0, 1], [0, -100]);
      opacityTransform = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
      break;
    case 'contact':
      yTransform = useTransform(scrollYProgress, [0, 1], [0, 100]);
      opacityTransform = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
      break;
    default:
      yTransform = useTransform(scrollYProgress, [0, 1], [0, 50]);
      opacityTransform = useTransform(scrollYProgress, [0, 1], [1, 0]);
  }

  
  const renderParallaxElements = () => {
    switch(section) {
      case 'projects':
        return (
          <>
            <div className="parallax-circle" style={{ 
              top: '10%', 
              left: '5%', 
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent 70%)',
              width: '300px',
              height: '300px'
            }}></div>
            <div className="parallax-circle" style={{ 
              bottom: '15%', 
              right: '10%', 
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)',
              width: '200px',
              height: '200px'
            }}></div>
          </>
        );
      case 'about':
        return (
          <>
            <div className="parallax-circle" style={{ 
              top: '20%', 
              right: '10%', 
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2), transparent 70%)',
              width: '250px',
              height: '250px'
            }}></div>
            <div className="parallax-circle" style={{ 
              bottom: '20%', 
              left: '15%', 
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 70%)',
              width: '180px',
              height: '180px'
            }}></div>
          </>
        );
      case 'contact':
        return (
          <>
            <div className="parallax-circle" style={{ 
              top: '15%', 
              left: '10%', 
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15), transparent 70%)',
              width: '220px',
              height: '220px'
            }}></div>
            <div className="parallax-circle" style={{ 
              bottom: '10%', 
              right: '5%', 
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2), transparent 70%)',
              width: '280px',
              height: '280px'
            }}></div>
          </>
        );
      default:
        return (
          <div className="parallax-circle" style={{ 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent 70%)',
            width: '500px',
            height: '500px'
          }}></div>
        );
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="parallax-bg"
      style={{ 
        y: yTransform,
        opacity: opacityTransform
      }}
    >
      {renderParallaxElements()}
    </motion.div>
  );
};

export default ParallaxBg;
